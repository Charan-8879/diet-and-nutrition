const fs = require('fs');

const serverText = fs.readFileSync('server.js', 'utf8');
const serverDbMatch = serverText.match(/const NUTRITION_DB = \{([\s\S]*?)\n\};/);
eval('var NUTRITION_DB = {' + serverDbMatch[1] + '};');

function lookupNutrient(name) {
  if (!name) return { name: 'Mixed Greens Salad', emoji: '🥗', cal: 25, pro: 1.5, carbs: 4, fat: 0.2, fib: 2, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false };
  const clean = name.toLowerCase().trim();
  if (NUTRITION_DB[clean]) return NUTRITION_DB[clean];

  const isRaw = clean.includes('raw') || clean.includes('uncooked') || clean.includes('dry');
  const isCooked = clean.includes('cooked') || clean.includes('grilled') || clean.includes('roasted') || clean.includes('boiled') || clean.includes('steamed');

  for (const k of Object.keys(NUTRITION_DB)) {
    if (isRaw && NUTRITION_DB[k].state === 'raw' && (clean.includes(k) || k.includes(clean))) return NUTRITION_DB[k];
    if (isCooked && (NUTRITION_DB[k].state === 'cooked' || NUTRITION_DB[k].state === 'fresh') && (clean.includes(k) || k.includes(clean))) return NUTRITION_DB[k];
  }

  for (const k of Object.keys(NUTRITION_DB)) {
    if (clean.includes(k) || k.includes(clean)) return NUTRITION_DB[k];
  }
  return { name: name, emoji: '🥗', cal: 120, pro: 6, carbs: 15, fat: 3, fib: 2.5, state: isRaw ? 'raw' : 'cooked', source: 'ESTIMATED', isEstimated: true };
}

function createFoodItem(name, grams, state, prep) {
  const n = lookupNutrient(name);
  const factor = (grams || 100) / 100;
  const rawCal = n.cal * factor;
  const rawPro = n.pro * factor;
  const rawCarbs = n.carbs * factor;
  const rawFat = n.fat * factor;
  const rawFib = n.fib * factor;

  const cal = Math.round(rawCal * 10) / 10;
  const pro = Math.round(rawPro * 10) / 10;
  const carbs = Math.round(rawCarbs * 10) / 10;
  const fat = Math.round(rawFat * 10) / 10;
  const fib = Math.round(rawFib * 10) / 10;

  return {
    name: n.name,
    emoji: n.emoji,
    grams: grams || 100,
    quantity: grams || 100,
    unit: 'g',
    state: (state && state.trim()) ? state : (n.state || 'raw'),
    prepMethod: prep || 'Freshly prepared',
    cal, calories: cal, pro, protein: pro, carbs, fat, fibre: fib,
    unroundedCal: rawCal, unroundedPro: rawPro, unroundedCarbs: rawCarbs, unroundedFat: rawFat, unroundedFib: rawFib,
    valueSource: n.source || (n.isEstimated ? 'ESTIMATED' : 'USDA FoodData Central / ICMR-NIN IFCT'),
    isEstimated: !!n.isEstimated
  };
}

function calculateMealTotals(items) {
  let unroundedCal = 0, unroundedPro = 0, unroundedCarbs = 0, unroundedFat = 0, unroundedFib = 0;
  (items || []).forEach(it => {
    unroundedCal += it.unroundedCal !== undefined ? it.unroundedCal : it.cal;
    unroundedPro += it.unroundedPro !== undefined ? it.unroundedPro : it.pro;
    unroundedCarbs += it.unroundedCarbs !== undefined ? it.unroundedCarbs : it.carbs;
    unroundedFat += it.unroundedFat !== undefined ? it.unroundedFat : it.fat;
    unroundedFib += it.unroundedFib !== undefined ? it.unroundedFib : it.fibre;
  });
  return {
    unroundedCal, unroundedPro, unroundedCarbs, unroundedFat, unroundedFib,
    totalCalories: Math.round(unroundedCal * 10) / 10,
    totalProtein: Math.round(unroundedPro * 10) / 10,
    totalCarbs: Math.round(unroundedCarbs * 10) / 10,
    totalFat: Math.round(unroundedFat * 10) / 10,
    totalFibre: Math.round(unroundedFib * 10) / 10
  };
}

