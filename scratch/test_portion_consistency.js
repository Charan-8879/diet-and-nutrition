const fs = require('fs');
const assert = require('assert');

// 1. Read server.js
const serverText = fs.readFileSync('server.js', 'utf8');
const serverDbMatch = serverText.match(/const NUTRITION_DB = \{([\s\S]*?)\n\};/);
eval('var NUTRITION_DB = {' + serverDbMatch[1] + '};');

function serverLookup(name, grams) {
  const clean = (name || '').toLowerCase().trim();
  let fn = NUTRITION_DB[clean];
  if (!fn) {
    for (const k of Object.keys(NUTRITION_DB)) {
      if (clean.includes(k) || k.includes(clean)) { fn = NUTRITION_DB[k]; break; }
    }
  }
  if (!fn) fn = { name, cal: 120, pro: 6, carbs: 15, fat: 3, fib: 2.5, state: 'cooked', source: 'ESTIMATED', isEstimated: true };
  const factor = (grams || 100) / 100;
  return {
    name: fn.name,
    cal: Math.round(fn.cal * factor * 10) / 10,
    pro: Math.round(fn.pro * factor * 10) / 10,
    carbs: Math.round(fn.carbs * factor * 10) / 10,
    fat: Math.round(fn.fat * factor * 10) / 10,
    state: fn.state,
    source: fn.source
  };
}

// 2. Read script.js
const scriptText = fs.readFileSync('script.js', 'utf8');
const scriptLookupMatch = scriptText.match(/const CLIENT_NUTRITION_LOOKUP = \{([\s\S]*?)\n\};/);
eval('var CLIENT_NUTRITION_LOOKUP = {' + scriptLookupMatch[1] + '};');

function clientLookup(name, grams) {
  const lower = (name || '').toLowerCase().trim();
  const found = CLIENT_NUTRITION_LOOKUP[lower] || {};
  const baseQty = found.quantity || 100;
  const ratio = (grams || 100) / baseQty;
  const baseCal = found.calories !== undefined ? found.calories : (found.cal !== undefined ? found.cal : 120);
  const basePro = found.protein !== undefined ? found.protein : (found.pro !== undefined ? found.pro : 6);
  const baseCarbs = found.carbs !== undefined ? found.carbs : 15;
  const baseFat = found.fat !== undefined ? found.fat : 3;

  return {
    name: found.name || name,
    cal: Math.round((baseCal * ratio) * 10) / 10,
    pro: Math.round((basePro * ratio) * 10) / 10,
    carbs: Math.round((baseCarbs * ratio) * 10) / 10,
    fat: Math.round((baseFat * ratio) * 10) / 10,
    state: found.state || 'raw',
    source: found.source || 'ESTIMATED'
  };
}

const testFoods = [
  { name: 'Raw Chicken Breast', grams: 100 },
  { name: 'Chicken Breast', grams: 150 },
  { name: 'Dry Oats', grams: 100 },
  { name: 'Cooked Oats', grams: 100 },
  { name: 'Banana', grams: 120 },
  { name: 'Raw Rice', grams: 100 },
  { name: 'White Rice', grams: 150 },
  { name: 'Brown Rice', grams: 150 },
  { name: 'Paneer', grams: 100 },
  { name: 'Curd', grams: 150 },
  { name: 'Almonds', grams: 30 },
  { name: 'Apple', grams: 120 },
  { name: 'Spinach', grams: 80 },
  { name: 'Whole Wheat Chapati / Roti', grams: 100 },
  { name: 'Moong Dal', grams: 130 },
  { name: 'Idli', grams: 100 },
  { name: 'Dosa', grams: 100 },
  { name: 'Sambar', grams: 150 },
  { name: 'Eggs', grams: 100 },
  { name: 'Salmon', grams: 100 }
];

console.log('Comparing Server lookup vs Client lookup across 20 test portions:');
let mismatches = 0;
for (const tf of testFoods) {
  const s = serverLookup(tf.name, tf.grams);
  const c = clientLookup(tf.name, tf.grams);

  const calDiff = Math.abs(s.cal - c.cal);
  const proDiff = Math.abs(s.pro - c.pro);
  const stateMatch = s.state.toLowerCase() === c.state.toLowerCase();

  const isOk = (calDiff <= 0.5 && proDiff <= 0.2 && stateMatch);
  if (!isOk) {
    mismatches++;
    console.log(`❌ MISMATCH for ${tf.name} (${tf.grams}g):`);
    console.log(`   Server: cal=${s.cal}, pro=${s.pro}, state=${s.state}`);
    console.log(`   Client: cal=${c.cal}, pro=${c.pro}, state=${c.state}`);
  } else {
    console.log(`✅ MATCH: ${tf.name} (${tf.grams}g) -> ${s.cal} kcal, ${s.pro}g pro [${s.state}]`);
  }
}
console.log(`\nTotal mismatches: ${mismatches} / ${testFoods.length}`);

