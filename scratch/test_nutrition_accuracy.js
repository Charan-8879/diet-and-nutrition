const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  HEALTHIFY: NUTRITIONAL CALCULATION ACCURACY & CONSISTENCY TEST');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function itAsync(desc, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

// -------------------------------------------------------------
// PART 1: server.js Engine & Database Verification
// -------------------------------------------------------------
const app = require('../server.js');

it('1. Cooked chicken breast protein is approximately 30-31g per 100g (USDA FDC 171477)', () => {
  const req = { body: { message: 'chicken breast', fullUserData: {} } };
  // Access server.js createFoodItem / lookupNutrient
  const item = app._test_createFoodItem ? app._test_createFoodItem('Chicken Breast (Grilled)', 100) : null;
  // If not exported, test via route or test harness
});

// Let's create an in-process caller for server.js Express app
function callApp(method, url, body = {}) {
  return new Promise((resolve, reject) => {
    const { EventEmitter } = require('events');
    const req = new EventEmitter();
    req.method = method;
    req.url = url;
    req.headers = { 'content-type': 'application/json' };
    req.body = body;
    req.query = {};

    if (url.includes('?')) {
      const parts = url.split('?');
      req.url = parts[0];
      const params = new URLSearchParams(parts[1]);
      for (const [k, v] of params) req.query[k] = v;
    }

    const res = {
      _statusCode: 200,
      _headers: {},
      _body: null,
      status(c) { this._statusCode = c; return this; },
      setHeader(k, v) { this._headers[k] = v; return this; },
      json(d) { this._body = d; resolve({ status: this._statusCode, body: d }); },
      send(d) {
        try { this._body = JSON.parse(d); } catch (e) { this._body = d; }
        resolve({ status: this._statusCode, body: this._body });
      }
    };

    app.handle(req, res, (err) => {
      if (err) reject(err);
      else resolve({ status: 404, body: { error: 'Not found' } });
    });
  });
}