// Meal scaling helper
function scaleItemsToTargetCal(items, targetCal) {
  if (!items || items.length === 0) return items;
  let currentCal = 0;
  items.forEach(it => { currentCal += it.cal; });
  if (currentCal <= 0) return items;

  const ratio = targetCal / currentCal;
  const scaled = items.map(it => {
    const newGrams = Math.max(15, Math.round((it.grams * ratio) / 5) * 5);
    return createFoodItem(it.name, newGrams, it.state, it.prepMethod);
  });
  return scaled;
}

const ROTATING_FRUITS_7 = [
  'Apple', 'Banana', 'Papaya', 'Guava', 'Orange', 'Watermelon', 'Pomegranate'
];

const INDIAN_BREAKFASTS_7 = [
  [['Idli (Steamed)', 160], ['Sambar', 180], ['Coconut Chutney', 40]],
  [['Dosa (Plain)', 150], ['Sambar', 180], ['Coconut Chutney', 40]],
  [['Poha (Cooked)', 220], ['Curd / Dahi (Low Fat)', 160]],
  [['Pongal (Ven Pongal)', 180], ['Coconut Chutney', 50], ['Sambar', 120]],
  [['Upma (Rava Upma)', 220], ['Sambar', 180], ['Curd / Dahi (Low Fat)', 100]],
  [['Whole Wheat Chapati / Roti', 100], ['Curd / Dahi (Low Fat)', 150], ['Eggs (Whole Boiled)', 50]],
  [['Idli (Steamed)', 150], ['Peanut / Groundnut Chutney', 50], ['Sambar', 150]]
];

const INDIAN_LUNCH_COMBOS_7 = [
  [['White Rice (Cooked)', 200], ['Moong Dal (Cooked)', 160], ['Spinach (Raw)', 80], ['Paneer (Fresh/Raw)', 70]],
  [['Whole Wheat Chapati / Roti', 120], ['Chicken Breast (Grilled)', 150], ['Moong Dal (Cooked)', 120], ['Cucumber', 80]],
  [['White Rice (Cooked)', 200], ['Chicken Breast (Grilled)', 160], ['Mixed Green Salad', 80], ['Sambar', 120]],
  [['Brown Rice (Cooked)', 200], ['Moong Dal (Cooked)', 160], ['Paneer (Fresh/Raw)', 70], ['Cucumber', 80]],
  [['Whole Wheat Chapati / Roti', 120], ['Moong Dal (Cooked)', 150], ['Paneer (Fresh/Raw)', 80], ['Mixed Green Salad', 80]],
  [['White Rice (Cooked)', 200], ['Fish (Steamed Rohu)', 150], ['Moong Dal (Cooked)', 140], ['Cucumber', 80]],
  [['White Rice (Cooked)', 200], ['Chicken Breast (Grilled)', 150], ['Moong Dal (Cooked)', 130], ['Cucumber', 80]]
];

const INDIAN_SNACKS_7 = [
  [['Almonds', 30], ['Curd / Dahi (Low Fat)', 100]],
  [['Sprouted Moong (Raw)', 100], ['Almonds', 20], ['Cucumber', 60]],
  [['Paneer (Fresh/Raw)', 75], ['Cucumber', 60]],
  [['Peanuts (Roasted)', 35], ['Curd / Dahi (Low Fat)', 100]],
  [['Greek Yogurt', 150], ['Almonds', 20]],
  [['Chickpeas / Chana (Cooked)', 100], ['Almonds', 15]],
  [['Eggs (Whole Boiled)', 100], ['Almonds', 15], ['Cucumber', 50]]
];

const INDIAN_DINNER_COMBOS_7 = [
  [['Whole Wheat Chapati / Roti', 100], ['Moong Dal (Cooked)', 160], ['Paneer (Fresh/Raw)', 50]],
  [['Idli (Steamed)', 120], ['Sambar', 180], ['Eggs (Whole Boiled)', 50]],
  [['Whole Wheat Chapati / Roti', 100], ['Paneer (Fresh/Raw)', 80], ['Cucumber', 80]],
  [['Dosa (Plain)', 120], ['Sambar', 180], ['Paneer (Fresh/Raw)', 50]],
  [['Whole Wheat Chapati / Roti', 100], ['Moong Dal (Cooked)', 160], ['Curd / Dahi (Low Fat)', 100]],
  [['Brown Rice (Cooked)', 150], ['Fish (Steamed Rohu)', 120], ['Moong Dal (Cooked)', 120]],
  [['Whole Wheat Chapati / Roti', 100], ['Curd / Dahi (Low Fat)', 150], ['Paneer (Fresh/Raw)', 50]]
];

