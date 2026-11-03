const zlib = require('zlib');
const { extractFromPdfBuffer } = require('./test_pdf_extractor');

function createFlatePdfWithText(text) {
  const streamContent = `BT\n/F1 12 Tf\n(${text}) Tj\nET`;
  const compressed = zlib.deflateSync(Buffer.from(streamContent, 'utf-8'));

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Contents 4 0 R >>
endobj
4 0 obj
<< /Length ${compressed.length} /Filter /FlateDecode >>
stream
` + compressed.toString('latin1') + `
endstream
endobj
xref
0 5
trailer
<< /Size 5 /Root 1 0 R >>
%%EOF`;

  return Buffer.from(pdf, 'latin1');
}

function createEncryptedPdf() {
  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
trailer
<< /Size 2 /Root 1 0 R /Encrypt 3 0 R >>
%%EOF`;
  return Buffer.from(pdf, 'latin1');
}

function createScannedPdf() {
  // Minimal valid JPEG header bytes
  const fakeJpeg = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x60, 0x00, 0x60, 0x00, 0x00, 0xFF, 0xD9]);
  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Page /Resources << /XObject << /Im1 3 0 R >> >> >>
endobj
3 0 obj
<< /Type /XObject /Subtype /Image /Width 100 /Height 100 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${fakeJpeg.length} >>
stream
` + fakeJpeg.toString('latin1') + `
endstream
endobj
trailer
<< /Size 4 /Root 1 0 R >>
%%EOF`;
  return Buffer.from(pdf, 'latin1');
}

// TESTS
console.log('--- TEST 1: Compressed FlateDecode Text PDF ---');
const textPdf = createFlatePdfWithText('Rice, Chicken, Eggs, Banana, and Paneer diet plan');
const res1 = extractFromPdfBuffer(textPdf);
console.log('Result 1:', res1.success, 'Text:', res1.text);
if (!res1.success || !res1.text.includes('Rice') || !res1.text.includes('Chicken')) {
  console.error('FAIL: Test 1 failed');
  process.exit(1);
} else {
  console.log('PASS: Test 1 passed!\n');
}

console.log('--- TEST 2: Scanned PDF with DCTDecode Image ---');
const scanPdf = createScannedPdf();
const res2 = extractFromPdfBuffer(scanPdf);
console.log('Result 2:', res2.success, 'isScannedImage:', res2.isScannedImage, 'mime:', res2.mimeType, 'buf len:', res2.scannedImageBuffer?.length);
if (!res2.success || !res2.isScannedImage || res2.scannedImageBuffer.length !== 22) {
  console.error('FAIL: Test 2 failed');
  process.exit(1);
} else {
  console.log('PASS: Test 2 passed!\n');
}

console.log('--- TEST 3: Encrypted / Password-Protected PDF ---');
const encPdf = createEncryptedPdf();
const res3 = extractFromPdfBuffer(encPdf);
console.log('Result 3:', res3.success, 'isEncrypted:', res3.isEncrypted, 'error:', res3.error);
if (res3.success !== false || !res3.isEncrypted) {
  console.error('FAIL: Test 3 failed');
  process.exit(1);
} else {
  console.log('PASS: Test 3 passed!\n');
}

console.log('--- TEST 4: Corrupted Non-PDF File ---');
const corrupt = Buffer.from('Not a pdf file at all! Hello world');
const res4 = extractFromPdfBuffer(corrupt);
console.log('Result 4:', res4.success, 'error:', res4.error);
if (res4.success !== false) {
  console.error('FAIL: Test 4 failed');
  process.exit(1);
} else {
  console.log('PASS: Test 4 passed!\n');
}

console.log('--- TEST 5: Empty PDF ---');
const empty = Buffer.alloc(0);
const res5 = extractFromPdfBuffer(empty);
console.log('Result 5:', res5.success, 'error:', res5.error);
if (res5.success !== false) {
  console.error('FAIL: Test 5 failed');
  process.exit(1);
} else {
  console.log('PASS: Test 5 passed!\n');
}

console.log('ALL 5 PDF EXTRACTION TESTS PASSED! 🎉');

