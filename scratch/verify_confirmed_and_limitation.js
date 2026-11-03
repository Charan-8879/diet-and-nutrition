const fs = require('fs');
const assert = require('assert');
const app = require('../server.js');

async function testConfirmedAndLimitation() {
  console.log('================================================================');
  console.log('  TESTING CONFIRMED FOODS & LIMITATION NOTE VIA SERVER API');
  console.log('================================================================\n');

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

  // 1. Confirmed Foods Plan: Rice, Eggs, Banana, Chicken, Paneer
  const confirmedList = ['White Rice (Cooked)', 'Eggs (Whole Boiled)', 'Banana', 'Chicken Breast (Grilled)', 'Paneer (Fresh/Raw)'];
  const resConfirmed = await postApi('/api/diet/generate', {
    email: 'test_confirmed@healthify.com',
    planType: '7_DAY',
    goal: 'Muscle Gain',
    targetCalories: 2100,
    confirmedFoods: confirmedList
  });

  assert.strictEqual(resConfirmed.status, 200);
  const plan = resConfirmed.data.dietPlan;
  assert.ok(plan);
  console.log('--- 7-DAY CONFIRMED FOODS PLAN (Target: 2100 kcal) ---');
  plan.days.forEach(d => {
    const diffPct = Math.round(Math.abs(d.totalCalories - 2100) / 2100 * 1000) / 10;
    console.log(`Day ${d.dayNumber}: ${d.totalCalories} kcal (Diff: ${diffPct}%) | P: ${d.totalProtein}g, C: ${d.totalCarbs}g, F: ${d.totalFat}g`);
    assert.ok(diffPct <= 2.0, `Day ${d.dayNumber} diff must be <= 2%`);
    // Ensure all items come from confirmed foods
    d.meals.forEach(m => {
      m.items.forEach(it => {
        const found = confirmedList.some(c => c.toLowerCase().includes(it.name.toLowerCase()) || it.name.toLowerCase().includes(c.toLowerCase()));
        assert.ok(found, `Food item "${it.name}" must be from confirmed foods`);
      });
    });
  });

  // 2. Limitation Note Feasibility Check on watery vegetables
  const resLimitation = await postApi('/api/diet/generate', {
    email: 'test_lowcal@healthify.com',
    planType: '7_DAY',
    goal: 'Weight Loss',
    targetCalories: 2100,
    confirmedFoods: ['Cucumber', 'Spinach (Raw)']
  });

  assert.strictEqual(resLimitation.status, 200);
  const lowCalPlan = resLimitation.data.dietPlan;
  assert.ok(lowCalPlan.limitationNote, 'Must have limitationNote');
  assert.ok(lowCalPlan.doctorTrainerNotes.includes('Limitation Note'), 'Must have Limitation Note in doctorTrainerNotes');
  console.log('\n--- LIMITATION NOTE TEST ---');
  console.log('limitationNote detected:', lowCalPlan.limitationNote);

  console.log('\nAll confirmed foods and limitation note checks PASSED! ✅');
  process.exit(0);
}

testConfirmedAndLimitation().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

