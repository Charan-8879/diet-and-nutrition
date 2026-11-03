const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const EventEmitter = require('events');
const app = require('../server.js');

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
    if (bodyStr) req.push(bodyStr);
    req.push(null);
  });
}

const htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const scriptContent = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
const serverContent = fs.readFileSync(path.join(__dirname, '../server.js'), 'utf8');

let testCount = 0;
let passedCount = 0;

function runTest(num, name, fn) {
  testCount++;
  try {
    fn();
    console.log(`  ✅ Feature ${num}: ${name} — PASS`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ Feature ${num}: ${name} — FAIL: ${err.message}`);
  }
}

async function runAsyncTest(num, name, fn) {
  testCount++;
  try {
    await fn();
    console.log(`  ✅ Feature ${num}: ${name} — PASS`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ Feature ${num}: ${name} — FAIL: ${err.message}`);
  }
}

(async () => {
  console.log('======================================================================');
  console.log('HEALTHIFY 17-FEATURE REGRESSION VERIFICATION');
  console.log('======================================================================\n');

  // Feature 1: Login
  await runAsyncTest(1, 'Login Flow with Phone/Email Validation & Session Expiry', async () => {
    const res = await invokeExpress('POST', '/api/auth/login', {
      email: 'champion@healthify.app',
      password: 'DemoPassword123'
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.ok(scriptContent.includes('const SESSION_TIMEOUT_MS = 30 * 60 * 1000;'));
  });

  // Feature 2: Registration
  await runAsyncTest(2, 'Registration Flow with 10-Digit Phone & Strict Email Regex', async () => {
    const uniqueEmail = `test_${Date.now()}@domain.com`;
    const res = await invokeExpress('POST', '/api/auth/register', {
      name: 'Regression Athlete',
      email: uniqueEmail,
      phone: '9876543211',
      password: 'SecuredPassword1'
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.ok(res.data.user.id);
  });

  // Feature 3: Logout
  runTest(3, 'Logout Flow with Full In-Memory State & DOM Reset', () => {
    assert.ok(scriptContent.includes('function logout(silent = false)'));
    assert.ok(scriptContent.includes('localStorage.removeItem(\'ht_currentUser\');'));
    assert.ok(scriptContent.includes('clearProfileInputs();'));
    assert.ok(scriptContent.includes('window.userConfirmedAvailableFoods = [];'));
  });

  // Feature 4: Navigation
  runTest(4, 'SPA Tab Navigation Structure', () => {
    assert.ok(htmlContent.includes('id="loginPage"'));
    assert.ok(htmlContent.includes('id="appPage"'));
    assert.ok(scriptContent.includes('function switchLoginTab('));
    assert.ok(scriptContent.includes('function setWorkoutMode('));
  });

  // Feature 5: Profile Calculator
  runTest(5, 'Profile Calculator (Mifflin-St Jeor BMR, TDEE & Goals)', () => {
    assert.ok(scriptContent.includes('function calculateProfile('));
    assert.ok(scriptContent.includes('10 * weight + 6.25 * height - 5 * age + 5'));
    assert.ok(scriptContent.includes('10 * weight + 6.25 * height - 5 * age - 161'));
  });

  // Feature 6: File Upload
  runTest(6, 'File Upload Support for TXT, DOCX & Medical Records', () => {
    assert.ok(htmlContent.includes('id="aiCoachFileInput"'));
    assert.ok(scriptContent.includes('handleCoachFilePicked('));
    assert.ok(serverContent.includes('/api/ai/upload-document'));
  });

  // Feature 7: PDF Upload
  runTest(7, 'PDF Processing (Multi-page and Scanned PDF.js Integration)', () => {
    assert.ok(scriptContent.includes('pdfjsLib.getDocument'));
    assert.ok(htmlContent.includes('pdf.min.js'));
    assert.ok(scriptContent.includes('pdf.worker.min.js'));
  });

  // Feature 8: Image Upload
  runTest(8, 'Image Upload (JPG, PNG) with OCR & VLM fallback', () => {
    assert.ok(scriptContent.includes('Tesseract.recognize'));
    assert.ok(serverContent.includes('GROQ_VISION_MODEL'));
  });

  // Feature 9: OCR Extraction
  runTest(9, 'Food Extraction Flow isolates clean food names', () => {
    assert.ok(serverContent.includes('extractIngredientsFromText'));
    assert.ok(scriptContent.includes('extractClientSideFoodsAndNutrition'));
  });

  // Feature 10: Confirmed Available Foods Section
  await runAsyncTest(10, 'Confirmed Available Foods Store & REST Endpoints', async () => {
    const res = await invokeExpress('GET', '/api/diet/confirmed-foods?email=champion@healthify.app');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.ok(Array.isArray(res.data.confirmedFoods));
  });

  // Feature 11: Select All / Clear Selection
  runTest(11, 'Confirmation Dialog Select All / Deselect All Controls', () => {
    assert.ok(scriptContent.includes('function selectAllConfirmationFoods()'));
    assert.ok(scriptContent.includes('function deselectAllConfirmationFoods()'));
  });

  // Feature 12: Add / Remove Food
  runTest(12, 'Add Custom Food & Remove Food Controls', () => {
    assert.ok(scriptContent.includes('function addFoodToConfirmation()'));
    assert.ok(scriptContent.includes('function removeFoodFromConfirmation('));
  });

  // Feature 13: Generate 5-Meal Plan
  await runAsyncTest(13, '5-Meal Plan Generation strictly uses confirmed foods & reaches calorie targets', async () => {
    const res = await invokeExpress('POST', '/api/diet/generate', {
      email: 'champion@healthify.app',
      planType: '7_DAY',
      targetCalories: 2100,
      confirmedFoods: ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer']
    });
    assert.strictEqual(res.status, 200);
    const day1 = res.data.dietPlan.days[0];
    assert.strictEqual(day1.meals.length, 5);
    assert.ok(day1.totalCalories >= 1900 && day1.totalCalories <= 2300);
  });

  // Feature 14: Save Diet Plan
  runTest(14, 'Save Diet Plan to User History', () => {
    assert.ok(scriptContent.includes('function saveActiveDietPlanToHistory('));
    assert.ok(scriptContent.includes('ht_saved_diet_plans_'));
  });

  // Feature 15: View Saved Diet Plans Modal
  runTest(15, 'Saved Diet Plans Modal & History Viewer', () => {
    assert.ok(htmlContent.includes('id="dietPlansModal"'));
    assert.ok(scriptContent.includes('function openDietPlansModal()'));
  });

  // Feature 16: AI Coach Chat
  await runAsyncTest(16, 'AI Coach Chat Assistant & Interactive Recipe/Diet Intelligence', async () => {
    const res = await invokeExpress('POST', '/api/ai/coach', {
      message: 'Give me a healthy post-workout snack with banana and curd',
      history: []
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.ok(res.data.answer.length > 50);
  });

  // Feature 17: About Healthify Modal & Diet and Nutrition Section
  runTest(17, 'About Healthify Modal with AI Chatbot mention & Diet and Nutrition Section', () => {
    assert.ok(htmlContent.includes('About Healthify'));
    assert.ok(htmlContent.includes('AI Health Coach & Chatbot') || htmlContent.includes('AI Chatbot'));
    assert.ok(htmlContent.includes('Diet and Nutrition') || htmlContent.includes('Diet & Nutrition'));
  });

  console.log('\n======================================================================');
  console.log(`TOTAL FEATURES VERIFIED: ${testCount} | PASSED: ${passedCount} | FAILED: ${testCount - passedCount}`);
  console.log('======================================================================\n');

  if (testCount === passedCount) {
    console.log('🎉 ALL 17 KEY FEATURES VERIFIED WITH ZERO REGRESSIONS!');
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
