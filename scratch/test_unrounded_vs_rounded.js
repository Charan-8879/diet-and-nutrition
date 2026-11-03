const fs = require('fs');

const serverText = fs.readFileSync('server.js', 'utf8');

// We want to test buildFiveMealsForDay across 25 days with unrounded accumulation
const serverDbMatch = serverText.match(/const NUTRITION_DB = \{([\s\S]*?)\n\};/);
eval('var NUTRITION_DB = {' + serverDbMatch[1] + '};');

function lookupNutrient(name) {
  if (!name) return { name: 'Mixed Greens Salad', emoji: '🥗', cal: 25, pro: 1.5, carbs: 4, fat: 0.2, fib: 2, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false };
  const clean = name.toLowerCase().trim();
  if (NUTRITION_DB[clean]) return NUTRITION_DB[clean];

  const isRaw = clean.includes('raw') || clean.includes('uncooked') || clean.includes('dry');
  const isCooked = clean.includes('cooked') || clean.includes('grilled') || clean.includes('roasted') || clean.includes('boiled') || clean.includes('steamed');

  for (const k of Object.keys(NUTRITION_DB)) {
    if (isRaw && NUTRITION_DB[k].state === 'raw' && (clean.includes(k) || k.includes(clean))) {
      return NUTRITION_DB[k];
    }
    if (isCooked && (NUTRITION_DB[k].state === 'cooked' || NUTRITION_DB[k].state === 'fresh') && (clean.includes(k) || k.includes(clean))) {
      return NUTRITION_DB[k];
    }
  }

  for (const k of Object.keys(NUTRITION_DB)) {
    if (clean.includes(k) || k.includes(clean)) return NUTRITION_DB[k];
  }
  return { name: name, emoji: '🥗', cal: 120, pro: 6, carbs: 15, fat: 3, fib: 2.5, state: isRaw ? 'raw' : 'cooked', source: 'ESTIMATED', isEstimated: true };
}

// Extract food items generated for day 1 through 7
const INDIAN_BREAKFASTS_7 = [
  ['Idli (Steamed)', 'Sambar'],
  ['Dosa (Plain)', 'Sambar'],
  ['Poha (Cooked)', 'Curd / Dahi (Low Fat)'],
  ['Pongal (Ven Pongal)', 'Coconut Chutney'],
  ['Upma (Rava Upma)', 'Sambar'],
  ['Whole Wheat Chapati / Roti', 'Curd / Dahi (Low Fat)'],
  ['Idli (Steamed)', 'Peanut / Groundnut Chutney']
];

const ROTATING_FRUITS_7 = [
  'Apple', 'Banana', 'Papaya', 'Guava', 'Orange', 'Watermelon', 'Pomegranate'
];

const INDIAN_LUNCH_COMBOS_7 = [
  ['White Rice (Cooked)', 'Moong Dal (Cooked)', 'Spinach (Raw)'],
  ['White Rice (Cooked)', 'Chicken Breast (Grilled)', 'Cucumber'],
  ['Whole Wheat Chapati / Roti', 'Paneer (Fresh/Raw)', 'Cucumber'],
  ['White Rice (Cooked)', 'Fish (Steamed Rohu)', 'Spinach (Raw)'],
  ['Brown Rice (Cooked)', 'Moong Dal (Cooked)', 'Broccoli (Steamed)'],
  ['Whole Wheat Chapati / Roti', 'Chicken Breast (Grilled)', 'Mixed Green Salad'],
  ['White Rice (Cooked)', 'Chickpeas / Chana (Cooked)', 'Cucumber']
];

const INDIAN_DINNER_COMBOS_7 = [
  ['Whole Wheat Chapati / Roti', 'Moong Dal (Cooked)'],
  ['Idli (Steamed)', 'Sambar'],
  ['Whole Wheat Chapati / Roti', 'Paneer (Fresh/Raw)'],
  ['Dosa (Plain)', 'Sambar'],
  ['Whole Wheat Chapati / Roti', 'Moong Dal (Cooked)'],
  ['Brown Rice (Cooked)', 'Fish (Steamed Rohu)'],
  ['Whole Wheat Chapati / Roti', 'Paneer (Fresh/Raw)']
];

