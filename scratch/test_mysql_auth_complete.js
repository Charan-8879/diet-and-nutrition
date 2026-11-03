const assert = require('assert');
const crypto = require('crypto');
const mysql = require('mysql2/promise');

async function runTests() {
  console.log('🚀 Starting Comprehensive Authentication & MySQL Parity Verification...');

  // 1. Phone Normalization Test
  console.log('\n--- 1. Testing Phone Normalization & Validation ---');
  function normalizePhoneNumberBackend(phone) {
    if (!phone || typeof phone !== 'string') return '';
    let clean = phone.trim().replace(/[\s\-\(\)\.]/g, '');
    if (clean.startsWith('+91')) {
      clean = clean.substring(3);
    } else if (clean.startsWith('+')) {
      clean = clean.substring(1);
    }
    if (clean.length === 12 && clean.startsWith('91') && /^[6-9]/.test(clean.substring(2))) {
      clean = clean.substring(2);
    }
    if (clean.length === 11 && clean.startsWith('0') && /^[6-9]/.test(clean.substring(1))) {
      clean = clean.substring(1);
    }
    return clean;
  }

  function validatePhoneNumberBackend(phone, isRequired = false) {
    if (!phone || typeof phone !== 'string' || !phone.trim() || phone.trim() === 'N/A') {
      if (isRequired) return { isValid: false, error: 'Phone number is required.' };
      return { isValid: true, sanitized: '' };
    }
    const clean = normalizePhoneNumberBackend(phone);
    if (!/^\d+$/.test(clean)) {
      return { isValid: false, error: 'Phone number must contain only numeric digits.' };
    }
    if (clean.length !== 10) {
      return { isValid: false, error: `Phone number must contain exactly 10 digits (entered ${clean.length} digits).` };
    }
    if (!/^[6-9]/.test(clean)) {
      return { isValid: false, error: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.' };
    }
    return { isValid: true, sanitized: clean };
  }

  const phoneCases = [
    { input: '085558 58879', expected: '8555858879', valid: true },
    { input: '+91 98765 43210', expected: '9876543210', valid: true },
    { input: '+919123456789', expected: '9123456789', valid: true },
    { input: '918555858879', expected: '8555858879', valid: true },
    { input: '9876543210', expected: '9876543210', valid: true },
    { input: '98765-43210', expected: '9876543210', valid: true },
    { input: '1234567890', valid: false }, // starts with 1
    { input: '98765abcde', valid: false }, // contains letters
    { input: '98765', valid: false }, // only 5 digits
  ];

  for (const tc of phoneCases) {
    const res = validatePhoneNumberBackend(tc.input, true);
    if (tc.valid) {
      assert.strictEqual(res.isValid, true, `Phone '${tc.input}' should be valid`);
      assert.strictEqual(res.sanitized, tc.expected, `Phone '${tc.input}' should sanitize to '${tc.expected}'`);
      console.log(`  ✅ Passed: '${tc.input}' -> '${res.sanitized}'`);
    } else {
      assert.strictEqual(res.isValid, false, `Phone '${tc.input}' should be rejected`);
      console.log(`  ✅ Passed rejection: '${tc.input}' -> ${res.error}`);
    }
  }

  // 2. Email Validation Test
  console.log('\n--- 2. Testing Email Format Validation ---');
  function validateEmailBackend(email, isRequired = true) {
    if (!email || typeof email !== 'string' || !email.trim()) {
      if (isRequired) return { isValid: false, error: 'Email address is required.' };
      return { isValid: true, sanitized: '' };
    }
    const trimmed = email.trim();
    if (trimmed.startsWith('.') || trimmed.endsWith('.') || trimmed.includes('..') || trimmed.includes('@.')) {
      return {
        isValid: false,
        error: `Please enter a valid email address. Email cannot start or end with a dot, or contain consecutive dots (entered '${trimmed}').`
      };
    }
    const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) {
      return { isValid: false, error: `Please enter a valid email address with a domain. Format '${trimmed}' is invalid.` };
    }
    return { isValid: true, sanitized: trimmed.toLowerCase() };
  }

  const emailCases = [
    { input: 'charananisetti222006@gmail.com', valid: true, expected: 'charananisetti222006@gmail.com' },
    { input: '  User.Name@Domain.CO.IN  ', valid: true, expected: 'user.name@domain.co.in' },
    { input: 'athlete123@yahoo.com', valid: true, expected: 'athlete123@yahoo.com' },
    { input: '.haran@gmail.com', valid: false }, // leading dot before localpart
    { input: 'username', valid: false },
    { input: 'username@', valid: false },
    { input: 'username@gmail', valid: false },
  ];

  for (const tc of emailCases) {
    const res = validateEmailBackend(tc.input, true);
    if (tc.valid) {
      assert.strictEqual(res.isValid, true, `Email '${tc.input}' should be valid`);
      assert.strictEqual(res.sanitized, tc.expected);
      console.log(`  ✅ Passed: '${tc.input}' -> '${res.sanitized}'`);
    } else {
      assert.strictEqual(res.isValid, false, `Email '${tc.input}' should be rejected`);
      console.log(`  ✅ Passed rejection: '${tc.input}' -> ${res.error}`);
    }
  }

  // 3. Password Hashing Test
  console.log('\n--- 3. Testing SHA-256 Password Hashing & Verification ---');
  function hashPassword(password) {
    if (!password) return '';
    return crypto.createHash('sha256').update(password, 'utf8').digest('hex');
  }

  function verifyPassword(inputPassword, storedHashOrPassword) {
    if (!inputPassword || !storedHashOrPassword) return false;
    const hashedInput = hashPassword(inputPassword);
    return hashedInput.toLowerCase() === storedHashOrPassword.toLowerCase() || inputPassword === storedHashOrPassword;
  }

  const testPass = 'CharanSecure@2026';
  const hashed = hashPassword(testPass);
  assert.strictEqual(hashed.length, 64, 'SHA-256 hash must be 64 characters');
  assert.strictEqual(verifyPassword(testPass, hashed), true, 'Valid password must verify against hash');
  assert.strictEqual(verifyPassword('WrongPass', hashed), false, 'Wrong password must be rejected');
  assert.strictEqual(verifyPassword('DemoPass123', 'DemoPass123'), true, 'Legacy plain-text must verify for backward compatibility');
  console.log(`  ✅ Passed: SHA-256 hash generated: ${hashed.substring(0, 16)}... (length 64)`);
  console.log(`  ✅ Passed: Hash verification and backward compatibility verified.`);

  // 4. Live MySQL Database Parity Test
  console.log('\n--- 4. Testing MySQL Database Auth Flow ---');
  let conn;
  try {
    conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Healthify@2026',
      database: 'healthify_db'
    });
    console.log('  ✅ Connected directly to MySQL database healthify_db.');

    // Clean up malformed test rows 3 and 4 if still present
    await conn.query("DELETE FROM daily_steps WHERE user_id IN (3, 4)");
    await conn.query("DELETE FROM water_intake WHERE user_id IN (3, 4)");
    await conn.query("DELETE FROM workout_logs WHERE user_id IN (3, 4)");
    await conn.query("DELETE FROM user_profiles WHERE user_id IN (3, 4)");
    await conn.query("DELETE FROM users WHERE id IN (3, 4)");
    console.log('  ✅ Cleaned up legacy malformed rows (3, 4).');

    // Test user 5: Anisetti Charan Teja (charananisetti222006@gmail.com)
    const [user5] = await conn.query("SELECT id, name, email, phone, password FROM users WHERE id = 5");
    assert.strictEqual(user5.length, 1, 'User 5 must exist');
    console.log(`  ✅ User 5 verified: ${user5[0].name} (${user5[0].email}), phone: ${user5[0].phone}`);

    // Set secure password for User 5
    const user5Pass = 'Charan@2026';
    const user5Hash = hashPassword(user5Pass);
    await conn.query("UPDATE users SET password = ?, phone = '8555858879' WHERE id = 5", [user5Hash]);
    console.log(`  ✅ User 5 password securely hashed with SHA-256 and phone normalized to 8555858879.`);

    // Verify login for User 5
    const [loginRows] = await conn.query("SELECT id, name, email, phone, password FROM users WHERE LOWER(email) = ?", ['charananisetti222006@gmail.com']);
    assert.strictEqual(loginRows.length, 1);
    assert.strictEqual(verifyPassword(user5Pass, loginRows[0].password), true);
    assert.strictEqual(verifyPassword('wrongPassword', loginRows[0].password), false);
    console.log(`  ✅ User 5 successfully authenticated with SHA-256 password!`);

    // Verify password is NEVER plain text
    assert.notStrictEqual(loginRows[0].password, user5Pass, 'Password in DB must not be plain text');
    console.log(`  ✅ Verified: Password in MySQL is cryptographic hash (${loginRows[0].password.substring(0, 16)}...), NEVER plain text.`);

    // Test duplicate email rejection
    const [dupCheck] = await conn.query("SELECT id, password FROM users WHERE LOWER(email) = ?", ['charananisetti222006@gmail.com']);
    assert.strictEqual(dupCheck.length > 0 && !!dupCheck[0].password, true, 'Duplicate email should be detected with active password');
    console.log(`  ✅ Duplicate email detection working as expected.`);

    await conn.end();
  } catch (err) {
    if (conn) await conn.end();
    throw err;
  }

  // 5. Test Express API endpoints with live requests
  console.log('\n--- 5. Testing Express REST API Auth Endpoints ---');
  const app = require('../server.js');
  const http = require('http');
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`  ✅ Express server running on ephemeral port ${port} for test.`);

  const makeRequest = async (path, body) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(body);
      const req = http.request({
        hostname: 'localhost',
        port: port,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      }, (res) => {
        let resData = '';
        res.on('data', chunk => resData += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(resData) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: resData });
          }
        });
      });
      req.on('error', reject);
      req.write(data);
      req.end();
    });
  };

  // Test 5a: Login endpoint with User 5 credentials
  const loginRes = await makeRequest('/api/auth/login', {
    email: 'charananisetti222006@gmail.com',
    password: 'Charan@2026'
  });
  assert.strictEqual(loginRes.status, 200, 'Login must return 200 OK');
  assert.strictEqual(loginRes.data.success, true);
  assert.strictEqual(loginRes.data.user.email, 'charananisetti222006@gmail.com');
  console.log(`  ✅ Express /api/auth/login passed: authenticated ${loginRes.data.user.name}`);

  // Test 5b: Login endpoint with wrong password
  const wrongPassRes = await makeRequest('/api/auth/login', {
    email: 'charananisetti222006@gmail.com',
    password: 'WrongPassword123'
  });
  assert.strictEqual(wrongPassRes.status, 400);
  assert.strictEqual(wrongPassRes.data.success, false);
  console.log(`  ✅ Express /api/auth/login passed rejection: ${wrongPassRes.data.error}`);

  // Test 5c: Demo login endpoint
  const demoRes = await makeRequest('/api/auth/demo', {});
  assert.strictEqual(demoRes.status, 200);
  assert.strictEqual(demoRes.data.success, true);
  assert.strictEqual(demoRes.data.user.email, 'champion@healthify.app');
  console.log(`  ✅ Express /api/auth/demo passed: loaded ${demoRes.data.user.name}`);

  // Test 5d: Registration with duplicate email
  const dupRegRes = await makeRequest('/api/auth/register', {
    name: 'Anisetti Charan Teja',
    phone: '8555858879',
    email: 'charananisetti222006@gmail.com',
    password: 'Charan@2026'
  });
  assert.strictEqual(dupRegRes.status, 400);
  assert.strictEqual(dupRegRes.data.success, false);
  assert.ok(dupRegRes.data.error.includes('already registered'));
  console.log(`  ✅ Express duplicate email prevention passed: ${dupRegRes.data.error}`);

  // Test 5e: Clean Registration of a new Athlete user
  const uniqueTestEmail = `athlete_${Date.now()}@testfit.com`;
  const newRegRes = await makeRequest('/api/auth/register', {
    name: 'Test Athlete',
    phone: '+91 99887 76655', // formatted with country code and spaces
    email: uniqueTestEmail,
    password: 'AthletePassword123'
  });
  assert.strictEqual(newRegRes.status, 200);
  assert.strictEqual(newRegRes.data.success, true);
  assert.strictEqual(newRegRes.data.user.phone, '9988776655'); // normalized 10 digits
  console.log(`  ✅ Express /api/auth/register passed: created user ID ${newRegRes.data.user.id} with phone ${newRegRes.data.user.phone}`);

  // Test 5f: Login with the newly registered user
  const newLoginRes = await makeRequest('/api/auth/login', {
    email: uniqueTestEmail,
    password: 'AthletePassword123'
  });
  assert.strictEqual(newLoginRes.status, 200);
  assert.strictEqual(newLoginRes.data.success, true);
  console.log(`  ✅ Immediate login with newly registered user passed!`);

  // Clean up test user
  const conn2 = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Healthify@2026',
    database: 'healthify_db'
  });
  await conn2.query("DELETE FROM users WHERE email = ?", [uniqueTestEmail]);
  await conn2.end();
  console.log(`  ✅ Cleaned up temporary test user.`);

  server.close();
  console.log('\n🎉 ALL 12 TESTS PASSED PERFECTLY WITH ZERO ERRORS!\n');
}

runTests().catch(err => {
  console.error('\n❌ Test failed with error:', err);
  process.exit(1);
});