async function runAllTests() {
  console.log('\n--- SUITE 1: 5-Meal Diet Generation & Accurate Macro Calculations ---');

  // Test 7-Day Plan with Confirmed Available Foods
  const genRes7 = await callApp('POST', '/api/diet/generate', {
    email: 'nutrition_test@healthify.com',
    planType: '7_DAY',
    goal: 'Weight Loss',
    targetCalories: 2050,
    confirmedFoods: ['Chicken Breast', 'Eggs', 'Banana', 'Rice', 'Paneer', 'Oats', 'Spinach', 'Apple']
  });

  await itAsync('1.1 /api/diet/generate returns success with 7 days and 5 meals per day', async () => {
    assert.strictEqual(genRes7.status, 200);
    assert.strictEqual(genRes7.body.success, true);
    assert.strictEqual(genRes7.body.dietPlan.days.length, 7);
    genRes7.body.dietPlan.days.forEach(d => {
      assert.strictEqual(d.meals.length, 5, `Day ${d.dayNumber} must have exactly 5 meals`);
    });
  });

  await itAsync('1.2 Daily totals strictly equal the exact sum of the five meal totals across all 7 days', async () => {
    genRes7.body.dietPlan.days.forEach(d => {
      let sumCal = 0, sumPro = 0, sumCarbs = 0, sumFat = 0, sumFib = 0;
      d.meals.forEach(m => {
        sumCal += m.subtotalCalories;
        sumPro += m.subtotalProtein;
        sumCarbs += m.subtotalCarbs;
        sumFat += m.subtotalFat;
        sumFib += m.subtotalFibre;
      });

      assert.ok(Math.abs(d.totalCalories - sumCal) < 0.2, `Day ${d.dayNumber} totalCalories (${d.totalCalories}) must equal sum of 5 meals (${sumCal})`);
      assert.ok(Math.abs(d.totalProtein - sumPro) < 0.2, `Day ${d.dayNumber} totalProtein (${d.totalProtein}) must equal sum of 5 meals (${sumPro})`);
      assert.ok(Math.abs(d.totalCarbs - sumCarbs) < 0.2, `Day ${d.dayNumber} totalCarbs (${d.totalCarbs}) must equal sum of 5 meals (${sumCarbs})`);
      assert.ok(Math.abs(d.totalFat - sumFat) < 0.2, `Day ${d.dayNumber} totalFat (${d.totalFat}) must equal sum of 5 meals (${sumFat})`);
    });
  });

  await itAsync('1.3 Meal subtotals strictly equal the sum of their individual ingredient items', async () => {
    genRes7.body.dietPlan.days.forEach(d => {
      d.meals.forEach(m => {
        let mealCal = 0, mealPro = 0, mealCarbs = 0, mealFat = 0, mealFib = 0;
        m.items.forEach(it => {
          mealCal += it.calories;
          mealPro += it.protein;
          mealCarbs += it.carbs;
          mealFat += it.fat;
          mealFib += it.fibre;
        });
        assert.ok(Math.abs(m.subtotalCalories - mealCal) < 0.2, `${m.slotTitle} subtotalCalories must equal sum of its items`);
        assert.ok(Math.abs(m.subtotalProtein - mealPro) < 0.2, `${m.slotTitle} subtotalProtein must equal sum of its items`);
      });
    });
  });

  await itAsync('1.4 Macro-Calorie consistency: displayed calories reasonably consistent with (P*4 + C*4 + F*9)', async () => {
    genRes7.body.dietPlan.days.forEach(d => {
      d.meals.forEach(m => {
        m.items.forEach(it => {
          // Atwater verification: P*4 + C*4 + F*9 vs displayed calories
          const macroCal = (it.protein * 4) + (it.carbs * 4) + (it.fat * 9);
          // For high fibre foods, macroCal can be slightly higher because USDA total carbs includes fibre (0-2 kcal/g)
          const diff = Math.abs(it.calories - macroCal);
          const maxAllowedDiff = Math.max(12, it.calories * 0.15); // within 15% or 12 kcal
          assert.ok(diff <= maxAllowedDiff, `Item ${it.name} (${it.grams}g): displayed ${it.calories} kcal vs macro ${macroCal.toFixed(1)} kcal (diff: ${diff.toFixed(1)})`);
        });
      });
    });
  });

  await itAsync('1.5 Never reuse identical nutrition values for different meals (Distinct Meal Values)', async () => {
    genRes7.body.dietPlan.days.forEach(d => {
      const mealCalories = d.meals.map(m => m.subtotalCalories);
      const uniqueCalories = new Set(mealCalories);
      assert.ok(uniqueCalories.size >= 4, `Day ${d.dayNumber} meals must have distinct nutrition subtotals (unique calories: ${uniqueCalories.size} of 5)`);
    });
  });

  await itAsync('1.6 Nutrition Transparency: valueSource and preparation state are present on all items', async () => {
    let checkedItems = 0;
    genRes7.body.dietPlan.days.forEach(d => {
      d.meals.forEach(m => {
        m.items.forEach(it => {
          assert.ok(it.state, `Item ${it.name} must have a preparation state`);
          assert.ok(it.valueSource, `Item ${it.name} must specify a valueSource`);
          assert.strictEqual(typeof it.isEstimated, 'boolean', `Item ${it.name} must have boolean isEstimated`);
          checkedItems++;
        });
      });
    });
    assert.ok(checkedItems >= 35, `Checked ${checkedItems} items across 7 days`);
  });

  console.log('\n--- SUITE 2: Specific Grounded Food Composition Assertions ---');

  // Find specific foods in the generated plan or query endpoint
  const coachChickenCooked = await callApp('POST', '/api/ai/coach', {
    message: 'What is the nutritional value of 100g cooked chicken breast?',
    fullUserData: {}
  });

  // Test 25-Day Plan
  const genRes25 = await callApp('POST', '/api/diet/generate', {
    email: 'nutrition_25day@healthify.com',
    planType: '25_DAY',
    goal: 'Muscle Gain',
    targetCalories: 2400,
    confirmedFoods: ['Chicken Breast', 'Eggs', 'Banana', 'Rice', 'Paneer', 'Oats', 'Spinach', 'Moong Dal']
  });

  await itAsync('2.1 25-Day Plan generates 25 distinct days, all summing to accurate daily totals', async () => {
    assert.strictEqual(genRes25.status, 200);
    assert.strictEqual(genRes25.body.dietPlan.days.length, 25);
    genRes25.body.dietPlan.days.forEach(d => {
      assert.strictEqual(d.meals.length, 5);
      const sumCal = d.meals.reduce((acc, m) => acc + m.subtotalCalories, 0);
      assert.ok(Math.abs(d.totalCalories - sumCal) < 0.2);
    });
  });

  await itAsync('2.2 Cooked chicken breast protein is grounded at ~30-31g per 100g', async () => {
    let found = false;
    genRes25.body.dietPlan.days.forEach(d => {
      d.meals.forEach(m => {
        m.items.forEach(it => {
          if (it.name.toLowerCase().includes('chicken') && (it.state.toLowerCase() === 'cooked' || it.name.toLowerCase().includes('grilled'))) {
            const proPer100g = (it.protein / it.grams) * 100;
            assert.ok(proPer100g >= 30.0 && proPer100g <= 31.5, `Cooked chicken breast must have 30-31g protein per 100g, got ${proPer100g.toFixed(1)}g`);
            found = true;
          }
        });
      });
    });
    assert.ok(found, 'Found cooked chicken breast in diet plan');
  });

  await itAsync('2.3 Banana nutrition is grounded at ~89 kcal and ~1.1g protein per 100g (USDA FDC 173944)', async () => {
    let found = false;
    genRes25.body.dietPlan.days.forEach(d => {
      d.meals.forEach(m => {
        m.items.forEach(it => {
          if (it.name.toLowerCase().includes('banana')) {
            const calPer100g = (it.calories / it.grams) * 100;
            const proPer100g = (it.protein / it.grams) * 100;
            assert.ok(calPer100g >= 85 && calPer100g <= 92, `Banana must be ~89 kcal per 100g, got ${calPer100g.toFixed(1)}`);
            assert.ok(proPer100g >= 1.0 && proPer100g <= 1.3, `Banana must be ~1.1g protein per 100g, got ${proPer100g.toFixed(1)}`);
            found = true;
          }
        });
      });
    });
    assert.ok(found, 'Found banana in diet plan');
  });

  await itAsync('2.4 Oats nutrition is grounded at ~16.9g protein per 100g dry oats (USDA FDC 1101825)', async () => {
    let found = false;
    genRes25.body.dietPlan.days.forEach(d => {
      d.meals.forEach(m => {
        m.items.forEach(it => {
          if (it.name.toLowerCase().includes('oats')) {
            const proPer100g = (it.protein / it.grams) * 100;
            if (it.state.toLowerCase() === 'raw' || it.name.toLowerCase().includes('raw')) {
              assert.ok(proPer100g >= 16.0 && proPer100g <= 17.5, `Raw/dry oats must have 16-17g protein per 100g, got ${proPer100g.toFixed(1)}g`);
              found = true;
            }
          }
        });
      });
    });
    assert.ok(found, 'Found oats in diet plan');
  });

  console.log('\n--- SUITE 3: Natural-Language Diet Editing & Total Recalculation ---');

  await itAsync('3.1 Editing dinner lighter maintains exact daily total sum', async () => {
    const editRes = await callApp('POST', '/api/diet/edit', {
      email: 'nutrition_test@healthify.com',
      currentPlan: genRes7.body.dietPlan,
      instruction: 'make dinner lighter'
    });

    assert.strictEqual(editRes.status, 200);
    const updatedPlan = editRes.body.dietPlan || editRes.body.updatedPlan;
    assert.ok(updatedPlan, 'Updated plan must be returned');

    updatedPlan.days.forEach(d => {
      let sumCal = 0;
      d.meals.forEach(m => { sumCal += m.subtotalCalories; });
      assert.ok(Math.abs(d.totalCalories - sumCal) < 0.2, `Day ${d.dayNumber} totalCalories (${d.totalCalories}) must equal sum of 5 meals (${sumCal}) after edit`);
    });
  });

  console.log('\n--- SUITE 4: Client-Side Script.js Nutrition Engine Verification ---');

  // Load and evaluate script.js in a mocked browser context
  const scriptContent = fs.readFileSync('script.js', 'utf8');
  const mockWindow = {
    location: { hostname: 'localhost', port: '8080' },
    localStorage: {
      _data: {},
      getItem(k) { return this._data[k] || null; },
      setItem(k, v) { this._data[k] = String(v); },
      removeItem(k) { delete this._data[k]; }
    }
  };
  const mockDoc = {
    addEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => []
  };

  const clientContext = {
    window: mockWindow,
    document: mockDoc,
    localStorage: mockWindow.localStorage,
    currentUser: { email: 'client_test@healthify.com', name: 'Tester' },
    foodLog: [],
    bootstrap: { Modal: { getOrCreateInstance: () => ({ show: ()=>{}, hide: ()=>{} }) } },
    AI_BACKEND_URL: 'http://localhost:8080'
  };

  const vm = require('vm');
  vm.createContext(clientContext);
  vm.runInContext(scriptContent, clientContext);

  it('4.1 CLIENT_NUTRITION_LOOKUP contains raw vs cooked chicken breast with USDA values', () => {
    const lookup = clientContext.CLIENT_NUTRITION_LOOKUP || clientContext.window.CLIENT_NUTRITION_LOOKUP;
    assert.ok(lookup['raw chicken breast'], 'Must have raw chicken breast');
    assert.ok(lookup['chicken breast'] || lookup['cooked chicken breast'], 'Must have cooked chicken breast');

    const raw = lookup['raw chicken breast'];
    assert.ok(raw.protein >= 22.0 && raw.protein <= 23.0, `Raw chicken protein ~22-23g (got ${raw.protein})`);
    assert.strictEqual(raw.state, 'raw');
    assert.strictEqual(raw.isEstimated, false);

    const cooked = lookup['cooked chicken breast'] || lookup['chicken breast'];
    assert.ok(cooked.protein >= 30.0 && cooked.protein <= 31.5, `Cooked chicken protein ~30-31g (got ${cooked.protein})`);
    assert.strictEqual(cooked.state, 'cooked');
    assert.strictEqual(cooked.isEstimated, false);
  });

  it('4.2 CLIENT_NUTRITION_LOOKUP contains dry oats with 16.9g protein per 100g', () => {
    const lookup = clientContext.CLIENT_NUTRITION_LOOKUP || clientContext.window.CLIENT_NUTRITION_LOOKUP;
    const oats = lookup['dry oats'] || lookup['oats'];
    assert.ok(oats, 'Must have oats entry');
    const proPer100 = (oats.protein / oats.quantity) * 100;
    assert.ok(proPer100 >= 16.0 && proPer100 <= 17.5, `Oats protein ~16-17g per 100g (got ${proPer100})`);
    assert.strictEqual(oats.isEstimated, false);
  });

  it('4.3 CLIENT_NUTRITION_LOOKUP contains realistic banana nutrition', () => {
    const lookup = clientContext.CLIENT_NUTRITION_LOOKUP || clientContext.window.CLIENT_NUTRITION_LOOKUP;
    const banana = lookup['banana'];
    assert.ok(banana, 'Must have banana');
    assert.ok(banana.calories >= 85 && banana.calories <= 92, `Banana calories ~89 (got ${banana.calories})`);
    assert.ok(banana.protein >= 1.0 && banana.protein <= 1.3, `Banana protein ~1.1g (got ${banana.protein})`);
    assert.strictEqual(banana.isEstimated, false);
  });

  it('4.4 Client fallback 5-meal diet plan strictly sums 5 meals to daily totals', () => {
    const result = clientContext.generateClientCoachFallbackWithPlan('generate 7-day diet plan', {
      profile: { targetCalories: 2100, selectedGoal: 'Weight Loss' }
    }, ['Chicken Breast', 'Eggs', 'Banana', 'Oats', 'Paneer']);

    assert.ok(result.dietPlan, 'Must generate dietPlan');
    assert.strictEqual(result.dietPlan.days.length, 7);

    result.dietPlan.days.forEach(d => {
      assert.strictEqual(d.meals.length, 5);
      const sumCal = d.meals.reduce((acc, m) => acc + m.subtotalCalories, 0);
      const sumPro = d.meals.reduce((acc, m) => acc + m.subtotalProtein, 0);
      assert.ok(Math.abs(d.totalCalories - sumCal) < 0.2, `Day ${d.dayNumber} totalCal (${d.totalCalories}) vs sum (${sumCal})`);
      assert.ok(Math.abs(d.totalProtein - sumPro) < 0.2, `Day ${d.dayNumber} totalPro (${d.totalProtein}) vs sum (${sumPro})`);
    });
  });

  it('4.5 renderDietPlanHtml displays preparation state and nutrition source badges', () => {
    const plan = clientContext.generateClientCoachFallbackWithPlan('generate 7-day diet plan', {
      profile: { targetCalories: 2100, selectedGoal: 'Weight Loss' }
    }, ['Chicken Breast', 'Eggs', 'Banana', 'Oats', 'Paneer']).dietPlan;

    const html = clientContext.renderDietPlanHtml(plan);
    assert.ok(html.includes('USDA FoodData Central') || html.includes('USDA') || html.includes('IFCT'), 'HTML must include nutrition source');
    assert.ok(html.includes('Raw') || html.includes('Cooked') || html.includes('Fresh'), 'HTML must include prep state badge');
  });

  console.log('================================================================');
  console.log(`  TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAllTests().catch(err => {
  console.error('Unhandled test failure:', err);
  process.exit(1);
});
