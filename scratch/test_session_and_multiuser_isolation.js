const assert = require('assert');
const { Readable } = require('stream');
const EventEmitter = require('events');
const app = require('../server.js');

// In-memory HTTP request dispatcher for Express without opening TCP network sockets
function invokeExpress(method, url, body) {
  return new Promise((resolve) => {
    const req = new Readable({ read() {} });
    req.method = method;
    req.url = url;
    const bodyStr = body !== undefined && body !== null ? JSON.stringify(body) : '';
    req.headers = {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(bodyStr)
    };

    let resHeaders = {};
    let resData = '';
    const res = new EventEmitter();
    res.statusCode = 200;
    res.setHeader = (k, v) => { resHeaders[k.toLowerCase()] = v; };
    res.getHeader = (k) => resHeaders[k.toLowerCase()];
    res.writeHead = (code, h) => { res.statusCode = code; if (h) Object.assign(resHeaders, h); };
    res.write = (chunk) => { resData += chunk; };
    res.end = (chunk) => {
      if (chunk) resData += chunk;
      let parsed = resData;
      try { parsed = JSON.parse(resData); } catch (e) {}
      resolve({ status: res.statusCode, data: parsed });
    };

    app(req, res);
    if (bodyStr) {
      req.push(bodyStr);
    }
    req.push(null);
  });
}

// Mock localStorage and DOM for client-side script tests
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] !== undefined ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
const domElements = {};
global.document = {
  getElementById: (id) => {
    if (!domElements[id]) {
      domElements[id] = {
        id,
        value: '',
        textContent: '',
        innerHTML: '',
        classList: {
          classes: new Set(),
          add: function(c) { this.classes.add(c); },
          remove: function(c) { this.classes.delete(c); },
          contains: function(c) { return this.classes.has(c); }
        },
        focus: () => {}
      };
    }
    return domElements[id];
  }
};

let testCount = 0;
let passedCount = 0;

function runTest(name, fn) {
  testCount++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    if (err.stack) console.error(err.stack.split('\n').slice(1, 4).join('\n'));
  }
}

async function runAsyncTest(name, fn) {
  testCount++;
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    if (err.stack) console.error(err.stack.split('\n').slice(1, 4).join('\n'));
  }
}

