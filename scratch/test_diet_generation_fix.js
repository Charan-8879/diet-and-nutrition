const fs = require('fs');
const assert = require('assert');

// Test the updated diet generation logic
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

function scaleItemsToTargetCal(items, targetMealCal) {
  if (!items || items.length === 0) return items;
  let currentCal = 0;
  items.forEach(it => {
    currentCal += (it.unroundedCal !== undefined ? it.unroundedCal : it.cal);
  });
  if (currentCal <= 0) return items;

  const ratio = targetMealCal / currentCal;
  return items.map(it => {
    const origGrams = it.grams || it.quantity || 100;
    const scaledGrams = Math.max(15, Math.round((origGrams * ratio) / 5) * 5);
    return createFoodItem(it.name, scaledGrams, it.state, it.prepMethod);
  });
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

function isFruitName(name) {
  const l = (name || '').toLowerCase();
  return l.includes('apple') || l.includes('banana') || l.includes('papaya') ||
         l.includes('guava') || l.includes('orange') || l.includes('watermelon') ||
         l.includes('pomegranate') || l.includes('fruit') || l.includes('berry');
}

function isMeatName(name) {
  const l = (name || '').toLowerCase();
  return l.includes('chicken') || l.includes('mutton') || l.includes('lamb') ||
         l.includes('fish') || l.includes('salmon') || l.includes('tuna') || l.includes('shrimp');
}

function evaluateConfirmedPoolFeasibility(pool, targetCal) {
  if (!pool || pool.length === 0) return { feasible: true };
  let totalCalPer100 = 0;
  let maxPro = 0;
  let hasStapleOrProtein = false;

  for (const f of pool) {
    const nut = lookupNutrient(f);
    totalCalPer100 += nut.cal;
    if (nut.pro > maxPro) maxPro = nut.pro;
    if (nut.cal >= 80 || nut.pro >= 6) hasStapleOrProtein = true;
  }
  const avgCal = totalCalPer100 / pool.length;
  if (avgCal < 45 || !hasStapleOrProtein) {
    return {
      feasible: false,
      reason: `Your confirmed food list contains predominantly low-caloric/high-water vegetables (average ~${Math.round(avgCal)} kcal/100g). Reaching ${targetCal} kcal exclusively with these foods would require consuming >4-5 kg of food daily, which is physiologically unrealistic. We recommend adding whole grains (rice, roti, oats) or protein staples (paneer, eggs, chicken, lentils).`
    };
  }
  return { feasible: true };
}

function buildFiveMealsForDay(dayNum, targetCal, confirmedPool) {
  const isDefaultPool = !confirmedPool || !confirmedPool.length;
  const target = targetCal || 2100;

  // Calorie targets across 5 meal slots:
  // Breakfast: ~24% (~504 kcal)
  // Pre-Lunch (11:30 AM Fruit Snack): ~10% (~210 kcal)
  // Lunch: ~34% (~714 kcal)
  // Evening Snack: ~12% (~252 kcal)
  // Dinner: ~20% (~420 kcal)
  const tB = target * 0.24;
  const tPL = target * 0.10;
  const tL = target * 0.34;
  const tES = target * 0.12;
  const tD = target * 0.20;

  let bItems, plItems, lItems, esItems, dItems;

  if (isDefaultPool) {
    // 1. Breakfast
    const bDef = INDIAN_BREAKFASTS_7[(dayNum - 1) % INDIAN_BREAKFASTS_7.length];
    bItems = bDef.map(x => createFoodItem(x[0], x[1], null, 'Freshly prepared breakfast'));
    bItems = scaleItemsToTargetCal(bItems, tB);

    // 2. Pre-Lunch (11:30 AM Fruit Snack)
    const fruit = ROTATING_FRUITS_7[(dayNum - 1) % ROTATING_FRUITS_7.length];
    plItems = [
      createFoodItem(fruit, 130, null, 'Fresh sliced fruit portion'),
      createFoodItem('Almonds', 20, null, 'Healthy raw almonds')
    ];
    plItems = scaleItemsToTargetCal(plItems, tPL);

    // 3. Lunch (1:30 PM)
    const lDef = INDIAN_LUNCH_COMBOS_7[(dayNum - 1) % INDIAN_LUNCH_COMBOS_7.length];
    lItems = lDef.map((x, idx) => createFoodItem(x[0], x[1], null, idx === 0 ? 'Steamed grains portion' : (idx === 1 ? 'Protein accompaniment' : 'Fresh crisp greens')));
    lItems = scaleItemsToTargetCal(lItems, tL);

    // 4. Evening Snack (5:00 PM) - Realistic Indian snack (NEVER raw spinach or plain dal!)
    const esDef = INDIAN_SNACKS_7[(dayNum - 1) % INDIAN_SNACKS_7.length];
    esItems = esDef.map(x => createFoodItem(x[0], x[1], null, 'Wholesome evening snack'));
    esItems = scaleItemsToTargetCal(esItems, tES);

    // 5. Dinner (8:00 PM)
    const dDef = INDIAN_DINNER_COMBOS_7[(dayNum - 1) % INDIAN_DINNER_COMBOS_7.length];
    dItems = dDef.map(x => createFoodItem(x[0], x[1], null, 'Light wholesome dinner'));
    dItems = scaleItemsToTargetCal(dItems, tD);
  } else {
    // Strictly use ONLY items from confirmedPool
    const pool = confirmedPool;
    const fruits = pool.filter(isFruitName);
    const meats = pool.filter(isMeatName);
    const nonMeats = pool.filter(f => !isMeatName(f));
    const grains = pool.filter(f => /rice|oat|roti|chapati|poha|idli|dosa|bread|grain/i.test(f));
    const proteinStaples = pool.filter(f => /chicken|fish|egg|paneer|tofu|dal|curd|yogurt|chana/i.test(f));

    // 1. Breakfast: Non-meat items (Never chicken + rice in breakfast)
    // Rotate between grain + egg/paneer or fruit + egg/paneer
    let bItem1, bItem2;
    if (grains.length > 0) {
      bItem1 = grains[(dayNum - 1) % grains.length];
      const nonMeatPro = proteinStaples.filter(f => !isMeatName(f) && f !== bItem1);
      bItem2 = nonMeatPro.length > 0 ? nonMeatPro[(dayNum - 1) % nonMeatPro.length] : (nonMeats.find(f => f !== bItem1) || pool[0]);
    } else {
      bItem1 = nonMeats[(dayNum - 1) % nonMeats.length];
      bItem2 = nonMeats[(dayNum) % nonMeats.length];
    }
    bItems = [
      createFoodItem(bItem1, 160, null, 'Wholesome morning staple'),
      createFoodItem(bItem2, 100, null, 'Breakfast protein portion')
    ];
    bItems = scaleItemsToTargetCal(bItems, tB);

    // 2. Pre-Lunch: 11:30 AM Fruit Snack
    if (fruits.length > 0) {
      const fItem = fruits[(dayNum - 1) % fruits.length];
      const sideCandidate = pool.find(f => f !== fItem && /paneer|egg|almond|peanut|curd|yogurt/i.test(f));
      plItems = sideCandidate
        ? [createFoodItem(fItem, 140, null, 'Fresh sliced fruit snack'), createFoodItem(sideCandidate, 25, null, 'Nutrient-rich accompaniment')]
        : [createFoodItem(fItem, 200, null, 'Fresh generous fruit portion')];
    } else {
      plItems = [createFoodItem(pool[(dayNum + 1) % pool.length], 120, null, 'Mid-morning portion')];
    }
    plItems = scaleItemsToTargetCal(plItems, tPL);

    // 3. Lunch: Hearty main meal
    const lunchCarb = grains.length > 0 ? grains[(dayNum - 1) % grains.length] : pool[0];
    const lunchPro = (meats.length > 0 && dayNum % 2 === 1) ? meats[(dayNum - 1) % meats.length] : (proteinStaples[(dayNum) % proteinStaples.length] || pool[1 % pool.length]);
    const lunchSide = pool.find(f => f !== lunchCarb && f !== lunchPro && !isFruitName(f));
    lItems = [
      createFoodItem(lunchCarb, 180, null, 'Steamed wholesome portion'),
      createFoodItem(lunchPro, 150, null, 'Hearty protein portion')
    ];
    if (lunchSide) {
      lItems.push(createFoodItem(lunchSide, 70, null, 'Fresh side portion'));
    }
    lItems = scaleItemsToTargetCal(lItems, tL);

    // 4. Evening Snack: Wholesome snack from confirmed pool (NEVER raw spinach or plain dal if others available)
    const snackPro = proteinStaples.filter(f => /paneer|egg|almond|peanut|curd|yogurt/i.test(f));
    if (snackPro.length > 0) {
      const sp = snackPro[(dayNum - 1) % snackPro.length];
      const sf = fruits.length > 0 ? fruits[(dayNum) % fruits.length] : null;
      esItems = (sf && sf !== sp)
        ? [createFoodItem(sp, 60, null, 'Protein snack portion'), createFoodItem(sf, 60, null, 'Fruit accompaniment')]
        : [createFoodItem(sp, 90, null, 'Wholesome protein snack')];
    } else {
      esItems = [createFoodItem(pool[(dayNum + 2) % pool.length], 100, null, 'Light mid-day portion')];
    }
    esItems = scaleItemsToTargetCal(esItems, tES);

    // 5. Dinner: Wholesome dinner
    const dinnerCarb = grains.length > 0 ? grains[(dayNum) % grains.length] : pool[0];
    const dinnerPro = (meats.length > 0 && dayNum % 2 === 0) ? meats[(dayNum - 1) % meats.length] : (proteinStaples[(dayNum + 1) % proteinStaples.length] || pool[1 % pool.length]);
    dItems = [
      createFoodItem(dinnerCarb, 130, null, 'Light evening grain'),
      createFoodItem(dinnerPro, 120, null, 'Light protein portion')
    ];
    dItems = scaleItemsToTargetCal(dItems, tD);
  }

  const bTotals = calculateMealTotals(bItems);
  const plTotals = calculateMealTotals(plItems);
  const lTotals = calculateMealTotals(lItems);
  const esTotals = calculateMealTotals(esItems);
  const dTotals = calculateMealTotals(dItems);

  return [
    { slot: 'BREAKFAST', slotTitle: '🌅 Breakfast', timeWindow: '08:30 AM', title: '🌅 Breakfast', timing: '08:30 AM', items: bItems, subtotalCalories: bTotals.totalCalories, subtotalProtein: bTotals.totalProtein, subtotalCarbs: bTotals.totalCarbs, subtotalFat: bTotals.totalFat, subtotalFibre: bTotals.totalFibre, ...bTotals, status: 'PENDING' },
    { slot: 'PRE_LUNCH', slotTitle: '🍎 11:30 AM Mid-Morning Fruit Snack', timeWindow: '11:30 AM', title: '🍎 Pre-Lunch (11:30 AM Fruit Snack)', timing: '11:30 AM', items: plItems, subtotalCalories: plTotals.totalCalories, subtotalProtein: plTotals.totalProtein, subtotalCarbs: plTotals.totalCarbs, subtotalFat: plTotals.totalFat, subtotalFibre: plTotals.totalFibre, ...plTotals, status: 'PENDING' },
    { slot: 'LUNCH', slotTitle: '🍛 Lunch', timeWindow: '01:30 PM', title: '🍱 Lunch', timing: '01:30 PM', items: lItems, subtotalCalories: lTotals.totalCalories, subtotalProtein: lTotals.totalProtein, subtotalCarbs: lTotals.totalCarbs, subtotalFat: lTotals.totalFat, subtotalFibre: lTotals.totalFibre, ...lTotals, status: 'PENDING' },
    { slot: 'EVENING_SNACK', slotTitle: '🥜 Evening Snack', timeWindow: '05:00 PM', title: '☕ Evening Snack', timing: '05:00 PM', items: esItems, subtotalCalories: esTotals.totalCalories, subtotalProtein: esTotals.totalProtein, subtotalCarbs: esTotals.totalCarbs, subtotalFat: esTotals.totalFat, subtotalFibre: esTotals.totalFibre, ...esTotals, status: 'PENDING' },
    { slot: 'DINNER', slotTitle: '🍲 Dinner', timeWindow: '08:00 PM', title: '🌙 Dinner', timing: '08:00 PM', items: dItems, subtotalCalories: dTotals.totalCalories, subtotalProtein: dTotals.totalProtein, subtotalCarbs: dTotals.totalCarbs, subtotalFat: dTotals.totalFat, subtotalFibre: dTotals.totalFibre, ...dTotals, status: 'PENDING' }
  ];
}

console.log('--- TEST 1: DEFAULT POOL (7 DAYS @ 2100 KCAL) ---');
for (let d = 1; d <= 7; d++) {
  const meals = buildFiveMealsForDay(d, 2100, null);
  let dayCal = 0, dayPro = 0, dayCarbs = 0, dayFat = 0;
  meals.forEach(m => {
    dayCal += m.unroundedCal;
    dayPro += m.unroundedPro;
    dayCarbs += m.unroundedCarbs;
    dayFat += m.unroundedFat;
  });
  const actCal = Math.round(dayCal * 10) / 10;
  const actPro = Math.round(dayPro * 10) / 10;
  const actCarb = Math.round(dayCarbs * 10) / 10;
  const actFat = Math.round(dayFat * 10) / 10;
  const diffPct = Math.round(Math.abs(actCal - 2100) / 2100 * 1000) / 10;
  console.log(`Day ${d}: ${actCal} kcal (Diff: ${diffPct}%) | P: ${actPro}g, C: ${actCarb}g, F: ${actFat}g`);
  assert(diffPct <= 2.0, `Day ${d} difference must be <= 2%`);
}

console.log('\n--- TEST 2: CONFIRMED POOL (Rice, Eggs, Banana, Chicken, Paneer @ 2100 KCAL) ---');
const confirmed = ['White Rice (Cooked)', 'Eggs (Whole Boiled)', 'Banana', 'Chicken Breast (Grilled)', 'Paneer (Fresh/Raw)'];
for (let d = 1; d <= 7; d++) {
  const meals = buildFiveMealsForDay(d, 2100, confirmed);
  let dayCal = 0, dayPro = 0, dayCarbs = 0, dayFat = 0;
  meals.forEach(m => {
    dayCal += m.unroundedCal;
    dayPro += m.unroundedPro;
    dayCarbs += m.unroundedCarbs;
    dayFat += m.unroundedFat;
  });
  const actCal = Math.round(dayCal * 10) / 10;
  const actPro = Math.round(dayPro * 10) / 10;
  const actCarb = Math.round(dayCarbs * 10) / 10;
  const actFat = Math.round(dayFat * 10) / 10;
  const diffPct = Math.round(Math.abs(actCal - 2100) / 2100 * 1000) / 10;
  console.log(`Day ${d}: ${actCal} kcal (Diff: ${diffPct}%) | P: ${actPro}g, C: ${actCarb}g, F: ${actFat}g`);
  assert(diffPct <= 2.0, `Day ${d} difference must be <= 2%`);
  // Assert ONLY confirmed foods used
  meals.forEach(m => {
    m.items.forEach(it => {
      const match = confirmed.some(c => c.toLowerCase().includes(it.name.toLowerCase()) || it.name.toLowerCase().includes(c.toLowerCase()));
      assert(match, `Item ${it.name} not in confirmed pool`);
    });
  });
}

console.log('\n--- TEST 3: FEASIBILITY CHECK ON WATERY VEGETABLES ONLY ---');
const lowCalPool = ['Cucumber', 'Spinach (Raw)'];
const feasibility = evaluateConfirmedPoolFeasibility(lowCalPool, 2100);
console.log('Feasible:', feasibility.feasible);
console.log('Reason:', feasibility.reason);
assert.strictEqual(feasibility.feasible, false);
console.log('\nAll unit tests passed! ✅');
