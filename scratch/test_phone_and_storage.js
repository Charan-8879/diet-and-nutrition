const http = require('http');
const mysql = require('mysql2/promise');

async function run() {
  console.log('=== STARTING PHONE CHECK & STORAGE VERIFICATION ===\n');

  // 1. Check MySQL connection
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Healthify@2026',
    database: 'healthify_db'
  });
  console.log('1. MySQL connection: OK');

  // Verify users table
  const [users] = await conn.query('SELECT id, name, email, phone FROM users ORDER BY id DESC LIMIT 5');
  console.log('Existing users in DB:');
  console.table(users);

  const registeredPhone = users.length > 0 ? users[0].phone : '8555858879';
  console.log(`Using registered phone: "${registeredPhone}" for conflict testing`);

  // Start Express server in-process for testing
  const app = require('../server.js');
  const server = app.listen(3001, () => {
    console.log('Test Express server listening on port 3001');
  });

  const request = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
      const opts = {
        hostname: 'localhost',
        port: 3001,
        path: path,
        method: method,
        headers: { 'Content-Type': 'application/json' }
      };
      const req = http.request(opts, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      });
      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  };

  try {
    // 2. Test GET /api/auth/check-phone for registered phone
    console.log('\n--- 2. Test GET /api/auth/check-phone (Existing Phone) ---');
    const res1 = await request('GET', `/api/auth/check-phone?phone=${encodeURIComponent(registeredPhone)}`);
    console.log('Result for registered phone:', res1);
    if (res1.status === 200 && res1.data.available === false && res1.data.message.includes('Phone number already registered')) {
      console.log('✅ TEST 1 PASSED: Correctly identified registered phone as unavailable');
    } else {
      console.error('❌ TEST 1 FAILED');
    }

    // 3. Test with +91 format: "+91 " + registeredPhone
    console.log('\n--- 3. Test Normalized Phone Format ("+91 " + registeredPhone) ---');
    const res2 = await request('GET', `/api/auth/check-phone?phone=${encodeURIComponent('+91 ' + registeredPhone)}`);
    console.log('Result for +91 phone:', res2);
    if (res2.status === 200 && res2.data.available === false) {
      console.log('✅ TEST 2 PASSED: Normalized +91 prefix correctly');
    } else {
      console.error('❌ TEST 2 FAILED');
    }

    // 4. Test GET /api/auth/check-phone for new/available phone
    const newPhone = '9012345678';
    console.log(`\n--- 4. Test GET /api/auth/check-phone (Available Phone: ${newPhone}) ---`);
    const res3 = await request('GET', `/api/auth/check-phone?phone=${newPhone}`);
    console.log('Result for available phone:', res3);
    if (res3.status === 200 && res3.data.available === true && res3.data.message.includes('available')) {
      console.log('✅ TEST 3 PASSED: Correctly identified new phone as available');
    } else {
      console.error('❌ TEST 3 FAILED');
    }

    // 5. Test POST /api/auth/check-phone
    console.log('\n--- 5. Test POST /api/auth/check-phone ---');
    const res4 = await request('POST', '/api/auth/check-phone', { phone: newPhone });
    console.log('POST result:', res4);
    if (res4.status === 200 && res4.data.available === true) {
      console.log('✅ TEST 4 PASSED: POST check-phone works');
    } else {
      console.error('❌ TEST 4 FAILED');
    }

    // 6. Test invalid formats (less than 10 digits, invalid prefix)
    console.log('\n--- 6. Test Invalid Phone Numbers ---');
    const resShort = await request('GET', '/api/auth/check-phone?phone=98765');
    console.log('Short phone result:', resShort);
    const resBadPrefix = await request('GET', '/api/auth/check-phone?phone=1234567890');
    console.log('Bad prefix result:', resBadPrefix);
    if (resShort.status === 400 && resBadPrefix.status === 400) {
      console.log('✅ TEST 5 PASSED: Rejects invalid formats with 400 error');
    } else {
      console.error('❌ TEST 5 FAILED');
    }

    // 7. Test Registration duplicate phone rejection
    console.log('\n--- 7. Test Duplicate Phone Registration Block ---');
    const resRegDuplicate = await request('POST', '/api/auth/register', {
      name: 'Duplicate Tester',
      email: `test_${Date.now()}@healthify.app`,
      phone: registeredPhone,
      password: 'SecurePassword123'
    });
    console.log('Duplicate phone reg result:', resRegDuplicate);
    if (resRegDuplicate.status === 400 && resRegDuplicate.data.error.includes('already registered')) {
      console.log('✅ TEST 6 PASSED: Registration strictly blocks duplicate phone number');
    } else {
      console.error('❌ TEST 6 FAILED');
    }

    // 8. Test MySQL Diet Plan Persistence
    console.log('\n--- 8. Test Diet Plan Persistence to MySQL ---');
    const testUserEmail = users[0].email;
    const resDietGen = await request('POST', '/api/diet/generate', {
      email: testUserEmail,
      planType: '7_DAY',
      goal: 'Maintain Weight',
      targetCalories: 2100,
      confirmedFoods: ['White Rice (Cooked)', 'Moong Dal (Cooked)', 'Chicken Breast (Grilled)', 'Apple', 'Almonds']
    });
    console.log('Diet plan generation response status:', resDietGen.status, 'success:', resDietGen.data.success);
    
    // Verify in MySQL diet_plans table
    const [dbPlans] = await conn.query('SELECT id, user_id, title, plan_type, calorie_target, status, created_at FROM diet_plans WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [users[0].id]);
    console.log('Persisted diet plan in MySQL:', dbPlans);
    if (dbPlans.length > 0 && dbPlans[0].status === 'ACTIVE' && dbPlans[0].calorie_target === 2100) {
      console.log('✅ TEST 7 PASSED: Diet plan was successfully persisted into MySQL diet_plans table!');
    } else {
      console.error('❌ TEST 7 FAILED');
    }

    // 9. Test GET /api/diet/active and /api/diet/history from MySQL
    console.log('\n--- 9. Test GET /api/diet/active & /api/diet/history ---');
    const resActive = await request('GET', `/api/diet/active?email=${encodeURIComponent(testUserEmail)}`);
    console.log('Active plan status:', resActive.status, 'title:', resActive.data.dietPlan ? resActive.data.dietPlan.title : null);
    const resHist = await request('GET', `/api/diet/history?email=${encodeURIComponent(testUserEmail)}`);
    console.log('History plans count:', resHist.data.plans ? resHist.data.plans.length : 0);
    if (resActive.data.dietPlan && resHist.data.plans && resHist.data.plans.length > 0) {
      console.log('✅ TEST 8 PASSED: Active plan and history retrieved directly from MySQL!');
    } else {
      console.error('❌ TEST 8 FAILED');
    }

    // 10. Test uploaded_documents table in MySQL
    console.log('\n--- 10. Test uploaded_documents Table in MySQL ---');
    const [docTableCols] = await conn.query('DESCRIBE uploaded_documents');
    console.log('uploaded_documents columns:', docTableCols.map(c => c.Field));
    if (docTableCols.length >= 6) {
      console.log('✅ TEST 9 PASSED: uploaded_documents table created and ready for S3/Cloudinary metadata!');
    } else {
      console.error('❌ TEST 9 FAILED');
    }

  } finally {
    server.close();
    await conn.end();
    console.log('\n=== ALL TESTS FINISHED ===');
  }
}

run().catch(err => {
  console.error('Test run error:', err);
  process.exit(1);
});

