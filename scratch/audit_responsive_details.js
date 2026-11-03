const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

console.log('=== DETAILED RESPONSIVE AUDIT SCRIPT ===');

// Check all grid-template-columns
const gridCols = [];
const lines = css.split('\n');
lines.forEach((l, i) => {
  if (l.includes('grid-template-columns')) {
    gridCols.push({ line: i+1, rule: l.trim() });
  }
});
console.log('\n--- CSS Grid Column Definitions ---');
gridCols.forEach(g => console.log(`  Line ${g.line}: ${g.rule}`));

// Check flex layouts with nowrap or missing flex-wrap
const flexLines = [];
lines.forEach((l, i) => {
  if (l.match(/display:\s*flex/i) && !lines.slice(Math.max(0, i-2), i+5).some(sub => sub.includes('flex-wrap'))) {
    flexLines.push({ line: i+1, rule: l.trim() });
  }
});
console.log('\n--- Flex containers without explicit flex-wrap count:', flexLines.length);

// Check min-width definitions
const minWidths = [];
lines.forEach((l, i) => {
  if (l.includes('min-width:')) {
    minWidths.push({ line: i+1, rule: l.trim() });
  }
});
console.log('\n--- Min-width definitions ---');
minWidths.forEach(w => console.log(`  Line ${w.line}: ${w.rule}`));

// Check padding on .section-card and containers
const cardPaddings = [];
lines.forEach((l, i) => {
  if (l.match(/\.(section-card|login-card|dash-metric-card|ai-chat-card)\s*\{/) || (lines[i-1] && lines[i-1].match(/\.(section-card|login-card|dash-metric-card|ai-chat-card)/))) {
    cardPaddings.push({ line: i+1, rule: l.trim() });
  }
});
console.log('\n--- Key card container rules ---');
cardPaddings.forEach(p => console.log(`  Line ${p.line}: ${p.rule}`));

