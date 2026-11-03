const assert = require('assert');
const { EventEmitter } = require('events');
const app = require('c:/Users/chara/Downloads/healthify/server.js');

function mockRequest(method, url, body = null, query = {}) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.query = query;
  req.headers = {
    'content-type': 'application/json',
    'host': 'localhost'
  };
  req.body = body || {};
  return req;
}

function mockResponse(callback) {
  const res = new EventEmitter();
  let statusCode = 200;
  let headers = {};

  res.status = function(code) {
    statusCode = code;
    return res;
  };
  res.statusCode = 200;
  res.setHeader = function(key, val) {
    headers[key.toLowerCase()] = val;
    return res;
  };
  res.header = res.setHeader;
  res.json = function(jsonObj) {
    statusCode = res.statusCode || statusCode;
    callback({ status: statusCode, body: jsonObj });
  };
  res.send = function(data) {
    statusCode = res.statusCode || statusCode;
    try {
      callback({ status: statusCode, body: JSON.parse(data) });
    } catch(e) {
      callback({ status: statusCode, raw: data });
    }
  };
  return res;
}

function callRoute(method, url, body = null, query = {}) {
  return new Promise((resolve) => {
    const req = mockRequest(method, url, body, query);
    const res = mockResponse(resolve);
    app.handle(req, res);
  });
}

let totalTests = 0;
let passedTests = 0;

