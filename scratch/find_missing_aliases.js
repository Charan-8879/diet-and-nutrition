const fs = require('fs');

const serverText = fs.readFileSync('server.js', 'utf8');
const serverDbMatch = serverText.match(/const NUTRITION_DB = \{([\s\S]*?)\n\};/);
eval('var NUTRITION_DB = {' + serverDbMatch[1] + '};');

const scriptText = fs.readFileSync('script.js', 'utf8');
const scriptLookupMatch = scriptText.match(/const CLIENT_NUTRITION_LOOKUP = \{([\s\S]*?)\n\};/);
eval('var CLIENT_NUTRITION_LOOKUP = {' + scriptLookupMatch[1] + '};');

const missingInClient = [];
for (const key of Object.keys(NUTRITION_DB)) {
  if (!CLIENT_NUTRITION_LOOKUP[key.toLowerCase()]) {
    missingInClient.push(key);
  }
}
console.log('Keys in server.js missing direct key in script.js CLIENT_NUTRITION_LOOKUP:');
console.log(missingInClient);

