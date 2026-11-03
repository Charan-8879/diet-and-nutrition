package scratch;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.Inflater;

public class TestPdfInflater {

    public static String extractTextFromPdfBytes(byte[] pdfBytes) {
        if (pdfBytes == null || pdfBytes.length < 10) return "";
        String raw = new String(pdfBytes, StandardCharsets.ISO_8859_1);
        if (!raw.contains("%PDF-")) return "";

        StringBuilder allText = new StringBuilder();

        // 1. Scan for stream ... endstream markers
        int idx = 0;
        while ((idx = raw.indexOf("stream", idx)) != -1) {
            int charBefore = idx > 0 ? raw.charAt(idx - 1) : 0;
            int charAfter = idx + 6 < raw.length() ? raw.charAt(idx + 6) : 0;
            if ((charBefore == '\n' || charBefore == '\r' || charBefore == ' ') &&
                (charAfter == '\n' || charAfter == '\r')) {
                
                int dataStart = idx + 6;
                if (dataStart < raw.length() && raw.charAt(dataStart) == '\r' && dataStart + 1 < raw.length() && raw.charAt(dataStart + 1) == '\n') {
                    dataStart += 2;
                } else if (dataStart < raw.length() && (raw.charAt(dataStart) == '\n' || raw.charAt(dataStart) == '\r')) {
                    dataStart += 1;
                }

                int endstream = raw.indexOf("endstream", dataStart);
                if (endstream != -1) {
                    int dataEnd = endstream;
                    while (dataEnd > dataStart && (raw.charAt(dataEnd - 1) == '\n' || raw.charAt(dataEnd - 1) == '\r')) {
                        dataEnd--;
                    }

                    int streamLen = dataEnd - dataStart;
                    if (streamLen > 0) {
                        int dictStart = Math.max(0, idx - 1024);
                        String dict = raw.substring(dictStart, idx);

                        byte[] streamBytes = new byte[streamLen];
                        System.arraycopy(pdfBytes, dataStart, streamBytes, 0, streamLen);

                        if (dict.contains("/FlateDecode")) {
                            try {
                                Inflater inflater = new Inflater();
                                inflater.setInput(streamBytes);
                                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                                byte[] buf = new byte[4096];
                                while (!inflater.finished()) {
                                    int count = inflater.inflate(buf);
                                    if (count == 0 && inflater.needsInput()) break;
                                    baos.write(buf, 0, count);
                                }
                                inflater.end();
                                String decompressed = baos.toString(StandardCharsets.ISO_8859_1);
                                parsePdfOperators(decompressed, allText);
                            } catch (Exception ignored) {
                            }
                        } else if (!dict.contains("/Filter")) {
                            parsePdfOperators(new String(streamBytes, StandardCharsets.ISO_8859_1), allText);
                        }
                    }
                }
            }
            idx += 6;
        }

        // Also literal check
        parsePdfOperators(raw, allText);

        return allText.toString().trim();
    }

    private static void parsePdfOperators(String content, StringBuilder out) {
        if (content == null || content.isEmpty()) return;

        // [(str1) 123 (str2)] TJ
        Matcher tjMatcher = Pattern.compile("\\[((?:[^\\[\\]]|\\([^)]*\\))*)\\]\\s*TJ").matcher(content);
        while (tjMatcher.find()) {
            String arr = tjMatcher.group(1);
            Matcher strMatcher = Pattern.compile("\\(([^)]*)\\)").matcher(arr);
            while (strMatcher.find()) {
                out.append(unescape(strMatcher.group(1))).append(" ");
            }
        }

        // (str) Tj or ' or "
        Matcher tSingleMatcher = Pattern.compile("\\(([^)]*)\\)\\s*(?:Tj|'|\")").matcher(content);
        while (tSingleMatcher.find()) {
            out.append(unescape(tSingleMatcher.group(1))).append(" ");
        }
    }

    private static String unescape(String s) {
        return s.replace("\\(", "(").replace("\\)", ")").replace("\\\\", "\\").replace("\\n", "\n").replace("\\r", "\r");
    }

    public static void main(String[] args) {
        System.out.println("Java PDF Extractor Test Compiled Successfully!");
    }
}

