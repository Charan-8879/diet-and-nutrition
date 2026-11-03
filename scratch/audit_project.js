const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

console.log('=== HTML AUDIT ===');
console.log('HTML Length:', html.length, 'lines:', html.split('\n').length);

// Extract top-level sections / containers / pages
const sectionRegex = /<(div|section|nav|header|footer)\s+[^>]*id=["']([^"']+)["'][^>]*>/gi;
let match;
const sections = [];
while ((match = sectionRegex.exec(html)) !== null) {
  sections.push({ tag: match[1], id: match[2] });
}
console.log('\nTop-level element IDs count:', sections.length);
console.log('Sample IDs:', sections.map(s => s.id));

// Extract modals
const modalRegex = /<div\s+[^>]*class=["'][^"']*modal[^"']*["'][^>]*id=["']([^"']+)["'][^>]*>/gi;
const modals = [];
while ((match = modalRegex.exec(html)) !== null) {
  modals.push(match[1]);
}
console.log('\nModals found:', modals);

// Extract forms / inputs
const forms = [...html.matchAll(/<form\s+[^>]*id=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('\nForms found:', forms);

// Extract nav tabs / pills / navigation buttons
const navTabs = [...html.matchAll(/class=["'][^"']*(?:nav-link|nav-item|tab-btn)[^"']*["'][^>]*>/gi)].map(m => m[0]);
console.log('\nNav tabs / links occurrences:', navTabs.length);

// Extract CSS Media Queries in style.css
console.log('\n=== CSS AUDIT ===');
console.log('CSS Length:', css.length, 'lines:', css.split('\n').length);
const mediaQueries = [...css.matchAll(/@media[^{]+{/gi)].map(m => m[0].trim());
console.log('Existing Media Queries in style.css:');
mediaQueries.forEach(mq => console.log('  -', mq));

// Check fixed widths in style.css
const fixedWidths = [...css.matchAll(/[a-zA-Z0-9_.\-#]+\s*{[^}]*width:\s*\d+px[^}]*}/gi)].map(m => m[0].replace(/\s+/g, ' ').slice(0, 80));
console.log('\nSample fixed width rules in style.css:', fixedWidths.length, 'rules found');
console.log(fixedWidths.slice(0, 15));

