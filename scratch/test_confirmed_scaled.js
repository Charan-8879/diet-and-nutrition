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

function buildConfirmedPlanDay(dayNum, targetCal, confirmedPool) {
  const tB = targetCal * 0.24;
  const tPL = targetCal * 0.10;
  const tL = targetCal * 0.34;
  const tES = targetCal * 0.12;
  const tD = targetCal * 0.20;

  const isFruit = (n) => /banana|apple|papaya|guava|orange|watermelon|pomegranate|fruit/i.test(n);
  const isMeat = (n) => /chicken|fish|salmon|meat|mutton/i.test(n);

  const fruits = confirmedPool.filter(isFruit);
  const nonMeats = confirmedPool.filter(f => !isMeat(f));
  const meats = confirmedPool.filter(isMeat);

  // 1. Breakfast: Non-meat items (e.g. Rice + Eggs or Paneer + Rice)
  let bItems;
  if (dayNum % 2 === 1 && confirmedPool.some(f => /egg/i.test(f))) {
    bItems = [
      createFoodItem(confirmedPool.find(f => /rice|oat|roti|chapati/i.test(f)) || confirmedPool[0], 180),
      createFoodItem(confirmedPool.find(f => /egg/i.test(f)), 100)
    ];
  } else {
    bItems = [
      createFoodItem(nonMeats[0] || confirmedPool[0], 180),
      createFoodItem(nonMeats[1 % nonMeats.length] || confirmedPool[0], 100)
    ];
  }
  bItems = scaleItemsToTargetCal(bItems, tB);

  // 2. Pre-Lunch (11:30 AM): Fruit from confirmed pool
  let plItems;
  if (fruits.length > 0) {
    const fruit = fruits[(dayNum - 1) % fruits.length];
    const side = confirmedPool.find(f => /paneer|egg|nut|curd|yogurt/i.test(f));
    plItems = side ? [createFoodItem(fruit, 150), createFoodItem(side, 30)] : [createFoodItem(fruit, 220)];
  } else {
    plItems = [createFoodItem(confirmedPool[(dayNum + 1) % confirmedPool.length], 120)];
  }
  plItems = scaleItemsToTargetCal(plItems, tPL);

  // 3. Lunch: Hearty main meal (Rice/grain + Chicken/Paneer + Eggs/dal)
  let lItems = [
    createFoodItem(confirmedPool.find(f => /rice|chapati|roti|grain/i.test(f)) || confirmedPool[0], 200),
    createFoodItem(meats[0] || confirmedPool.find(f => /paneer|tofu|dal/i.test(f)) || confirmedPool[1 % confirmedPool.length], 160)
  ];
  if (confirmedPool.length > 2) {
    const lSide = confirmedPool.find(f => !lItems.some(it => it.name.toLowerCase().includes(f.toLowerCase())) && !isFruit(f));
    if (lSide) lItems.push(createFoodItem(lSide, 60));
  }
  lItems = scaleItemsToTargetCal(lItems, tL);

  // 4. Evening Snack: Wholesome confirmed snack (Paneer / Eggs / Fruit)
  let esItems;
  const snackCandidate = confirmedPool.find(f => /paneer|egg|nut|curd|yogurt/i.test(f));
  if (snackCandidate) {
    const secondaryFruit = confirmedPool.find(f => isFruit(f) && f !== snackCandidate);
    esItems = secondaryFruit
      ? [createFoodItem(snackCandidate, 70), createFoodItem(secondaryFruit, 80)]
      : [createFoodItem(snackCandidate, 90)];
  } else {
    esItems = [createFoodItem(confirmedPool[(dayNum + 2) % confirmedPool.length], 100)];
  }
  esItems = scaleItemsToTargetCal(esItems, tES);

  // 5. Dinner: Wholesome dinner from confirmed pool
  let dItems = [
    createFoodItem(confirmedPool.find(f => /rice|chapati|roti/i.test(f)) || confirmedPool[0], 160),
    createFoodItem(confirmedPool.find(f => /chicken|paneer|fish|egg|dal/i.test(f)) || confirmedPool[1 % confirmedPool.length], 120)
  ];
  dItems = scaleItemsToTargetCal(dItems, tD);

  const bTot = calculateMealTotals(bItems);
  const plTot = calculateMealTotals(plItems);
  const lTot = calculateMealTotals(lItems);
  const esTot = calculateMealTotals(esItems);
  const dTot = calculateMealTotals(dItems);

  const totalCal = Math.round((bTot.unroundedCal + plTot.unroundedCal + lTot.unroundedCal + esTot.unroundedCal + dTot.unroundedCal) * 10) / 10;
  const totalPro = Math.round((bTot.unroundedPro + plTot.unroundedPro + lTot.unroundedPro + esTot.unroundedPro + dTot.unroundedPro) * 10) / 10;
  const totalCarb = Math.round((bTot.unroundedCarbs + plTot.unroundedCarbs + lTot.unroundedCarbs + esTot.unroundedCarbs + dTot.unroundedCarbs) * 10) / 10;
  const totalFat = Math.round((bTot.unroundedFat + plTot.unroundedFat + lTot.unroundedFat + esTot.unroundedFat + dTot.unroundedFat) * 10) / 10;

  return { totalCal, totalPro, totalCarb, totalFat, meals: [bTot, plTot, lTot, esTot, dTot], bItems, plItems, lItems, esItems, dItems };
}

console.log('Testing confirmed foods: [Rice, Eggs, Banana, Chicken, Paneer] for 2100 kcal target:');
for (let d = 1; d <= 7; d++) {
  const day = buildConfirmedPlanDay(d, 2100, ['White Rice (Cooked)', 'Eggs (Whole Boiled)', 'Banana', 'Chicken Breast (Grilled)', 'Paneer (Fresh/Raw)']);
  const diffPct = Math.round(Math.abs(day.totalCal - 2100) / 2100 * 1000) / 10;
  console.log(`Day ${d}: ${day.totalCal} kcal (Diff: ${diffPct}%) | P: ${day.totalPro}g, C: ${day.totalCarb}g, F: ${day.totalFat}g`);
}