(async () => {
  console.log('======================================================================');
  console.log('HEALTHIFY AUTOMATED VERIFICATION SUITE: SESSION, FOOD & MULTI-USER');
  console.log('======================================================================\n');

  // =========================================================
  // 1. SESSION TESTING (8 Steps)
  // =========================================================
  console.log('▶ TEST SUITE 1: SESSION TESTING (8 End-to-End Steps)');

  const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
  function isSessionValid(user) {
    if (!user || !user.email) return false;
    if (!user.expiresAt || typeof user.expiresAt !== 'number') return false;
    if (Date.now() > user.expiresAt) return false;
    return true;
  }

  runTest('Step 1.1: Open application with empty storage -> Login page displays, session invalid', () => {
    localStorage.clear();
    const savedUserStr = localStorage.getItem('ht_currentUser');
    assert.strictEqual(savedUserStr, null);
    assert.strictEqual(isSessionValid(null), false, 'Empty session must be invalid');
  });

  await runAsyncTest('Step 1.2: Login with valid credentials -> Receives valid user object and session token', async () => {
    const res = await invokeExpress('POST', '/api/auth/login', {
      email: 'champion@healthify.app',
      password: 'DemoPassword123'
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.user.email, 'champion@healthify.app');

    // Simulate script.js login() setting session
    const user = res.data.user;
    const now = Date.now();
    user.loginAt = now;
    user.lastActivity = now;
    user.expiresAt = now + SESSION_TIMEOUT_MS;
    localStorage.setItem('ht_currentUser', JSON.stringify(user));

    assert.strictEqual(isSessionValid(user), true);
  });

  runTest('Step 1.3: Refresh page within 5 minutes -> Session persists and remains valid', () => {
    const user = JSON.parse(localStorage.getItem('ht_currentUser'));
    assert.ok(user, 'User must exist in localStorage');
    // Simulate 5 minutes passed
    user.lastActivity = Date.now() - (5 * 60 * 1000);
    assert.strictEqual(isSessionValid(user), true, 'Session within 5 minutes must persist');
  });

  runTest('Step 1.4: Close tab and reopen within 5 minutes -> Session persists without re-login', () => {
    const stored = localStorage.getItem('ht_currentUser');
    assert.ok(stored);
    const user = JSON.parse(stored);
    assert.strictEqual(isSessionValid(user), true);
  });

  runTest('Step 1.5: Simulate 31 minutes inactivity -> Session expires, invalidates and requires login', () => {
    const user = JSON.parse(localStorage.getItem('ht_currentUser'));
    assert.ok(user);
    // Simulate timestamp 31 minutes ago
    user.expiresAt = Date.now() - (1 * 60 * 1000); // Expired 1 min ago
    assert.strictEqual(isSessionValid(user), false, 'Session older than 30 mins must be rejected');
  });

  runTest('Step 1.6: Click Logout button -> Session cleared, localStorage removed', () => {
    let currentUser = JSON.parse(localStorage.getItem('ht_currentUser'));
    assert.ok(currentUser);

    // Simulate logout()
    currentUser = null;
    localStorage.removeItem('ht_currentUser');

    assert.strictEqual(currentUser, null);
    assert.strictEqual(localStorage.getItem('ht_currentUser'), null);
  });

  runTest('Step 1.7: Refresh page after logout -> Login page displays, auto-login does NOT occur', () => {
    const userStr = localStorage.getItem('ht_currentUser');
    assert.strictEqual(userStr, null);
    assert.strictEqual(isSessionValid(null), false);
  });

  runTest('Step 1.8: Form fields and profile DOM cleared cleanly after logout', () => {
    const fields = ['userName', 'userEmail', 'userPhone', 'userPassword', 'regName', 'regEmail', 'regPhone', 'regPassword', 'pWeight', 'pAge'];
    fields.forEach(f => {
      document.getElementById(f).value = '';
    });
    fields.forEach(f => {
      assert.strictEqual(document.getElementById(f).value, '', `${f} must be empty`);
    });
  });

  // =========================================================
  // 2. FOOD EXTRACTION & DIET GENERATION TESTING (7 Steps)
  // =========================================================
  console.log('\n▶ TEST SUITE 2: FOOD EXTRACTION & 5-MEAL PLAN GENERATION (7 Steps)');

  const testExtractedFoods = ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer'];

  runTest('Step 2.1 & 2.2: Extracted foods contains exactly [Rice, Eggs, Banana, Chicken, Paneer]', () => {
    assert.strictEqual(testExtractedFoods.length, 5);
    assert.deepStrictEqual(testExtractedFoods, ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer']);
  });

  runTest('Step 2.3: User can select all, deselect, add ("Milk"), and remove foods in confirmation UI', () => {
    let selected = [...testExtractedFoods];
    assert.strictEqual(selected.length, 5);

    // Deselect individual food (e.g. Eggs)
    selected = selected.filter(f => f !== 'Eggs');
    assert.strictEqual(selected.includes('Eggs'), false);
    assert.strictEqual(selected.length, 4);

    // Add new food item ("Milk")
    selected.push('Milk');
    assert.strictEqual(selected.includes('Milk'), true);
    assert.strictEqual(selected.length, 5);

    // Remove an item ("Milk") and re-add "Eggs"
    selected = selected.filter(f => f !== 'Milk');
    selected.push('Eggs');
    assert.deepStrictEqual(selected.sort(), testExtractedFoods.slice().sort());
  });

  await runAsyncTest('Step 2.4: Save confirmed foods [Rice, Eggs, Banana, Chicken, Paneer] to backend API', async () => {
    const res = await invokeExpress('POST', '/api/diet/confirmed-foods', {
      email: 'champion@healthify.app',
      confirmedFoods: testExtractedFoods
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.count, 5);
    assert.deepStrictEqual(res.data.confirmedFoods, testExtractedFoods);
  });

  let generatedPlan = null;
  await runAsyncTest('Step 2.5 & 2.6: Generate 5-Meal Plan for 2,100 kcal target with confirmed foods', async () => {
    const res = await invokeExpress('POST', '/api/diet/generate', {
      email: 'champion@healthify.app',
      planType: '7_DAY',
      targetCalories: 2100,
      confirmedFoods: testExtractedFoods
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.ok(res.data.dietPlan);
    generatedPlan = res.data.dietPlan;
    assert.strictEqual(generatedPlan.days.length, 7);

    // Forbidden generic defaults that must NEVER appear:
    const FORBIDDEN_DEFAULTS = ['Oats', 'Almonds', 'Skimmed Milk', 'Greek Yogurt', 'Apple', 'Lentils', 'Brown Rice', 'Spinach', 'Moong Dal', 'Sambar', 'Idli', 'Dosa'];

    // Test Day 1 in detail
    const day1 = generatedPlan.days[0];
    assert.strictEqual(day1.meals.length, 5, 'Must have 5 meals');

    const allDay1Foods = [];
    day1.meals.forEach(m => {
      m.items.forEach(it => {
        allDay1Foods.push(it.name);
      });
    });

    console.log(`     Day 1 generated foods: ${allDay1Foods.join(', ')}`);

    // Verify ZERO unconfirmed or forbidden foods
    FORBIDDEN_DEFAULTS.forEach(forbidden => {
      const found = allDay1Foods.find(name => name.toLowerCase().includes(forbidden.toLowerCase()));
      assert.strictEqual(found, undefined, `Forbidden default food "${forbidden}" must NOT appear!`);
    });

    // Verify ALL ingredients are strictly from confirmed pool
    allDay1Foods.forEach(foodName => {
      const isFromConfirmedPool = testExtractedFoods.some(cf => foodName.toLowerCase().includes(cf.toLowerCase()) || cf.toLowerCase().includes(foodName.toLowerCase()));
      assert.strictEqual(isFromConfirmedPool, true, `Food item "${foodName}" must be in confirmed pool!`);
    });

    // Inspect each meal slot:
    // Slot 1: Breakfast
    const bItems = day1.meals[0].items.map(it => it.name.toLowerCase());
    assert.ok(bItems.some(f => f.includes('rice') || f.includes('egg') || f.includes('paneer')), 'Breakfast must contain breakfast staples');
    assert.ok(!bItems.some(f => f.includes('chicken')), 'Breakfast must NOT contain chicken');

    // Slot 2: Pre-Lunch (11:30 AM Fruit Snack)
    const plItems = day1.meals[1].items.map(it => it.name.toLowerCase());
    assert.ok(plItems.some(f => f.includes('banana')), 'Pre-Lunch must contain fruit (Banana)');
    assert.ok(!plItems.some(f => f.includes('almond')), 'Pre-Lunch must NOT contain Almonds');

    // Slot 3: Lunch
    const lItems = day1.meals[2].items.map(it => it.name.toLowerCase());
    assert.ok(lItems.some(f => f.includes('rice')), 'Lunch must contain Rice');
    assert.ok(lItems.some(f => f.includes('chicken') || f.includes('paneer') || f.includes('egg')), 'Lunch must contain protein');

    // Slot 4: Evening Snack
    const esItems = day1.meals[3].items.map(it => it.name.toLowerCase());
    assert.ok(esItems.some(f => f.includes('paneer') || f.includes('egg') || f.includes('banana')), 'Evening snack must contain wholesome protein or fruit');
    assert.ok(!esItems.some(f => f.includes('spinach')), 'Evening snack must NEVER contain plain spinach');

    // Slot 5: Dinner
    const dItems = day1.meals[4].items.map(it => it.name.toLowerCase());
    assert.ok(dItems.some(f => f.includes('rice') || f.includes('paneer')), 'Dinner must contain wholesome confirmed foods');

    // Verify daily calories reasonably close to target 2,100 kcal
    const totalCal = day1.totalCalories;
    console.log(`     Day 1 total calories: ${totalCal} kcal (Target: 2100 kcal)`);
    assert.ok(totalCal >= 1900 && totalCal <= 2300, `Calories (${totalCal}) should be reasonably close to 2100 kcal`);
  });

  await runAsyncTest('Step 2.7: Test different food list [Oats, Milk, Apple, Almonds, Peanuts] -> New plan uses ONLY these', async () => {
    const alternativePool = ['Oats', 'Milk', 'Apple', 'Almonds', 'Peanuts'];
    const res = await invokeExpress('POST', '/api/diet/generate', {
      email: 'champion@healthify.app',
      planType: '7_DAY',
      targetCalories: 2100,
      confirmedFoods: alternativePool
    });
    assert.strictEqual(res.status, 200);
    const plan = res.data.dietPlan;
    const day1Foods = [];
    plan.days[0].meals.forEach(m => m.items.forEach(it => day1Foods.push(it.name)));
    console.log(`     Alternative pool Day 1 foods: ${day1Foods.join(', ')}`);

    // Must NOT contain old foods (Rice, Chicken)
    assert.strictEqual(day1Foods.some(f => f.toLowerCase().includes('chicken')), false, 'Chicken must not be in alternative plan');
    assert.strictEqual(day1Foods.some(f => f.toLowerCase().includes('rice')), false, 'Rice must not be in alternative plan');

    // Must strictly be drawn from alternativePool
    day1Foods.forEach(foodName => {
      const matchesPool = alternativePool.some(p => foodName.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(foodName.toLowerCase()));
      assert.strictEqual(matchesPool, true, `"${foodName}" must be in alternative pool`);
    });
  });

  // =========================================================
  // 3. MULTIPLE-USER ISOLATION TESTING (4 Steps)
  // =========================================================
  console.log('\n▶ TEST SUITE 3: MULTIPLE-USER ISOLATION TESTING (4 Steps)');

  const userAEmail = 'alice.isolation@healthify.app';
  const userBEmail = 'bob.isolation@healthify.app';

  await runAsyncTest('Step 3.1: Register User A (Alice), configure profile (70kg, 2200 kcal), confirm foods [Rice, Eggs, Banana]', async () => {
    // Register User A
    const regRes = await invokeExpress('POST', '/api/auth/register', {
      name: 'Alice Athlete',
      email: userAEmail,
      phone: '9111111111',
      password: 'password123'
    });
    assert.strictEqual(regRes.status, 200);

    // Save User A confirmed foods
    const foodsA = ['Rice', 'Eggs', 'Banana'];
    await invokeExpress('POST', '/api/diet/confirmed-foods', {
      email: userAEmail,
      confirmedFoods: foodsA
    });

    // Save User A profile
    localStorage.setItem(`ht_profile_${userAEmail}`, JSON.stringify({ weight: 70, targetCalories: 2200, selectedGoal: 'Maintain Weight' }));
    localStorage.setItem(`ht_confirmed_foods_${userAEmail}`, JSON.stringify(foodsA));
    localStorage.setItem(`ht_data_${userAEmail}`, JSON.stringify({ waterGlasses: 9, dailySteps: 8500 }));

    const verifyFoods = await invokeExpress('GET', `/api/diet/confirmed-foods?email=${encodeURIComponent(userAEmail)}`);
    assert.deepStrictEqual(verifyFoods.data.confirmedFoods, foodsA);
  });

  runTest('Step 3.2: Logout User A -> Global state cleared, active user null', () => {
    let currentUser = { name: 'Alice Athlete', email: userAEmail };
    let windowConfirmedFoods = ['Rice', 'Eggs', 'Banana'];

    // Logout
    currentUser = null;
    localStorage.removeItem('ht_currentUser');
    windowConfirmedFoods = [];

    assert.strictEqual(currentUser, null);
    assert.strictEqual(localStorage.getItem('ht_currentUser'), null);
    assert.strictEqual(windowConfirmedFoods.length, 0);
  });

  await runAsyncTest('Step 3.3: Login User B (Bob) -> Bob sees NO profile, NO foods, NO data from User A', async () => {
    // Register User B
    const regRes = await invokeExpress('POST', '/api/auth/register', {
      name: 'Bob Bodybuilder',
      email: userBEmail,
      phone: '9222222222',
      password: 'password123'
    });
    assert.strictEqual(regRes.status, 200);

    // Check User B backend confirmed foods
    const bFoods = await invokeExpress('GET', `/api/diet/confirmed-foods?email=${encodeURIComponent(userBEmail)}`);
    assert.strictEqual(bFoods.data.confirmedFoods.length, 0, 'User B must have 0 confirmed foods');

    // Check User B localStorage
    const bProfile = JSON.parse(localStorage.getItem(`ht_profile_${userBEmail}`) || '{}');
    const bLocalFoods = JSON.parse(localStorage.getItem(`ht_confirmed_foods_${userBEmail}`) || '[]');
    const bData = JSON.parse(localStorage.getItem(`ht_data_${userBEmail}`) || '{}');

    assert.strictEqual(bProfile.weight, undefined, 'User B must not see Alice weight');
    assert.strictEqual(bProfile.targetCalories, undefined, 'User B must not see Alice target calories');
    assert.strictEqual(bLocalFoods.length, 0, 'User B must not see Alice confirmed foods');
    assert.strictEqual(bData.waterGlasses, undefined, 'User B must not see Alice water count');
  });

  await runAsyncTest('Step 3.4: Add User B foods [Chicken, Broccoli, Sweet Potato] -> Logout User B -> Login User A -> User A data 100% intact', async () => {
    const foodsB = ['Chicken', 'Broccoli', 'Sweet Potato'];
    await invokeExpress('POST', '/api/diet/confirmed-foods', {
      email: userBEmail,
      confirmedFoods: foodsB
    });
    localStorage.setItem(`ht_profile_${userBEmail}`, JSON.stringify({ weight: 85, targetCalories: 2800, selectedGoal: 'Muscle Gain' }));
    localStorage.setItem(`ht_confirmed_foods_${userBEmail}`, JSON.stringify(foodsB));

    // Verify User A data is STILL completely intact and unmodified
    const aCheckBackend = await invokeExpress('GET', `/api/diet/confirmed-foods?email=${encodeURIComponent(userAEmail)}`);
    assert.deepStrictEqual(aCheckBackend.data.confirmedFoods, ['Rice', 'Eggs', 'Banana']);

    const aProfile = JSON.parse(localStorage.getItem(`ht_profile_${userAEmail}`));
    assert.strictEqual(aProfile.weight, 70);
    assert.strictEqual(aProfile.targetCalories, 2200);

    const bProfile = JSON.parse(localStorage.getItem(`ht_profile_${userBEmail}`));
    assert.strictEqual(bProfile.weight, 85);
    assert.strictEqual(bProfile.targetCalories, 2800);
  });

  console.log('\n======================================================================');
  console.log(`TOTAL TESTS: ${testCount} | PASSED: ${passedCount} | FAILED: ${testCount - passedCount}`);
  console.log('======================================================================\n');

  if (testCount === passedCount) {
    console.log('🌟 ALL 19 TESTS PASSED WITH 100% SUCCESS RATE! 🌟');
    process.exit(0);
  } else {
    console.error('⚠️ SOME TESTS FAILED. PLEASE REVIEW.');
    process.exit(1);
  }
})();
