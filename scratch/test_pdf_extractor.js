const zlib = require('zlib');

/**
 * Robust zero-dependency PDF text & image extractor for Node.js
 */
function extractFromPdfBuffer(pdfBuffer) {
  if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer) || pdfBuffer.length < 10) {
    return { success: false, error: 'Empty or unreadable PDF file.' };
  }

  // 1. Validate PDF signature
  const headerSlice = pdfBuffer.slice(0, 1024).toString('latin1');
  if (!headerSlice.includes('%PDF-')) {
    return { success: false, error: 'The uploaded file is not a valid PDF document or is corrupted.' };
  }

  // 2. Check for Password Protection / Encryption
  const fullRaw = pdfBuffer.toString('latin1');
  if (fullRaw.includes('/Encrypt')) {
    return { success: false, isEncrypted: true, error: 'The uploaded PDF is password-protected. Please upload an unprotected file.' };
  }

  // 3. Scan for stream ... endstream blocks
  let extractedTextParts = [];
  let extractedImages = []; // Array of { mimeType: 'image/jpeg', buffer: Buffer }

  let streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match;

  // Also extract text streams by finding /Filter definitions right before the stream
  const streamStarts = [];
  let idx = 0;
  while ((idx = pdfBuffer.indexOf('stream', idx)) !== -1) {
    // Check if word boundary around 'stream'
    const charBefore = idx > 0 ? pdfBuffer[idx - 1] : 0;
    const charAfter = pdfBuffer[idx + 6];
    if ((charBefore === 0x0a || charBefore === 0x0d || charBefore === 0x20) &&
        (charAfter === 0x0a || charAfter === 0x0d)) {
      streamStarts.push(idx);
    }
    idx += 6;
  }

  for (const sStart of streamStarts) {
    // Find newline after 'stream'
    let dataStart = sStart + 6;
    if (pdfBuffer[dataStart] === 0x0d && pdfBuffer[dataStart + 1] === 0x0a) {
      dataStart += 2;
    } else if (pdfBuffer[dataStart] === 0x0a || pdfBuffer[dataStart] === 0x0d) {
      dataStart += 1;
    }

    // Find 'endstream'
    const endstreamPos = pdfBuffer.indexOf('endstream', dataStart);
    if (endstreamPos === -1) continue;

    // Actual stream data
    let streamEnd = endstreamPos;
    if (pdfBuffer[streamEnd - 1] === 0x0a) streamEnd--;
    if (pdfBuffer[streamEnd - 1] === 0x0d) streamEnd--;

    const streamData = pdfBuffer.slice(dataStart, streamEnd);

    // Look backward up to 1024 bytes for dictionary
    const dictLookbackStart = Math.max(0, sStart - 1024);
    const dictText = pdfBuffer.slice(dictLookbackStart, sStart).toString('latin1');

    // Check if DCTDecode (embedded JPEG image)
    if (dictText.includes('/DCTDecode') || dictText.includes('/JPXDecode')) {
      // Stream is JPEG!
      // Verify JPEG magic bytes FF D8 ... FF D9
      if (streamData[0] === 0xFF && streamData[1] === 0xD8) {
        extractedImages.push({
          mimeType: 'image/jpeg',
          buffer: streamData
        });
      }
      continue;
    }

    let uncompressedData = null;
    if (dictText.includes('/FlateDecode')) {
      try {
        uncompressedData = zlib.inflateSync(streamData);
      } catch (e1) {
        try {
          uncompressedData = zlib.inflateRawSync(streamData);
        } catch (e2) {
          // Could not inflate, skip
        }
      }
    } else if (!dictText.includes('/Filter')) {
      uncompressedData = streamData;
    }

    if (uncompressedData) {
      const text = parsePdfStreamOperators(uncompressedData);
      if (text && text.trim().length > 0) {
        extractedTextParts.push(text);
      }
    }
  }

  // Also check uncompressed text directly in fullRaw outside streams
  const literalText = parsePdfStreamOperators(Buffer.from(fullRaw, 'latin1'));
  if (literalText && literalText.trim().length > 0) {
    extractedTextParts.push(literalText);
  }

  const combinedText = extractedTextParts.join('\n').trim();

  // If text was found, return text extraction
  if (combinedText.length > 5) {
    return {
      success: true,
      hasText: true,
      text: combinedText,
      imagesCount: extractedImages.length
    };
  }

  // If no text, but embedded JPEG image found (scanned PDF)
  if (extractedImages.length > 0) {
    return {
      success: true,
      hasText: false,
      isScannedImage: true,
      scannedImageBuffer: extractedImages[0].buffer,
      mimeType: extractedImages[0].mimeType,
      imagesCount: extractedImages.length
    };
  }

  return {
    success: false,
    empty: true,
    error: 'The uploaded PDF contains no readable text or supported scanned images.'
  };
}

/**
 * Extracts strings from PDF stream commands:
 * (string) Tj
 * [(part1) (part2)] TJ
 * ' and "
 * Hex strings <48656c6c6f>
 */
function parsePdfStreamOperators(streamBuffer) {
  const content = streamBuffer.toString('latin1');
  let result = [];

  // 1. Matches [(str1) 123 (str2)] TJ
  const tjRegex = /\[((?:[^[\]]|\([^)]*\))*)\]\s*TJ/g;
  let m;
  while ((m = tjRegex.exec(content)) !== null) {
    const arrayContent = m[1];
    const strInArrayRegex = /\(([^)]*)\)/g;
    let sm;
    let lineStr = '';
    while ((sm = strInArrayRegex.exec(arrayContent)) !== null) {
      lineStr += unescapePdfString(sm[1]);
    }
    if (lineStr.trim()) result.push(lineStr.trim());
  }

  // 2. Matches (str) Tj or ' or "
  const tSingleRegex = /\(([^)]*)\)\s*(?:Tj|'|")/g;
  while ((m = tSingleRegex.exec(content)) !== null) {
    const unescaped = unescapePdfString(m[1]).trim();
    if (unescaped) result.push(unescaped);
  }

  // 3. Matches hex strings <48656c6c6f> Tj
  const hexRegex = /<([0-9a-fA-F]+)>\s*(?:Tj|TJ)/g;
  while ((m = hexRegex.exec(content)) !== null) {
    const hex = m[1];
    let decoded = '';
    for (let i = 0; i < hex.length; i += 2) {
      decoded += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    if (decoded.trim()) result.push(decoded.trim());
  }

  return result.join(' ');
}

function unescapePdfString(str) {
  return str
    .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\');
}

module.exports = { extractFromPdfBuffer, parsePdfStreamOperators };

