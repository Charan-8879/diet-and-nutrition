const fs = require('fs');
const assert = require('assert');

// Test with server.js buildFiveMealsForDay
const serverText = fs.readFileSync('server.js', 'utf8');
const serverDbMatch = serverText.match(/const NUTRITION_DB = \{([\s\S]*?)\n\};/);
eval('var NUTRITION_DB = {' + serverDbMatch[1] + '};');

const app = require('../server.js');

async function test7DayPlan() {
  console.log('================================================================');
  console.log('  VERIFYING COMPLETE 7-DAY PLAN & ALL 5 MEAL SLOTS (INC. 11:30 AM)');
  console.log('================================================================\n');

  // Query server.js Express app endpoint /api/diet/generate
  const EventEmitter = require('events');
  function postApi(url, body) {
    return new Promise((resolve, reject) => {
      const { EventEmitter } = require('events');
      const req = new EventEmitter();
      req.method = 'POST';
      req.url = url;
      req.headers = { 'content-type': 'application/json' };
      req.body = body;
      req.query = {};
      const res = {
        _statusCode: 200,
        _headers: {},
        _body: null,
        status(c) { this._statusCode = c; return this; },
        setHeader(k, v) { this._headers[k] = v; return this; },
        json(d) { this._body = d; resolve({ status: this._statusCode, data: d }); },
        send(d) {
          try { this._body = JSON.parse(d); } catch (e) { this._body = d; }
          resolve({ status: this._statusCode, data: this._body });
        }
      };
      app.handle(req, res, (err) => { if (err) reject(err); });
    });
  }

  const res = await postApi('/api/diet/generate', {
    email: 'test_review@healthify.com',
    planType: '7_DAY',
    goal: 'Weight Loss',
    targetCalories: 2100
  });

  assert.strictEqual(res.status, 200, 'Endpoint must return 200');
  const plan = res.data.dietPlan;
  assert.ok(plan, 'Plan must exist');
  assert.strictEqual(plan.days.length, 7, 'Must have 7 days');

  const requiredSlots = ['BREAKFAST', 'PRE_LUNCH', 'LUNCH', 'EVENING_SNACK', 'DINNER'];
  const fruitNamesFound = [];

  for (const day of plan.days) {
    console.log(`\n----------------------------------------------------------------`);
    console.log(`📅 DAY ${day.dayNumber}: ${day.dayTitle} (Target: ${day.targetCalories} kcal | Calculated: ${day.totalCalories} kcal, ${day.totalProtein}g P, ${day.totalCarbs}g C, ${day.totalFat}g F)`);
    console.log(`----------------------------------------------------------------`);
    assert.strictEqual(day.meals.length, 5, `Day ${day.dayNumber} must have 5 meals`);

    let dayUnroundedCal = 0, dayUnroundedPro = 0, dayUnroundedCarb = 0, dayUnroundedFat = 0;
    let sumMealDisplayedCal = 0, sumMealDisplayedPro = 0;

    for (let mIdx = 0; mIdx < day.meals.length; mIdx++) {
      const meal = day.meals[mIdx];
      assert.strictEqual(meal.slot, requiredSlots[mIdx], `Meal ${mIdx} must be slot ${requiredSlots[mIdx]}`);

      // Requirement 6 check: Slot 2 must be 11:30 AM Fruit Snack
      if (meal.slot === 'PRE_LUNCH') {
        assert.ok(meal.timeWindow === '11:30 AM' || meal.timing === '11:30 AM', `Slot 2 must be 11:30 AM, got: ${meal.timing}`);
        assert.ok(meal.slotTitle.includes('Fruit') || meal.title.includes('Fruit'), `Slot 2 must be Fruit Snack, got: ${meal.slotTitle}`);
        const fruitItem = meal.items[0];
        assert.ok(fruitItem, 'Pre-lunch slot must contain a fruit item');
        fruitNamesFound.push(fruitItem.name);
      }

      // Requirement 5 check: displayed meal calories and macros match the sum of its actual ingredients
      let mealItemSumCal = 0, mealItemSumPro = 0, mealItemSumCarb = 0, mealItemSumFat = 0;
      let mealUnroundedCal = 0, mealUnroundedPro = 0, mealUnroundedCarb = 0, mealUnroundedFat = 0;

      for (const it of meal.items) {
        mealItemSumCal += it.cal;
        mealItemSumPro += it.pro;
        mealItemSumCarb += it.carbs;
        mealItemSumFat += it.fat;

        mealUnroundedCal += (it.unroundedCal !== undefined ? it.unroundedCal : it.cal);
        mealUnroundedPro += (it.unroundedPro !== undefined ? it.unroundedPro : it.pro);
        mealUnroundedCarb += (it.unroundedCarbs !== undefined ? it.unroundedCarbs : it.carbs);
        mealUnroundedFat += (it.unroundedFat !== undefined ? it.unroundedFat : it.fat);

        // Requirement 4 check: preparation states must be accurate
        assert.ok(it.state, `Item ${it.name} must have a valid state`);
        assert.ok(['raw', 'cooked', 'fresh', 'dry', 'boiled', 'steamed', 'grilled'].includes(it.state.toLowerCase()), `Invalid state: ${it.state}`);
      }

      // Check meal displayed values match item sum within 0.2
      assert.ok(Math.abs(meal.totalCalories - mealItemSumCal) < 0.2, `Meal ${meal.slot} cal mismatch: ${meal.totalCalories} vs ${mealItemSumCal}`);
      assert.ok(Math.abs(meal.totalProtein - mealItemSumPro) < 0.2, `Meal ${meal.slot} pro mismatch: ${meal.totalProtein} vs ${mealItemSumPro}`);

      sumMealDisplayedCal += meal.totalCalories;
      sumMealDisplayedPro += meal.totalProtein;
      dayUnroundedCal += mealUnroundedCal;
      dayUnroundedPro += mealUnroundedPro;

      const itemDesc = meal.items.map(it => `${it.name} (${it.grams}g [${it.state}] -> ${it.cal} kcal, ${it.pro}g P | src: ${it.valueSource})`).join(' + ');
      console.log(`  🍽️ [${meal.timing}] ${meal.slotTitle} (${meal.totalCalories} kcal, ${meal.totalProtein}g P): ${itemDesc}`);
    }

    // Requirement 3 check: Day totals calculated from unrounded ingredients and rounded only for display
    const expectedDayCal = Math.round(dayUnroundedCal * 10) / 10;
    const expectedDayPro = Math.round(dayUnroundedPro * 10) / 10;
    assert.ok(Math.abs(day.totalCalories - expectedDayCal) <= 0.5, `Day ${day.dayNumber} totalCalories vs unrounded ingredient sum (${day.totalCalories} vs ${expectedDayCal})`);
    assert.ok(Math.abs(day.totalProtein - expectedDayPro) <= 0.5, `Day ${day.dayNumber} totalProtein vs unrounded ingredient sum (${day.totalProtein} vs ${expectedDayPro})`);
    assert.strictEqual(day.totalCalories, Math.round(sumMealDisplayedCal * 10) / 10, `Day ${day.dayNumber} totalCalories strictly matches sum of 5 meals`);
    assert.strictEqual(day.totalProtein, Math.round(sumMealDisplayedPro * 10) / 10, `Day ${day.dayNumber} totalProtein strictly matches sum of 5 meals`);

    console.log(`  📊 Verification: Day Total (${day.totalCalories} kcal) matches unrounded sum (${expectedDayCal} kcal) and sum of 5 meals (${Math.round(sumMealDisplayedCal*10)/10} kcal) ✅`);
  }

  console.log(`\n🍎 11:30 AM Mid-Morning Fruit Snack 7-Day Rotation:`);
  fruitNamesFound.forEach((fn, idx) => console.log(`   Day ${idx + 1}: ${fn}`));
  assert.strictEqual(new Set(fruitNamesFound).size, 7, '7 distinct fruits must be rotated across the 7 days');

  console.log('\n================================================================');
  console.log('  ALL 7 DAYS AND ALL 5 MEAL SLOTS VERIFIED WITH 100% SUCCESS! ✅');
  console.log('================================================================');
  process.exit(0);
}

test7DayPlan().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
