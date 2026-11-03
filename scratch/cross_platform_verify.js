const fs = require('fs');

// 1. Read server.js
const serverText = fs.readFileSync('server.js', 'utf8');
const serverDbMatch = serverText.match(/const NUTRITION_DB = \{([\s\S]*?)\n\};/);
eval('var serverDb = {' + serverDbMatch[1] + '};');

// 2. Read script.js
const scriptText = fs.readFileSync('script.js', 'utf8');
const scriptLookupMatch = scriptText.match(/const CLIENT_NUTRITION_LOOKUP = \{([\s\S]*?)\n\};/);
eval('var clientDb = {' + scriptLookupMatch[1] + '};');

// 3. Read NutritionCalculationService.java
const javaText = fs.readFileSync('backend/src/main/java/com/healthify/service/NutritionCalculationService.java', 'utf8');
const javaLines = javaText.split('\n');

const javaEntries = {};
for (const line of javaLines) {
  const m = line.match(/add(Usda|Ifct)\s*\(\s*"([^"]+)"\s*,\s*"[^"]*"\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"(?:\s*,\s*(.+))?\);/);
  if (m) {
    const isUsda = m[1] === 'Usda';
    const name = m[2];
    const cal = parseFloat(m[3]);
    const pro = parseFloat(m[4]);
    const carbs = parseFloat(m[5]);
    const fat = parseFloat(m[6]);
    const fib = parseFloat(m[7]);
    const state = m[8];
    const category = m[9];
    const aliasesRaw = m[10];
    const source = isUsda ? 'USDA FoodData Central' : 'ICMR-NIN IFCT';

    const obj = { name, cal, pro, carbs, fat, fib, state, category, source };
    javaEntries[name.toLowerCase()] = obj;

    if (aliasesRaw) {
      const aliasMatches = aliasesRaw.match(/"([^"]+)"/g);
      if (aliasMatches) {
        for (const al of aliasMatches) {
          const cleanAl = al.replace(/"/g, '').toLowerCase();
          javaEntries[cleanAl] = obj;
        }
      }
    }
  }
}

console.log('ServerDB unique keys:', Object.keys(serverDb).length);
console.log('ClientDB unique keys:', Object.keys(clientDb).length);
console.log('JavaDB items mapped:', Object.keys(javaEntries).length);

// Compare key staple foods across all 3
const staples = [
  'raw chicken breast',
  'chicken breast',
  'dry oats',
  'cooked oats',
  'banana',
  'raw rice',
  'white rice',
  'brown rice',
  'paneer',
  'curd',
  'almonds',
  'apple',
  'spinach'
];

console.log('\n--- CROSS-PLATFORM STAPLE COMPARISON ---');
let allMatch = true;
for (const k of staples) {
  const s = serverDb[k];
  const c = clientDb[k];
  const j = javaEntries[k];

  console.log(`\nKey: [${k}]`);
  console.log(`  server.js:  cal=${s ? s.cal : 'N/A'}, pro=${s ? s.pro : 'N/A'}, carbs=${s ? s.carbs : 'N/A'}, fat=${s ? s.fat : 'N/A'}, state=${s ? s.state : 'N/A'}, src=${s ? s.source : 'N/A'}`);
  console.log(`  script.js:  cal=${c ? (c.calories ?? c.cal) : 'N/A'}, pro=${c ? (c.protein ?? c.pro) : 'N/A'}, carbs=${c ? c.carbs : 'N/A'}, fat=${c ? c.fat : 'N/A'}, state=${c ? c.state : 'N/A'}, src=${c ? c.source : 'N/A'}`);
  console.log(`  Java:       cal=${j ? j.cal : 'N/A'}, pro=${j ? j.pro : 'N/A'}, carbs=${j ? j.carbs : 'N/A'}, fat=${j ? j.fat : 'N/A'}, state=${j ? j.state : 'N/A'}, src=${j ? j.source : 'N/A'}`);

  if (s && c && j) {
    const cCal = c.calories ?? c.cal;
    const cPro = c.protein ?? c.pro;
    const calMatch = (s.cal === cCal && s.cal === j.cal);
    const proMatch = (s.pro === cPro && s.pro === j.pro);
    const stateMatch = (s.state.toLowerCase() === c.state.toLowerCase() && s.state.toLowerCase() === j.state.toLowerCase());
    if (!calMatch || !proMatch || !stateMatch) {
      console.error(`  ❌ MISMATCH for ${k}! calMatch=${calMatch}, proMatch=${proMatch}, stateMatch=${stateMatch}`);
      allMatch = false;
    } else {
      console.log(`  ✅ PERFECT MATCH: Calories, Protein, and State identical across all 3 platforms!`);
    }
  } else {
    console.error(`  ❌ Missing on one or more platforms! s=${!!s}, c=${!!c}, j=${!!j}`);
    allMatch = false;
  }
}

console.log('\nOverall cross-platform consistency check:', allMatch ? 'PASSED ✅' : 'FAILED ❌');