function testPrototypePlan(targetCal = 2100) {
  console.log(`\n=================== TESTING TARGET: ${targetCal} kcal ===================`);
  // Shares: B: 24%, PL: 10%, L: 34%, ES: 12%, D: 20%
  const tB = targetCal * 0.24;
  const tPL = targetCal * 0.10;
  const tL = targetCal * 0.34;
  const tES = targetCal * 0.12;
  const tD = targetCal * 0.20;

  for (let d = 1; d <= 7; d++) {
    // 1. Breakfast
    const bDef = INDIAN_BREAKFASTS_7[(d - 1) % INDIAN_BREAKFASTS_7.length];
    let bItems = bDef.map(x => createFoodItem(x[0], x[1]));
    bItems = scaleItemsToTargetCal(bItems, tB);
    const bTot = calculateMealTotals(bItems);

    // 2. Pre-Lunch (11:30 AM Fruit Snack)
    const fruit = ROTATING_FRUITS_7[(d - 1) % ROTATING_FRUITS_7.length];
    let plItems = [createFoodItem(fruit, 130), createFoodItem('Almonds', 20)];
    plItems = scaleItemsToTargetCal(plItems, tPL);
    const plTot = calculateMealTotals(plItems);

    // 3. Lunch
    const lDef = INDIAN_LUNCH_COMBOS_7[(d - 1) % INDIAN_LUNCH_COMBOS_7.length];
    let lItems = lDef.map(x => createFoodItem(x[0], x[1]));
    lItems = scaleItemsToTargetCal(lItems, tL);
    const lTot = calculateMealTotals(lItems);

    // 4. Evening Snack
    const esDef = INDIAN_SNACKS_7[(d - 1) % INDIAN_SNACKS_7.length];
    let esItems = esDef.map(x => createFoodItem(x[0], x[1]));
    esItems = scaleItemsToTargetCal(esItems, tES);
    const esTot = calculateMealTotals(esItems);

    // 5. Dinner
    const dDef = INDIAN_DINNER_COMBOS_7[(d - 1) % INDIAN_DINNER_COMBOS_7.length];
    let dItems = dDef.map(x => createFoodItem(x[0], x[1]));
    dItems = scaleItemsToTargetCal(dItems, tD);
    const dTot = calculateMealTotals(dItems);

    const dayUnroundedCal = bTot.unroundedCal + plTot.unroundedCal + lTot.unroundedCal + esTot.unroundedCal + dTot.unroundedCal;
    const dayUnroundedPro = bTot.unroundedPro + plTot.unroundedPro + lTot.unroundedPro + esTot.unroundedPro + dTot.unroundedPro;
    const dayUnroundedCarb = bTot.unroundedCarbs + plTot.unroundedCarbs + lTot.unroundedCarbs + esTot.unroundedCarbs + dTot.unroundedCarbs;
    const dayUnroundedFat = bTot.unroundedFat + plTot.unroundedFat + lTot.unroundedFat + esTot.unroundedFat + dTot.unroundedFat;

    const actualCal = Math.round(dayUnroundedCal * 10) / 10;
    const actualPro = Math.round(dayUnroundedPro * 10) / 10;
    const actualCarb = Math.round(dayUnroundedCarb * 10) / 10;
    const actualFat = Math.round(dayUnroundedFat * 10) / 10;

    const diffCal = Math.abs(actualCal - targetCal);
    const pctDiff = Math.round((diffCal / targetCal) * 1000) / 10;

    console.log(`Day ${d}: Target=${targetCal} kcal | Actual=${actualCal} kcal (Diff: ${pctDiff}%) | P: ${actualPro}g, C: ${actualCarb}g, F: ${actualFat}g`);
    console.log(`   Breakfast: ${bTot.totalCalories} kcal (${bItems.map(i=>i.name+' '+i.grams+'g').join(', ')})`);
    console.log(`   Pre-Lunch (11:30 AM): ${plTot.totalCalories} kcal (${plItems.map(i=>i.name+' '+i.grams+'g').join(', ')})`);
    console.log(`   Lunch: ${lTot.totalCalories} kcal (${lItems.map(i=>i.name+' '+i.grams+'g').join(', ')})`);
    console.log(`   Evening Snack: ${esTot.totalCalories} kcal (${esItems.map(i=>i.name+' '+i.grams+'g').join(', ')})`);
    console.log(`   Dinner: ${dTot.totalCalories} kcal (${dItems.map(i=>i.name+' '+i.grams+'g').join(', ')})`);
  }
}

testPrototypePlan(2100);

