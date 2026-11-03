const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all elements with class 'page', 'section', 'container', or main divs inside #appPage
const appPageMatch = html.match(/<div id="appPage"[^>]*>([\s\S]*?)<\/body>/i);
if (appPageMatch) {
  const appContent = appPageMatch[1];
  console.log('App Page Content length:', appContent.length);

  // Find navbar / headers
  const headers = [...appContent.matchAll(/<(header|nav)[^>]*>[\s\S]*?<\/\1>/gi)].map(m => m[0]);
  console.log('Headers/Navbars count:', headers.length);
  headers.forEach((h, i) => console.log(`--- Header/Nav ${i+1} ---\n`, h.slice(0, 300), '\n...'));

  // Find major sections inside appPage
  const directSections = [...appContent.matchAll(/<(section|div)[^>]*class=["']([^"']*(?:section|container|card|hub)[^"']*)["'][^>]*id=["']([^"']+)["'][^>]*>/gi)];
  console.log('\nMajor sections inside appPage:');
  directSections.forEach(s => console.log(`  <${s[1]} id="${s[3]}" class="${s[2]}">`));
}