async function it(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  ✅ PASS: ${name}`);
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}\n     ${err.message}`);
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 HEALTHIFY COMBINED OCR + VLM FOOD EXTRACTION TEST SUITE');
  console.log('======================================================\n');

  // 1. User Test Case: Rice, Eggs, Banana, Chicken, Paneer from OCR / Image upload
  await it('1. Extracts exact test foods (Rice, Eggs, Banana, Chicken, Paneer) from handwritten/printed OCR text', async () => {
    const res = await callRoute('POST', '/api/ai/upload-document', {
      filename: 'photo_food_list.jpg',
      ocrText: 'Rice\nEggs\nBanana\nChicken\nPaneer',
      fileData: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
      mimeType: 'image/jpeg',
      prompt: 'Extract available foods from this image'
    });
    assert.strictEqual(res.status, 200, 'HTTP status should be 200');
    assert(res.body.success, 'Response should be successful');
    assert(Array.isArray(res.body.extraction.extractedFoods), 'extractedFoods should be array');
    const foods = res.body.extraction.extractedFoods;
    assert(foods.includes('Rice'), 'Should include Rice');
    assert(foods.includes('Eggs'), 'Should include Eggs');
    assert(foods.includes('Banana'), 'Should include Banana');
    assert(foods.includes('Chicken'), 'Should include Chicken');
    assert(foods.includes('Paneer'), 'Should include Paneer');
    assert.strictEqual(foods.length, 5, 'Should have exactly 5 foods');
  });

  // 2. Extracts ONLY clean food names (stripping portions, quantities, and units)
  await it('2. Extracts ONLY clean food names without quantities or weights in names', async () => {
    const res = await callRoute('POST', '/api/ai/upload-document', {
      filename: 'grocery_prescription.png',
      ocrText: '1. 150g Rice\n2. 2 Boiled Eggs\n3. 1 Fresh Banana\n4. Grilled Chicken Breast (200g)\n5. 100g Paneer',
      fileData: 'data:image/png;base64,iVBORw0KGgo...',
      mimeType: 'image/png',
      prompt: ''
    });
    assert.strictEqual(res.status, 200);
    const foods = res.body.extraction.extractedFoods;
    assert(foods.includes('Rice'), 'Should extract clean name Rice');
    assert(foods.includes('Eggs'), 'Should extract clean name Eggs');
    assert(foods.includes('Banana'), 'Should extract clean name Banana');
    assert(foods.includes('Chicken') || foods.includes('Chicken Breast'), 'Should extract clean name Chicken');
    assert(foods.includes('Paneer'), 'Should extract clean name Paneer');
    foods.forEach(f => {
      assert(!/\d/.test(f), `Food name '${f}' should not contain numbers`);
      assert(!/\b(?:g|gm|kg|oz|ml|cups?)\b/i.test(f), `Food name '${f}' should not contain unit labels`);
    });
  });

  // 3. Dynamic Food Names (Verifying NO HARDCODING: e.g. Idli, Dosa, Milk, Apple, Fish)
  await it('3. Extracts completely different dynamic foods (Idli, Dosa, Milk, Apple, Fish) without hardcoding', async () => {
    const res = await callRoute('POST', '/api/ai/upload-document', {
      filename: 'breakfast_chart.jpg',
      ocrText: 'Idli, Dosa, Milk, Apple, Fish',
      fileData: 'data:image/jpeg;base64,...',
      mimeType: 'image/jpeg',
      prompt: ''
    });
    assert.strictEqual(res.status, 200);
    const foods = res.body.extraction.extractedFoods;
    assert(foods.includes('Idli'), 'Should extract Idli');
    assert(foods.includes('Dosa'), 'Should extract Dosa');
    assert(foods.includes('Milk'), 'Should extract Milk');
    assert(foods.includes('Apple'), 'Should extract Apple');
    assert(foods.includes('Fish'), 'Should extract Fish');
    assert(!foods.includes('Chicken'), 'Should not contain Chicken');
    assert(!foods.includes('Paneer'), 'Should not contain Paneer');
  });

  // 4. Meal slot prefixed OCR list
  await it('4. Handles meal categories in OCR (Breakfast: Eggs, Banana; Lunch: Rice, Chicken; Dinner: Paneer)', async () => {
    const res = await callRoute('POST', '/api/ai/upload-document', {
      filename: 'meal_schedule.jpg',
      ocrText: 'Breakfast: Eggs, Banana\nLunch: Rice, Chicken\nDinner: Paneer',
      fileData: 'data:image/jpeg;base64,...',
      mimeType: 'image/jpeg'
    });
    assert.strictEqual(res.status, 200);
    const foods = res.body.extraction.extractedFoods;
    assert(foods.includes('Eggs'), 'Should extract Eggs');
    assert(foods.includes('Banana'), 'Should extract Banana');
    assert(foods.includes('Rice'), 'Should extract Rice');
    assert(foods.includes('Chicken'), 'Should extract Chicken');
    assert(foods.includes('Paneer'), 'Should extract Paneer');
    assert(!foods.includes('Breakfast'), 'Breakfast is a header, not a food');
    assert(!foods.includes('Lunch'), 'Lunch is a header, not a food');
    assert(!foods.includes('Dinner'), 'Dinner is a header, not a food');
  });

  // 5. Zero Default Food Fallback Leakage: Non-food image produces empty list + clear error message
  await it('5. Does NOT inject generic/default foods when image has no food items', async () => {
    const res = await callRoute('POST', '/api/ai/upload-document', {
      filename: 'hardware_store_receipt.jpg',
      ocrText: 'ABC Hardware Store\nOrder #12938\nTotal: $45.00\nThank you for shopping!',
      fileData: 'data:image/jpeg;base64,...',
      mimeType: 'image/jpeg',
      prompt: ''
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.extraction.extractedFoods.length, 0, 'Extracted foods must be empty');
    assert(res.body.extraction.unclearOrMissingInfo.length > 0, 'Should have descriptive notice for missing foods');
    assert(res.body.extraction.unclearOrMissingInfo[0].includes('No food items could be detected'), 'Should inform user to confirm or add foods');
    assert(!res.body.extraction.extractedFoods.includes('Oats'), 'Oats must not leak');
    assert(!res.body.extraction.extractedFoods.includes('Almonds'), 'Almonds must not leak');
  });

  // 6. Confirmed foods used in 7-day diet generation without generic replacement
  await it('6. Generates 7-day diet plan using ONLY confirmed foods (Rice, Eggs, Banana, Chicken, Paneer)', async () => {
    const res = await callRoute('POST', '/api/diet/generate', {
      targetCalories: 2100,
      planType: '7_DAY',
      userGoal: 'Muscle Gain',
      confirmedFoods: ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer'],
      existingConfirmedFoods: ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer'],
      preferences: 'non-veg'
    });
    assert.strictEqual(res.status, 200);
    assert(res.body.success, 'Generation should succeed');
    assert(res.body.dietPlan, 'Diet plan should be returned');
    assert.strictEqual(res.body.dietPlan.days.length, 7, 'Should generate 7 days');

    res.body.dietPlan.days.forEach(day => {
      assert.strictEqual(day.meals.length, 5, `Day ${day.day} must have 5 meals`);
    });

    const allPlanFoods = [];
    res.body.dietPlan.days.forEach(d => {
      d.meals.forEach(m => {
        m.items.forEach(it => allPlanFoods.push(it.name.toLowerCase()));
      });
    });

    assert(allPlanFoods.some(f => f.includes('egg')), 'Plan should feature Eggs');
    assert(allPlanFoods.some(f => f.includes('rice')), 'Plan should feature Rice');
    assert(allPlanFoods.some(f => f.includes('chicken')), 'Plan should feature Chicken');
    assert(allPlanFoods.some(f => f.includes('paneer')), 'Plan should feature Paneer');
    assert(allPlanFoods.some(f => f.includes('banana')), 'Plan should feature Banana');
  });

  // 7. Confirmed foods used in 25-day challenge plan
  await it('7. Generates 25-day challenge plan using confirmed foods', async () => {
    const res = await callRoute('POST', '/api/diet/generate', {
      targetCalories: 2100,
      planType: '25_DAY',
      userGoal: 'Weight Loss',
      confirmedFoods: ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer'],
      existingConfirmedFoods: ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer'],
      preferences: 'non-veg'
    });
    assert.strictEqual(res.status, 200);
    assert(res.body.success, 'Generation should succeed');
    assert.strictEqual(res.body.dietPlan.days.length, 25, 'Should generate 25 days');
    assert.strictEqual(res.body.dietPlan.days[0].meals.length, 5, 'Must have 5 meals per day');
  });

  // 8. Dynamic Recipe generation grounded in confirmed foods
  await it('8. Dynamic recipe generation with confirmed ingredients', async () => {
    const res = await callRoute('POST', '/api/ai/coach', {
      message: 'What dishes can I prepare with Rice, Chicken and Paneer?',
      confirmedAvailableFoods: ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer'],
      fullUserData: {
        profile: {
          targetCalories: 2100,
          selectedGoal: 'Muscle Gain'
        }
      }
    });
    assert.strictEqual(res.status, 200);
    assert(res.body.success, 'Coach call should succeed');
    assert(res.body.answer, 'Should return an answer');
    assert(res.body.recipe || res.body.answer.toLowerCase().includes('chicken') || res.body.answer.toLowerCase().includes('rice'), 'Recipe or advice grounded in ingredients');
  });

  console.log('\n======================================================');
  console.log(`📊 Test Summary: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('======================================================\n');

  if (passedTests < totalTests) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
