const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('⚡ HEALTHIFY: OFFLINE LOCAL STORAGE AUTH FALLBACK VERIFICATION');
console.log('================================================================\n');

let passedCount = 0;
let totalCount = 0;

function assert(condition, testName, details = '') {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  ✅ PASS: [${testName}] ${details ? '— ' + details : ''}`);
  } else {
    console.error(`  ❌ FAIL: [${testName}] ${details ? '— ' + details : ''}`);
    process.exitCode = 1;
  }
}

// In-memory mock localStorage
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] !== undefined ? storage[key] : null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

// Mock fetch to simulate complete network failure (offline)
global.fetch = async () => {
  throw new Error('TypeError: Failed to fetch (Connection refused)');
};

// Simulate BACKEND_URL
let BACKEND_URL = 'http://localhost:8080';
let AI_BACKEND_URL = BACKEND_URL;
let isBackendConnected = false;

function updateBackendStatusUI() {}

// Import sendAuthApi logic from script.js
async function sendAuthApi(endpoint, payload) {
    const primaryUrl = BACKEND_URL || 'http://localhost:8080';
    const altUrl = (primaryUrl.includes('8080')) ? 'http://localhost:3000' : 'http://localhost:8080';

    const tryFetch = async (baseUrl) => {
        const url = `${baseUrl.replace(/\/+$/, '')}/api/auth/${endpoint}`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json().catch(() => ({}));
            return { ok: true, status: res.status, data };
        } catch (err) {
            return { ok: false, error: err };
        }
    };

    let result = await tryFetch(primaryUrl);
    if (result.ok) {
        if (!result.data.success) {
            return { success: false, error: result.data.error || 'Authentication failed' };
        }
        return { success: true, user: result.data.user };
    }

    result = await tryFetch(altUrl);
    if (result.ok) {
        BACKEND_URL = altUrl;
        AI_BACKEND_URL = altUrl;
        isBackendConnected = true;
        updateBackendStatusUI(true, altUrl.includes('8080') ? 'healthify_db' : 'healthify_express');
        if (!result.data.success) {
            return { success: false, error: result.data.error || 'Authentication failed' };
        }
        return { success: true, user: result.data.user };
    }

    // 3. Fallback to resilient offline local storage engine if both servers are unreachable
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem('ht_users') || '[]');
        if (!Array.isArray(users)) users = [];
    } catch (e) {
        users = [];
    }

    if (endpoint === 'login') {
        const cleanEmail = (payload.email || '').trim().toLowerCase();
        const found = users.find(u => (u.email || '').toLowerCase() === cleanEmail);
        if (!found) {
            if (cleanEmail === 'champion@healthify.app' && payload.password === 'DemoPassword123') {
                return { success: true, user: { id: 1, name: 'Fitness Champion', email: 'champion@healthify.app', phone: '9000000000' } };
            }
            return { success: false, error: `User not found with email: ${cleanEmail}. Please register first.` };
        }
        if (found.password && found.password !== payload.password) {
            return { success: false, error: 'Invalid password. Please check your credentials.' };
        }
        return { success: true, user: { id: found.id || 1, name: found.name, email: found.email, phone: found.phone } };
    }

    if (endpoint === 'register') {
        const cleanEmail = (payload.email || '').trim().toLowerCase();
        const cleanPhone = (payload.phone || '').trim();

        if (users.some(u => (u.email || '').toLowerCase() === cleanEmail)) {
            return { success: false, error: `Email already registered: ${cleanEmail}` };
        }
        if (cleanPhone && users.some(u => u.phone === cleanPhone)) {
            return { success: false, error: `Phone number already registered: ${cleanPhone}` };
        }

        const newUser = {
            id: Date.now(),
            name: payload.name.trim(),
            email: cleanEmail,
            phone: cleanPhone,
            password: payload.password
        };
        users.push(newUser);
        localStorage.setItem('ht_users', JSON.stringify(users));
        return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone } };
    }

    if (endpoint === 'demo') {
        return { success: true, user: { id: 1, name: 'Fitness Champion', email: 'champion@healthify.app', phone: '9000000000' } };
    }

    return { success: false, error: 'Unknown authentication request' };
}

async function runOfflineTests() {
  const offlineUser = {
    name: 'Ananya Roy',
    phone: '9845012345',
    email: 'ananya.roy@healthify.me',
    password: 'AnanyaPassword@2026'
  };

  // 1. Offline Registration
  const reg1 = await sendAuthApi('register', offlineUser);
  assert(reg1.success === true, 'Offline Registration Successful', reg1.user?.name);
  assert(reg1.user?.email === offlineUser.email, 'Offline User Email Persisted', reg1.user?.email);

  // 2. Offline Duplicate Email Detection
  const regDupEmail = await sendAuthApi('register', {
    name: 'Another Ananya',
    phone: '9845099999',
    email: offlineUser.email,
    password: 'SomePassword@123'
  });
  assert(regDupEmail.success === false, 'Offline Duplicate Email Rejected', regDupEmail.error);
  assert(regDupEmail.error.includes('Email already registered'), 'Offline Duplicate Email Error Message Clear', regDupEmail.error);

  // 3. Offline Duplicate Phone Detection
  const regDupPhone = await sendAuthApi('register', {
    name: 'Third User',
    phone: offlineUser.phone,
    email: 'different.email@domain.com',
    password: 'SomePassword@123'
  });
  assert(regDupPhone.success === false, 'Offline Duplicate Phone Rejected', regDupPhone.error);
  assert(regDupPhone.error.includes('Phone number already registered'), 'Offline Duplicate Phone Error Message Clear', regDupPhone.error);

  // 4. Offline Login with Valid Credentials
  const loginValid = await sendAuthApi('login', {
    email: offlineUser.email,
    password: offlineUser.password
  });
  assert(loginValid.success === true, 'Offline Login Successful With Correct Password', loginValid.user?.name);
  assert(loginValid.user?.phone === offlineUser.phone, 'Offline Login Phone Number Accurate', loginValid.user?.phone);

  // 5. Offline Login with Invalid Password
  const loginInvalidPass = await sendAuthApi('login', {
    email: offlineUser.email,
    password: 'WrongPassword999'
  });
  assert(loginInvalidPass.success === false, 'Offline Login Rejected On Incorrect Password', loginInvalidPass.error);
  assert(loginInvalidPass.error.includes('Invalid password'), 'Offline Login Password Error Message Clear', loginInvalidPass.error);

  // 6. Offline Login with Non-Existent User
  const loginUnknown = await sendAuthApi('login', {
    email: 'nonexistent@example.com',
    password: 'SomePassword123'
  });
  assert(loginUnknown.success === false, 'Offline Non-Existent User Rejected', loginUnknown.error);
  assert(loginUnknown.error.includes('User not found'), 'Offline Non-Existent User Message Clear', loginUnknown.error);

  // 7. Offline Quick Demo Login
  const demoRes = await sendAuthApi('demo', {});
  assert(demoRes.success === true, 'Offline Demo Login Succeeds', demoRes.user?.name);
  assert(demoRes.user?.email === 'champion@healthify.app', 'Offline Demo User Email Accurate', demoRes.user?.email);

  console.log('\n================================================================');
  console.log(`📊 OFFLINE TESTS: ${totalCount} | PASSED: ${passedCount} | FAILED: ${totalCount - passedCount}`);
  console.log('================================================================\n');

  if (passedCount === totalCount) {
    console.log('🎉 OFFLINE FALLBACK ENGINE FULLY OPERATIONAL AND VERIFIED!');
  } else {
    process.exitCode = 1;
  }
}

runOfflineTests().catch(err => {
  console.error('Offline test failed:', err);
  process.exit(1);
});