for (let d = 1; d <= 7; d++) {
  console.log(`\n=================== DAY ${d} ACCUMULATION AUDIT ===================`);
  const b = INDIAN_BREAKFASTS_7[d - 1];
  const pl = ROTATING_FRUITS_7[d - 1];
  const l = INDIAN_LUNCH_COMBOS_7[d - 1];
  const es = 'Almonds';
  const din = INDIAN_DINNER_COMBOS_7[d - 1];

  const meals = [
    { name: 'Breakfast', items: [{ name: b[0], g: 90 }, { name: b[1], g: 120 }] },
    { name: 'Pre-Lunch (11:30 AM Fruit)', items: [{ name: pl, g: 120 }] },
    { name: 'Lunch', items: [{ name: l[0], g: 150 }, { name: l[1], g: 130 }, { name: l[2], g: 80 }] },
    { name: 'Evening Snack', items: [{ name: es, g: 30 }] },
    { name: 'Dinner', items: [{ name: din[0], g: 100 }, { name: din[1], g: 130 }] }
  ];

  let unroundedDayCal = 0, unroundedDayPro = 0, unroundedDayCarb = 0, unroundedDayFat = 0, unroundedDayFib = 0;
  let sumMealCal = 0, sumMealPro = 0, sumMealCarb = 0, sumMealFat = 0, sumMealFib = 0;

  for (const m of meals) {
    let unroundedMealCal = 0, unroundedMealPro = 0, unroundedMealCarb = 0, unroundedMealFat = 0, unroundedMealFib = 0;
    let sumItemCal = 0, sumItemPro = 0, sumItemCarb = 0, sumItemFat = 0, sumItemFib = 0;

    for (const it of m.items) {
      const fn = lookupNutrient(it.name);
      const factor = it.g / 100;
      const rawCal = fn.cal * factor;
      const rawPro = fn.pro * factor;
      const rawCarb = fn.carbs * factor;
      const rawFat = fn.fat * factor;
      const rawFib = fn.fib * factor;

      unroundedMealCal += rawCal;
      unroundedMealPro += rawPro;
      unroundedMealCarb += rawCarb;
      unroundedMealFat += rawFat;
      unroundedMealFib += rawFib;

      // item display rounded to 1 decimal
      const dispCal = Math.round(rawCal * 10) / 10;
      const dispPro = Math.round(rawPro * 10) / 10;
      const dispCarb = Math.round(rawCarb * 10) / 10;
      const dispFat = Math.round(rawFat * 10) / 10;
      const dispFib = Math.round(rawFib * 10) / 10;

      sumItemCal += dispCal;
      sumItemPro += dispPro;
      sumItemCarb += dispCarb;
      sumItemFat += dispFat;
      sumItemFib += dispFib;

      console.log(`  ${m.name} -> ${it.name} (${it.g}g) [${fn.state}]: rawCal=${rawCal.toFixed(2)}, dispCal=${dispCal}, rawPro=${rawPro.toFixed(2)}, dispPro=${dispPro}`);
    }

    const mealCalDisp = Math.round(unroundedMealCal * 10) / 10;
    const mealProDisp = Math.round(unroundedMealPro * 10) / 10;
    const mealCarbDisp = Math.round(unroundedMealCarb * 10) / 10;
    const mealFatDisp = Math.round(unroundedMealFat * 10) / 10;
    const mealFibDisp = Math.round(unroundedMealFib * 10) / 10;

    console.log(`  => ${m.name} Total: unroundedCal=${unroundedMealCal.toFixed(2)} -> disp=${mealCalDisp} (sum of item disp=${sumItemCal.toFixed(1)}), unroundedPro=${unroundedMealPro.toFixed(2)} -> disp=${mealProDisp} (sum of item disp=${sumItemPro.toFixed(1)})`);

    unroundedDayCal += unroundedMealCal;
    unroundedDayPro += unroundedMealPro;
    unroundedDayCarb += unroundedMealCarb;
    unroundedDayFat += unroundedMealFat;
    unroundedDayFib += unroundedMealFib;

    sumMealCal += mealCalDisp;
    sumMealPro += mealProDisp;
    sumMealCarb += mealCarbDisp;
    sumMealFat += mealFatDisp;
    sumMealFib += mealFibDisp;
  }

  const dayCalFromUnrounded = Math.round(unroundedDayCal * 10) / 10;
  const dayProFromUnrounded = Math.round(unroundedDayPro * 10) / 10;
  const dayCalFromMeals = Math.round(sumMealCal * 10) / 10;
  const dayProFromMeals = Math.round(sumMealPro * 10) / 10;

  console.log(`DAY ${d} SUMMARY:`);
  console.log(`  Calories: unroundedSum=${unroundedDayCal.toFixed(2)} => ${dayCalFromUnrounded} | sum of 5 meals = ${dayCalFromMeals}`);
  console.log(`  Protein:  unroundedSum=${unroundedDayPro.toFixed(2)} => ${dayProFromUnrounded} | sum of 5 meals = ${dayProFromMeals}`);
}

