const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');

console.log('=== STYLE.CSS AUDIT ===');
console.log('Total characters:', css.length);
console.log('Total lines:', css.split('\n').length);

// Extract color variables or hex codes
const hexColors = [...new Set(css.match(/#[0-9a-fA-F]{3,8}/g))];
console.log('\nColors used in style.css:', hexColors);

// Extract all existing media queries and their contents length
const mqRegex = /@media\s*([^{]+)\{([\s\S]*?\n\})/gi;
let m;
console.log('\n--- Existing Media Queries Breakdown ---');
while ((m = mqRegex.exec(css)) !== null) {
  console.log(`Query: @media ${m[1].trim()}`);
  console.log(`Length: ${m[2].length} chars, Lines: ${m[2].split('\n').length}`);
}

// Find elements with explicit width or min-width or max-width
const widthRules = [];
const lines = css.split('\n');
lines.forEach((line, i) => {
  if (line.match(/(?:^|\s)(width|min-width|max-width)\s*:\s*\d+px/i)) {
    widthRules.push({ line: i + 1, content: line.trim() });
  }
});
console.log('\nExplicit pixel width declarations count:', widthRules.length);
console.log('Sample pixel widths:');
widthRules.slice(0, 25).forEach(w => console.log(`  Line ${w.line}: ${w.content}`));

