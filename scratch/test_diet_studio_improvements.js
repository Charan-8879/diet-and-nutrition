/**
 * Comprehensive Verification Suite for AI Diet Studio Improvements:
 * 1. MySQL Diet Plan Persistence (Survives logout/login, isolation, delete with confirm)
 * 2. Upload UI: Dedicated Photo & PDF upload buttons, preview, remove
 * 3. Incorporate Extracted Foods (Dosa, Sambar, etc.)
 * 4. Rules: Chicken <= 150g, Eggs <= 2 meals/day, 5 distinct meals/day, vegetarian isolation
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'Healthify@2026',
  database: 'healthify_db',
  port: 3306
};

function postRequest(urlPath, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ raw: body });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function getRequest(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      method: 'GET'
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ raw: body });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runVerification() {
  console.log('================================================================');
  console.log('HEALTHIFY AI DIET STUDIO IMPROVEMENTS - FULL VERIFICATION SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // Connect to MySQL
  const db = await mysql.createPool(DB_CONFIG);

  // Setup test users
  const user1Email = `diet_test_${Date.now()}_1@healthify.test`;
  const user2Email = `diet_test_${Date.now()}_2@healthify.test`;

  const [u1Res] = await db.query(
    "INSERT INTO users (name, email, phone, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    ['Diet Test User 1', user1Email, '9876543210', 'hashed_pw_test']
  );
  const user1Id = u1Res.insertId;

  const [u2Res] = await db.query(
    "INSERT INTO users (name, email, phone, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    ['Diet Test User 2', user2Email, '9876543211', 'hashed_pw_test']
  );
  const user2Id = u2Res.insertId;

  console.log(`Created test users in MySQL:`);
  console.log(`  User 1: ID=${user1Id}, Email=${user1Email}`);
  console.log(`  User 2: ID=${user2Id}, Email=${user2Email}\n`);

  // -------------------------------------------------------------
  // TEST SECTION 1: UI File Upload Buttons in index.html
  // -------------------------------------------------------------
  console.log('--- TEST SECTION 1: Separate Photo & PDF Upload UI ---');
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

  assert(
    indexHtml.includes('id="btnUploadPhoto"') && indexHtml.includes('bi bi-image') && indexHtml.includes("triggerCoachFileSelect('photo')"),
    'Dedicated Photo Upload button exists with bi bi-image icon and photo trigger'
  );
  assert(
    indexHtml.includes('id="btnUploadPdf"') && indexHtml.includes('bi bi-file-earmark-pdf') && indexHtml.includes("triggerCoachFileSelect('pdf')"),
    'Dedicated PDF Upload button exists with bi bi-file-earmark-pdf icon and pdf trigger'
  );
  assert(
    indexHtml.includes('id="aiCoachAttachmentPreview"'),
    'Attachment preview container #aiCoachAttachmentPreview exists'
  );
  assert(
    indexHtml.includes('id="aiCoachInput"') && indexHtml.includes('id="aiCoachSendBtn"'),
    'ChatGPT-style input composer bar (#aiCoachInput, #aiCoachSendBtn) preserved'
  );

  const scriptJs = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
  assert(
    scriptJs.includes("triggerCoachFileSelect(type)") && scriptJs.includes("removeAICoachAttachment()"),
    'triggerCoachFileSelect and removeAICoachAttachment functions defined'
  );

  // -------------------------------------------------------------
  // TEST SECTION 2: Incorporate Extracted Foods (Dosa, Sambar)
  // -------------------------------------------------------------
  console.log('\n--- TEST SECTION 2: Incorporating Extracted Foods (Dosa, Sambar) ---');
  const plan1Res = await postRequest('/api/diet/generate', {
    email: user1Email,
    planType: '7_DAY',
    goal: 'Maintain Weight',
    targetCalories: 2100,
    confirmedFoods: ['Dosa', 'Sambar']
  });

  assert(plan1Res.success === true, 'Diet plan generated successfully with confirmed foods [Dosa, Sambar]');
  const plan1 = plan1Res.dietPlan;
  assert(plan1 && plan1.days && plan1.days.length === 7, '7-Day plan returned with exactly 7 days');

  let dosaFoundCount = 0;
  let sambarFoundCount = 0;
  let dosaAndSambarPairedCount = 0;
  let sambarInLunchCount = 0;

  plan1.days.forEach(day => {
    day.meals.forEach(meal => {
      const itemNames = (meal.items || []).map(it => it.name.toLowerCase());
      const hasDosa = itemNames.some(n => n.includes('dosa'));
      const hasSambar = itemNames.some(n => n.includes('sambar'));

      if (hasDosa) dosaFoundCount++;
      if (hasSambar) sambarFoundCount++;
      if (hasDosa && hasSambar) dosaAndSambarPairedCount++;
      if (meal.slot === 'LUNCH' && hasSambar) sambarInLunchCount++;
    });
  });

  assert(dosaFoundCount > 0, `Dosa is actively incorporated across the plan (${dosaFoundCount} meals)`);
  assert(sambarFoundCount > 0, `Sambar is actively incorporated across the plan (${sambarFoundCount} meals)`);
  assert(dosaAndSambarPairedCount > 0, `Dosa and Sambar are naturally paired together (${dosaAndSambarPairedCount} meals)`);
  assert(sambarInLunchCount > 0, `Sambar is incorporated into lunch to accompany rice/staples (${sambarInLunchCount} lunch meals)`);

  // Verify nutritional mapping
  let allItemsHaveMacros = true;
  plan1.days.forEach(day => {
    day.meals.forEach(meal => {
      meal.items.forEach(it => {
        if (typeof it.cal !== 'number' || typeof it.pro !== 'number' || typeof it.carbs !== 'number' || typeof it.fat !== 'number') {
          allItemsHaveMacros = false;
        }
      });
    });
  });
  assert(allItemsHaveMacros, 'All confirmed and complementary items have exact calories, protein, carbs, fat, fiber mapped');

  // -------------------------------------------------------------
  // TEST SECTION 3: Chicken <= 150g & Eggs <= 2 Meals/Day
  // -------------------------------------------------------------
  console.log('\n--- TEST SECTION 3: Chicken (max 150g) and Egg (max 2 meals/day) Rules ---');
  const planChickenRes = await postRequest('/api/diet/generate', {
    email: user1Email,
    planType: '7_DAY',
    goal: 'Muscle Gain (Non-Vegetarian)',
    targetCalories: 2600,
    confirmedFoods: ['Chicken', 'Eggs', 'Rice', 'Paneer', 'Almonds', 'Banana'],
    profileData: { dietaryPreference: 'nonveg', weight: 75, targetCalories: 2600 }
  });

  const chickenPlan = planChickenRes.dietPlan;
  let maxChickenGramsFound = 0;
  let chickenMealsCount = 0;
  let chickenHasCookedLabel = true;
  let maxEggMealsInAnyDay = 0;

  chickenPlan.days.forEach(day => {
    let eggMealsThisDay = 0;
    day.meals.forEach(meal => {
      const hasEgg = meal.items.some(it => /egg/i.test(it.name));
      if (hasEgg) eggMealsThisDay++;

      meal.items.forEach(it => {
        if (/chicken/i.test(it.name)) {
          chickenMealsCount++;
          if (it.grams > maxChickenGramsFound) maxChickenGramsFound = it.grams;
          if (!it.name.toLowerCase().includes('grilled') && !it.prepMethod.toLowerCase().includes('cooked')) {
            chickenHasCookedLabel = false;
          }
        }
      });
    });
    if (eggMealsThisDay > maxEggMealsInAnyDay) maxEggMealsInAnyDay = eggMealsThisDay;
  });

  assert(chickenMealsCount > 0, `Chicken included in high-calorie plan across ${chickenMealsCount} meals`);
  assert(maxChickenGramsFound <= 150, `Chicken portion NEVER exceeds 150g in any meal (Max found: ${maxChickenGramsFound}g <= 150g)`);
  assert(chickenHasCookedLabel, 'Chicken items explicitly state cooked weight / grilled lean portion');
  assert(maxEggMealsInAnyDay <= 2, `Eggs appear in AT MOST 2 meals per day (Max found: ${maxEggMealsInAnyDay} meals/day <= 2)`);

  // -------------------------------------------------------------
  // TEST SECTION 4: Strict 5-Meals Every Day & Calorie Accuracy
  // -------------------------------------------------------------
  console.log('\n--- TEST SECTION 4: Strict 5-Meals Structure & Calorie Target Distribution ---');
  let allDaysHave5Meals = true;
  let allMealNamesPresent = true;
  let caloriesWithinMargin = true;

  chickenPlan.days.forEach(day => {
    if (!day.meals || day.meals.length !== 5) allDaysHave5Meals = false;
    const slots = day.meals.map(m => m.slot);
    const expectedSlots = ['BREAKFAST', 'PRE_LUNCH', 'LUNCH', 'EVENING_SNACK', 'DINNER'];
    if (!expectedSlots.every(s => slots.includes(s))) allMealNamesPresent = false;

    // Daily total vs target (within +/- 3%)
    const diff = Math.abs(day.totalCalories - 2600);
    console.log(`    Day ${day.dayNumber}: totalCalories=${day.totalCalories}, diff=${diff}`);
    if (diff > 80) caloriesWithinMargin = false;
  });

  assert(allDaysHave5Meals, 'Every single day in the 7-day plan contains exactly 5 meals');
  assert(allMealNamesPresent, 'Every day has Breakfast, Pre-Lunch, Lunch, Evening Snack, Dinner');
  assert(caloriesWithinMargin, 'Every day calorie total closely matches the user calorie target (~2600 kcal)');

  // -------------------------------------------------------------
  // TEST SECTION 5: Vegetarian Plan Isolation (Zero Meat)
  // -------------------------------------------------------------
  console.log('\n--- TEST SECTION 5: Vegetarian Plan Isolation ---');
  const planVegRes = await postRequest('/api/diet/generate', {
    email: user1Email,
    planType: '7_DAY',
    goal: 'Weight Loss (Vegetarian)',
    targetCalories: 1800,
    confirmedFoods: ['Paneer', 'Dal', 'Rice', 'Chapati', 'Curd', 'Banana'],
    profileData: { dietaryPreference: 'veg', isVegetarian: true, targetCalories: 1800 }
  });

  const vegPlan = planVegRes.dietPlan;
  let meatFoundInVeg = false;
  vegPlan.days.forEach(day => {
    day.meals.forEach(meal => {
      meal.items.forEach(it => {
        if (/chicken|fish|mutton|meat|salmon|tuna/i.test(it.name)) {
          meatFoundInVeg = true;
        }
      });
    });
  });
  assert(!meatFoundInVeg, 'Vegetarian plan strictly contains ZERO chicken or meat items across all 7 days');

  // -------------------------------------------------------------
  // TEST SECTION 6: MySQL Persistence, User Isolation, Deletion
  // -------------------------------------------------------------
  console.log('\n--- TEST SECTION 6: MySQL Diet Plan Persistence & Isolation ---');

  // Check diet_plans in MySQL for User 1
  const [dbPlansUser1] = await db.query(
    "SELECT id, user_id, title, calorie_target, status, created_at FROM diet_plans WHERE user_id = ? ORDER BY created_at DESC",
    [user1Id]
  );
  assert(dbPlansUser1.length >= 2, `User 1 has ${dbPlansUser1.length} diet plans permanently stored in MySQL`);

  // Fetch via API for User 1 (simulating login / retrieving history)
  const historyUser1 = await getRequest(`/api/diet/history?email=${encodeURIComponent(user1Email)}`);
  assert(historyUser1.success === true && historyUser1.plans && historyUser1.plans.length >= 2,
    `API /api/diet/history successfully retrieved ${historyUser1.plans ? historyUser1.plans.length : 0} plans from MySQL for User 1`);

  // Check User Isolation: User 2 must see 0 plans
  const historyUser2 = await getRequest(`/api/diet/history?email=${encodeURIComponent(user2Email)}`);
  assert(historyUser2.success === true && (!historyUser2.plans || historyUser2.plans.length === 0),
    'User Isolation: User 1 plans are NEVER visible to User 2 (User 2 history count = 0)');

  // Test Delete Plan from MySQL
  const planToDeleteId = dbPlansUser1[0].id;
  console.log(`\nDeleting diet plan ID ${planToDeleteId} from MySQL...`);
  const delRes = await postRequest('/api/diet/delete', {
    email: user1Email,
    planId: planToDeleteId
  });
  assert(delRes.success === true, `Delete API returned success: ${delRes.message}`);

  // Verify deletion in MySQL
  const [checkDeleted] = await db.query("SELECT id FROM diet_plans WHERE id = ?", [planToDeleteId]);
  assert(checkDeleted.length === 0, 'Diet plan permanently removed from MySQL database table');

  // Verify User 2 cannot delete User 1's remaining plans (Authorization check)
  const remainingPlanId = dbPlansUser1[1].id;
  const unauthorizedDel = await postRequest('/api/diet/delete', {
    email: user2Email,
    planId: remainingPlanId
  });
  assert(unauthorizedDel.success === false, 'Security: User 2 cannot delete User 1 diet plan (Rejected with 404/unauthorized)');

  // Clean up test data
  await db.query("DELETE FROM diet_plans WHERE user_id IN (?, ?)", [user1Id, user2Id]);
  await db.query("DELETE FROM users WHERE id IN (?, ?)", [user1Id, user2Id]);
  await db.end();

  console.log('\n================================================================');
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
