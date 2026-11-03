const mysql = require('mysql2/promise');

const BASE_URL = 'http://localhost:3000';
const TEST_EMAIL = `day2_test_${Date.now()}@healthify.com`;
const TEST_PASSWORD = 'Password@123';
const TEST_PHONE = '9' + Math.floor(100000000 + Math.random() * 900000000);
const TEST_NAME = 'Day2 Test Athlete';

async function runTests() {
  console.log('================================================================');
  console.log('🧪 HEALTHIFY DAY 2 PERSISTENCE & SEQUENTIAL LOCKING TEST SUITE');
  console.log('================================================================');
  console.log(`👤 Target Test User: ${TEST_EMAIL}\n`);

  const db = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Healthify@2026',
    database: 'healthify_db'
  });

  try {
    // -------------------------------------------------------------
    // Step 1: Register User
    // -------------------------------------------------------------
    console.log('Step 1: Registering new test athlete...');
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: TEST_NAME,
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        phone: TEST_PHONE
      })
    });
    const regData = await regRes.json();
    if (!regData.success) throw new Error('Registration failed: ' + JSON.stringify(regData));
    const userId = regData.user.id;
    console.log(`✅ Registered user ID: ${userId}`);

    // Create profile
    await fetch(`${BASE_URL}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        weight: 75,
        height: 178,
        age: 26,
        gender: 'male',
        activity: 1.55,
        targetCalories: 2200,
        tdee: 2200,
        bmr: 1750,
        selectedGoal: 'muscle_building'
      })
    });

    // -------------------------------------------------------------
    // Step 2: Generate 7-Day 5-Meal Diet Plan
    // -------------------------------------------------------------
    console.log('\nStep 2: Generating 7-day 5-meal diet plan in MySQL...');
    const genRes = await fetch(`${BASE_URL}/api/diet/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        planType: '7_DAY',
        goal: 'muscle_building',
        targetCalories: 2200,
        confirmedFoods: ['Oats', 'Eggs', 'Chicken Breast', 'Brown Rice', 'Greek Yogurt', 'Almonds', 'Banana']
      })
    });
    const genData = await genRes.json();
    if (!genData.success || !genData.dietPlan) throw new Error('Plan generation failed: ' + JSON.stringify(genData));
    const planId = genData.dietPlan.id;
    console.log(`✅ Generated Diet Plan ID: ${planId} with ${genData.dietPlan.days.length} days`);

    // -------------------------------------------------------------
    // Step 3: Complete Day 1 via Finish button (/api/challenge)
    // -------------------------------------------------------------
    console.log('\nStep 3: Completing Day 1 with Finish button...');
    const day1FoodLog = [
      { name: 'Oats with Milk', grams: 80, cal: 320, protein: 12, fibre: 4, type: 'food' },
      { name: 'Boiled Eggs (3)', grams: 150, cal: 210, protein: 18, fibre: 0, type: 'food' }
    ];
    const day1Record = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dailySteps: 10500,
      stepGoal: 10000,
      waterGlasses: 12,
      workoutMode: 'gym',
      routineTitle: 'Chest & Triceps Power',
      muscles: ['chest', 'triceps'],
      exercises: ['Bench Press', 'Incline Dumbbell Press', 'Triceps Pushdown'],
      foodLog: day1FoodLog
    };
    const cRes = await fetch(`${BASE_URL}/api/challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        totalDays: 25,
        history: {
          'Day 1': day1Record
        }
      })
    });
    const cData = await cRes.json();
    if (!cData.success) throw new Error('Challenge update failed: ' + JSON.stringify(cData));
    console.log('✅ Day 1 successfully completed and saved in challenge_progress');

    // -------------------------------------------------------------
    // Step 4: Verify Sequential Day Locking — Day 1 Locked
    // -------------------------------------------------------------
    console.log('\nStep 4: Verifying Day 1 is locked against modifications...');
    const d1ModRes = await fetch(`${BASE_URL}/api/diet/consume-meal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        planId: planId,
        dayNumber: 1,
        mealSlot: 'BREAKFAST',
        status: 'CONSUMED',
        actualCalories: 450,
        actualProtein: 25
      })
    });
    console.log(`Day 1 Modification response status: ${d1ModRes.status}`);
    if (d1ModRes.status === 403) {
      console.log('✅ SUCCESS: Backend correctly rejected Day 1 modification with 403 Forbidden (Day 1 is LOCKED)!');
    } else {
      throw new Error(`FAIL: Day 1 modification was not locked! Status: ${d1ModRes.status}`);
    }

    // -------------------------------------------------------------
    // Step 5: Start Day 2 — Log 4 Meals in AI Diet Studio
    // -------------------------------------------------------------
    console.log('\nStep 5: Logging 4 meals on Day 2 via AI Diet Studio /consume-meal...');
    const day2Meals = [
      { slot: 'BREAKFAST', name: 'Morning Protein Oats & Berries', cal: 480, pro: 32, carbs: 60, fat: 12, fib: 8 },
      { slot: 'PRE_LUNCH', name: 'Greek Yogurt & Almond Snack', cal: 250, pro: 20, carbs: 15, fat: 10, fib: 3 },
      { slot: 'LUNCH', name: 'Grilled Chicken Breast & Brown Rice', cal: 620, pro: 55, carbs: 65, fat: 14, fib: 6 },
      { slot: 'EVENING_SNACK', name: 'Boiled Egg Whites & Banana', cal: 260, pro: 18, carbs: 35, fat: 4, fib: 3 }
    ];

    let expectedDay2Cal = 0;
    let expectedDay2Pro = 0;

    for (const m of day2Meals) {
      expectedDay2Cal += m.cal;
      expectedDay2Pro += m.pro;
      const mRes = await fetch(`${BASE_URL}/api/diet/consume-meal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: TEST_EMAIL,
          planId: planId,
          dayNumber: 2,
          mealSlot: m.slot,
          mealType: m.slot,
          mealName: m.name,
          status: 'CONSUMED',
          actualCalories: m.cal,
          actualCal: m.cal,
          actualProtein: m.pro,
          actualCarbs: m.carbs,
          actualFat: m.fat,
          actualFibre: m.fib,
          items: [{ name: m.name, grams: 200, cal: m.cal, pro: m.pro, fibre: m.fib }]
        })
      });
      const mData = await mRes.json();
      if (!mData.success) throw new Error(`Failed to consume ${m.slot}: ` + JSON.stringify(mData));
      console.log(`  -> Consumed Day 2 ${m.slot}: ${m.cal} cal, ${m.pro}g protein`);
    }

    console.log(`\nDay 2 Consumed Totals: ${expectedDay2Cal} kcal, ${expectedDay2Pro}g Protein`);

    // Also persist daily data
    await fetch(`${BASE_URL}/api/daily-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        dailySteps: 7800,
        waterGlasses: 8,
        workoutMode: 'gym',
        foodLog: day2Meals.map(m => ({
          name: m.name,
          grams: 200,
          cal: m.cal,
          protein: m.pro,
          fibre: m.fib,
          type: 'diet_plan'
        }))
      })
    });

    // -------------------------------------------------------------
    // Step 6: Verify MySQL Persistence for Day 2 Consumptions & Plan JSON
    // -------------------------------------------------------------
    console.log('\nStep 6: Verifying MySQL diet_meal_consumptions and plan_json...');
    const [cRows] = await db.query(
      'SELECT meal_type, actual_cal, actual_protein, status FROM diet_meal_consumptions WHERE user_id = ? AND day_number = 2',
      [userId]
    );
    console.log(`MySQL diet_meal_consumptions found: ${cRows.length} entries for Day 2`);
    if (cRows.length !== 4) throw new Error(`Expected 4 consumptions in MySQL, found ${cRows.length}`);
    for (const r of cRows) {
      if (r.status !== 'CONSUMED') throw new Error(`Expected status CONSUMED, found ${r.status}`);
    }
    console.log('✅ All 4 Day 2 meals confirmed persisted in MySQL diet_meal_consumptions');

    const [pRows] = await db.query('SELECT plan_json FROM diet_plans WHERE id = ?', [planId]);
    const planDays = JSON.parse(pRows[0].plan_json);
    const day2Obj = planDays.find(d => d.dayNumber === 2);
    if (!day2Obj) throw new Error('Day 2 not found in plan_json');
    const consumedCountInPlanJson = day2Obj.meals.filter(m => m.status === 'CONSUMED').length;
    console.log(`Day 2 meals with status CONSUMED inside plan_json: ${consumedCountInPlanJson}/5`);
    if (consumedCountInPlanJson !== 4) throw new Error(`Expected 4 consumed in plan_json, found ${consumedCountInPlanJson}`);
    console.log('✅ Day 2 CONSUMED status permanently baked into MySQL diet_plans.plan_json');

    // -------------------------------------------------------------
    // Step 7: Simulate Logout & Fresh Login State
    // -------------------------------------------------------------
    console.log('\nStep 7: Simulating Logout & Login — Re-fetching persistent state...');

    // 1. Fetch /api/diet/active
    const actRes = await fetch(`${BASE_URL}/api/diet/active?email=${encodeURIComponent(TEST_EMAIL)}`);
    const actData = await actRes.json();
    if (!actData.success || !actData.dietPlan) throw new Error('Active diet plan fetch failed');

    const d1State = actData.dietPlan.days.find(d => d.dayNumber === 1);
    const d2State = actData.dietPlan.days.find(d => d.dayNumber === 2);
    const d3State = actData.dietPlan.days.find(d => d.dayNumber === 3);

    console.log(`Day 1 status: completed=${d1State.isCompleted}, locked=${d1State.isLocked}, active=${d1State.isActive}`);
    console.log(`Day 2 status: completed=${d2State.isCompleted}, locked=${d2State.isLocked}, active=${d2State.isActive}`);
    console.log(`Day 3 status: completed=${d3State.isCompleted}, locked=${d3State.isLocked}, active=${d3State.isActive}`);

    if (!d1State.isCompleted || !d1State.isLocked) throw new Error('Day 1 should be completed and locked');
    if (d2State.isCompleted || !d2State.isActive || d2State.isLocked) throw new Error('Day 2 should be active and unlocked');
    if (!d3State.isLocked) throw new Error('Day 3 should be locked');
    console.log('✅ Sequential Day Locking correctly reported by /api/diet/active');

    // Verify Day 2 meals remain green/CONSUMED
    const day2ConsumedAfterLogin = d2State.meals.filter(m => m.status === 'CONSUMED').length;
    console.log(`Day 2 meals with status CONSUMED after fresh login: ${day2ConsumedAfterLogin}/5`);
    if (day2ConsumedAfterLogin !== 4) throw new Error(`Day 2 meal statuses decreased! Found ${day2ConsumedAfterLogin}`);
    console.log('✅ SUCCESS: All 4 Day 2 meals remain green (CONSUMED) after login!');

    // 2. Fetch /api/daily-data
    const dailyRes = await fetch(`${BASE_URL}/api/daily-data?email=${encodeURIComponent(TEST_EMAIL)}`);
    const dailyData = await dailyRes.json();
    if (!dailyData.success || !dailyData.data) throw new Error('Daily data fetch failed');
    console.log(`Daily data foodLog item count after login: ${dailyData.data.foodLog.length}`);

    let loadedCal = 0;
    let loadedPro = 0;
    dailyData.data.foodLog.forEach(f => {
      loadedCal += (f.cal || 0);
      loadedPro += (f.protein || 0);
    });

    console.log(`Calculated Daily Calories after login: ${Math.round(loadedCal)} kcal (Expected: ${expectedDay2Cal} kcal)`);
    console.log(`Calculated Daily Protein after login: ${Math.round(loadedPro)}g (Expected: ${expectedDay2Pro}g)`);

    if (Math.round(loadedCal) !== expectedDay2Cal || Math.round(loadedPro) !== expectedDay2Pro) {
      throw new Error(`Calories/protein decreased or corrupted! Got ${loadedCal} kcal / ${loadedPro}g, expected ${expectedDay2Cal} / ${expectedDay2Pro}`);
    }
    console.log('✅ SUCCESS: Daily calories and protein did NOT decrease after login!');

    // -------------------------------------------------------------
    // Step 8: Complete Day 2 with Finish button & unlock Day 3
    // -------------------------------------------------------------
    console.log('\nStep 8: Completing Day 2 with Finish button...');
    const day2Record = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dailySteps: 8500,
      stepGoal: 10000,
      waterGlasses: 10,
      workoutMode: 'gym',
      routineTitle: 'Back & Biceps Hypertrophy',
      muscles: ['back', 'biceps'],
      exercises: ['Pullups', 'Barbell Row', 'Preacher Curl'],
      foodLog: day2Meals.map(m => ({ name: m.name, grams: 200, cal: m.cal, protein: m.pro, fibre: m.fib }))
    };

    const c2Res = await fetch(`${BASE_URL}/api/challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        totalDays: 25,
        history: {
          'Day 1': day1Record,
          'Day 2': day2Record
        }
      })
    });
    const c2Data = await c2Res.json();
    if (!c2Data.success) throw new Error('Challenge update for Day 2 failed');

    // Verify Day 2 is now locked and Day 3 is unlocked
    const actRes3 = await fetch(`${BASE_URL}/api/diet/active?email=${encodeURIComponent(TEST_EMAIL)}`);
    const actData3 = await actRes3.json();
    const d2AfterFinish = actData3.dietPlan.days.find(d => d.dayNumber === 2);
    const d3AfterFinish = actData3.dietPlan.days.find(d => d.dayNumber === 3);

    console.log(`Day 2 status after finish: completed=${d2AfterFinish.isCompleted}, locked=${d2AfterFinish.isLocked}`);
    console.log(`Day 3 status after finish: active=${d3AfterFinish.isActive}, locked=${d3AfterFinish.isLocked}`);

    if (!d2AfterFinish.isCompleted || !d2AfterFinish.isLocked) throw new Error('Day 2 should be locked after finish');
    if (!d3AfterFinish.isActive || d3AfterFinish.isLocked) throw new Error('Day 3 should now be unlocked and active');
    console.log('✅ SUCCESS: Day 2 completed & locked! Day 3 automatically advanced to ACTIVE ⭐');

    console.log('\n================================================================');
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! ZERO DEFECTS DETECTED!');
    console.log('================================================================');
  } finally {
    // Cleanup test user
    console.log('\nCleaning up test athlete records...');
    try {
      const [uRows] = await db.query('SELECT id FROM users WHERE LOWER(email) = ?', [TEST_EMAIL.toLowerCase()]);
      if (uRows.length > 0) {
        const uid = uRows[0].id;
        await db.query('DELETE FROM diet_meal_consumptions WHERE user_id = ?', [uid]);
        await db.query('DELETE FROM diet_plans WHERE user_id = ?', [uid]);
        await db.query('DELETE FROM challenge_progress WHERE user_id = ?', [uid]);
        await db.query('DELETE FROM food_logs WHERE user_id = ?', [uid]);
        await db.query('DELETE FROM daily_steps WHERE user_id = ?', [uid]);
        await db.query('DELETE FROM water_intake WHERE user_id = ?', [uid]);
        await db.query('DELETE FROM workout_logs WHERE user_id = ?', [uid]);
        await db.query('DELETE FROM user_profiles WHERE user_id = ?', [uid]);
        await db.query('DELETE FROM users WHERE id = ?', [uid]);
        console.log('✅ Cleanup completed.');
      }
    } catch (e) {
      console.warn('Cleanup note:', e.message);
    }
    await db.end();
  }
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});
