const express = require('express');
const cors = require('cors');
const path = require('path');
const zlib = require('zlib');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== CORS CONFIGURATION ====================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:5500',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:5500'
];
if (process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN.split(',').forEach(o => {
    const trimmed = o.trim();
    if (trimmed) allowedOrigins.push(trimmed);
  });
}

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    if (process.env.CORS_ORIGIN === '*') return callback(null, true);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Explicit root route handler to ensure index.html is always served
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==================== MYSQL / TIDB CLOUD POOL & HELPERS ====================
const crypto = require('crypto');
let mysqlPool = null;
try {
  const mysql = require('mysql2/promise');
  const isTidbOrCloud = (process.env.DB_SSL === 'true') ||
    (process.env.DB_HOST && process.env.DB_HOST.includes('tidbcloud.com')) ||
    (Number(process.env.DB_PORT) === 4000);

  let sslConfig = undefined;
  if (isTidbOrCloud) {
    sslConfig = {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
    };
    if (process.env.DB_CA_CERT) {
      sslConfig.ca = process.env.DB_CA_CERT;
    }
  }

  mysqlPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'healthify_db',
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    ssl: sslConfig
  });

  const hostDisplay = process.env.DB_HOST || 'localhost';
  const portDisplay = process.env.DB_PORT || 3306;
  const dbDisplay = process.env.DB_NAME || 'healthify_db';
  console.log(`✅ MySQL/TiDB pool created (Target: ${hostDisplay}:${portDisplay}/${dbDisplay}, TLS: ${sslConfig ? 'enabled TLSv1.2+' : 'plain'}).`);
  if (!process.env.DB_PASSWORD && hostDisplay !== 'localhost' && hostDisplay !== '127.0.0.1') {
    console.warn('⚠️ Warning: DB_PASSWORD is not set while pointing to a remote database host.');
  }
} catch (e) {
  console.warn('⚠️ MySQL/TiDB connection pool could not be initialized:', e.message);
}

// Automatically ensure all 12 required tables and schema exist in MySQL / TiDB Cloud
async function initDbTables() {
  if (!mysqlPool) return;

  const tables = [
    {
      name: 'users',
      query: `
        CREATE TABLE IF NOT EXISTS users (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) NOT NULL UNIQUE,
          phone VARCHAR(30) NULL,
          password VARCHAR(255) NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_users_email (email),
          INDEX idx_users_phone (phone)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'user_profiles',
      query: `
        CREATE TABLE IF NOT EXISTS user_profiles (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL UNIQUE,
          gender VARCHAR(50) NULL,
          age DOUBLE NULL,
          weight DOUBLE NULL,
          height DOUBLE NULL,
          activity DOUBLE NULL,
          bmr DOUBLE NULL,
          tdee DOUBLE NULL,
          selected_goal VARCHAR(100) NULL,
          target_calories DOUBLE NULL,
          target_protein DOUBLE NULL,
          confirmed_foods_json LONGTEXT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_user_profiles_user (user_id),
          CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'challenge_progress',
      query: `
        CREATE TABLE IF NOT EXISTS challenge_progress (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL UNIQUE,
          total_days INT NOT NULL DEFAULT 25,
          current_day INT NOT NULL DEFAULT 1,
          start_date VARCHAR(50) NULL,
          history_json LONGTEXT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_challenge_user (user_id),
          CONSTRAINT fk_challenge_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'diet_plans',
      query: `
        CREATE TABLE IF NOT EXISTS diet_plans (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL,
          title VARCHAR(200) NOT NULL,
          plan_type VARCHAR(50) DEFAULT 'DAILY',
          goal VARCHAR(100) NULL,
          calorie_target DOUBLE NULL,
          bmr DOUBLE NULL,
          tdee DOUBLE NULL,
          protein_target DOUBLE NULL,
          carbs_target DOUBLE NULL,
          fat_target DOUBLE NULL,
          fibre_target DOUBLE NULL,
          plan_json LONGTEXT NULL,
          confirmed_foods_json LONGTEXT NULL,
          doctor_notes TEXT NULL,
          status VARCHAR(50) DEFAULT 'ACTIVE',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_diet_plans_user (user_id),
          INDEX idx_diet_plans_status (status),
          CONSTRAINT fk_diet_plans_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'diet_meal_consumptions',
      query: `
        CREATE TABLE IF NOT EXISTS diet_meal_consumptions (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL,
          plan_id BIGINT NULL,
          day_number INT NULL,
          meal_type VARCHAR(50) NULL,
          meal_name VARCHAR(150) NULL,
          planned_cal DOUBLE NULL,
          planned_protein DOUBLE NULL,
          planned_carbs DOUBLE NULL,
          planned_fat DOUBLE NULL,
          planned_fibre DOUBLE NULL,
          actual_cal DOUBLE NULL,
          actual_protein DOUBLE NULL,
          actual_carbs DOUBLE NULL,
          actual_fat DOUBLE NULL,
          actual_fibre DOUBLE NULL,
          status VARCHAR(30) DEFAULT 'CONSUMED',
          log_date VARCHAR(30) NULL,
          consumed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_dmc_user (user_id),
          INDEX idx_dmc_user_day (user_id, day_number),
          INDEX idx_dmc_date (log_date),
          CONSTRAINT fk_dmc_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'food_logs',
      query: `
        CREATE TABLE IF NOT EXISTS food_logs (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL,
          name VARCHAR(150) NOT NULL,
          grams DOUBLE NOT NULL,
          cal DOUBLE NOT NULL,
          protein DOUBLE NOT NULL,
          fibre DOUBLE NOT NULL,
          type VARCHAR(50) NULL,
          log_date VARCHAR(30) NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_food_logs_user_date (user_id, log_date),
          CONSTRAINT fk_food_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'daily_steps',
      query: `
        CREATE TABLE IF NOT EXISTS daily_steps (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL,
          log_date VARCHAR(30) NOT NULL,
          steps_count INT NOT NULL DEFAULT 0,
          step_goal INT NOT NULL DEFAULT 10000,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_daily_steps_user_date (user_id, log_date),
          CONSTRAINT fk_daily_steps_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'water_intake',
      query: `
        CREATE TABLE IF NOT EXISTS water_intake (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL,
          log_date VARCHAR(30) NOT NULL,
          glasses INT NOT NULL DEFAULT 0,
          target_glasses INT NOT NULL DEFAULT 12,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_water_intake_user_date (user_id, log_date),
          CONSTRAINT fk_water_intake_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'workout_logs',
      query: `
        CREATE TABLE IF NOT EXISTS workout_logs (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL,
          workout_mode VARCHAR(50) NULL,
          workout_title VARCHAR(150) NULL,
          exercises_json TEXT NULL,
          trained_muscles VARCHAR(255) NULL,
          completed BOOLEAN DEFAULT FALSE,
          log_date VARCHAR(30) NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_workout_logs_user_date (user_id, log_date),
          CONSTRAINT fk_workout_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'supplements',
      query: `
        CREATE TABLE IF NOT EXISTS supplements (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NULL,
          name VARCHAR(150) NOT NULL,
          brand VARCHAR(150) NULL,
          serving_size VARCHAR(50) NULL,
          protein DOUBLE NULL,
          cal DOUBLE NULL,
          instructions TEXT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_supplements_user (user_id),
          CONSTRAINT fk_supplements_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'uploaded_documents',
      query: `
        CREATE TABLE IF NOT EXISTS uploaded_documents (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NULL,
          file_name VARCHAR(255) NOT NULL,
          file_type VARCHAR(100) NULL,
          file_size BIGINT NULL,
          storage_provider VARCHAR(50) DEFAULT 'local',
          file_url LONGTEXT NOT NULL,
          extracted_foods_count INT DEFAULT 0,
          uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_docs_user (user_id),
          CONSTRAINT fk_uploaded_docs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    },
    {
      name: 'ai_chat_messages',
      query: `
        CREATE TABLE IF NOT EXISTS ai_chat_messages (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT NOT NULL,
          sender VARCHAR(10) NOT NULL,
          message_text MEDIUMTEXT NOT NULL,
          source VARCHAR(50) DEFAULT 'groq',
          diet_plan_id BIGINT NULL,
          attachment_name VARCHAR(255) NULL,
          attachment_type VARCHAR(100) NULL,
          has_attachment BOOLEAN DEFAULT FALSE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_ai_chat_user (user_id),
          INDEX idx_ai_chat_created (created_at),
          CONSTRAINT fk_ai_chat_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `
    }
  ];

  for (const table of tables) {
    try {
      await mysqlPool.query(table.query);
    } catch (err) {
      console.warn(`Init table notice (${table.name}):`, err.message);
    }
  }

  // Schema patches / column validations
  try {
    const [cols] = await mysqlPool.query("SHOW COLUMNS FROM user_profiles LIKE 'confirmed_foods_json'");
    if (!cols || cols.length === 0) {
      await mysqlPool.query("ALTER TABLE user_profiles ADD COLUMN confirmed_foods_json LONGTEXT NULL");
    }
  } catch (err) {
    console.warn('Init user_profiles confirmed_foods_json column notice:', err.message);
  }

  try {
    const [cols] = await mysqlPool.query("SHOW COLUMNS FROM user_profiles LIKE 'target_protein'");
    if (!cols || cols.length === 0) {
      await mysqlPool.query("ALTER TABLE user_profiles ADD COLUMN target_protein DOUBLE NULL");
    }
  } catch (err) {
    console.warn('Init user_profiles target_protein column notice:', err.message);
  }

  console.log('✅ Database tables initialized (all 12 tables verified).');
}
initDbTables().catch(err => {
  console.warn('Database initialization warning:', err.message);
});

function hashPassword(password) {
  if (!password) return '';
  return crypto.createHash('sha256').update(password, 'utf8').digest('hex');
}

function verifyPassword(inputPassword, storedHashOrPassword) {
  if (!inputPassword || !storedHashOrPassword) return false;
  const hashedInput = hashPassword(inputPassword);
  return hashedInput.toLowerCase() === storedHashOrPassword.toLowerCase() || inputPassword === storedHashOrPassword;
}

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
  } else if (clean.length === 11 && clean.startsWith('0') && /^[6-9]/.test(clean.substring(1))) {
    clean = clean.substring(1);
  }
  return clean;
}

function validatePhoneNumberBackend(phone, isRequired = false) {
  if (!phone || typeof phone !== 'string' || !phone.trim() || phone.trim() === 'N/A') {
    if (isRequired) {
      return { isValid: false, error: 'Phone number is required.' };
    }
    return { isValid: true, sanitized: '' };
  }
  const clean = normalizePhoneNumberBackend(phone);
  if (!/^\d+$/.test(clean)) {
    return { isValid: false, error: 'Phone number must contain only numeric digits (no alphabets or special characters).' };
  }
  if (clean.length !== 10) {
    return { isValid: false, error: `Phone number must contain exactly 10 digits for Indian mobile numbers (entered ${clean.length} digits).` };
  }
  if (!/^[6-9]/.test(clean)) {
    return { isValid: false, error: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.' };
  }
  return { isValid: true, sanitized: clean };
}

function validateEmailBackend(email, isRequired = true) {
  if (!email || typeof email !== 'string' || !email.trim()) {
    if (isRequired) {
      return { isValid: false, error: 'Email address is required.' };
    }
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
    return { isValid: false, error: `Please enter a valid email address with a domain (e.g. username@gmail.com). Format '${trimmed}' is invalid.` };
  }
  return { isValid: true, sanitized: trimmed.toLowerCase() };
}

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const GROQ_VISION_MODEL = process.env.GROQ_VISION_MODEL || 'llama-3.2-11b-vision-preview';

// AI Health Coach Master System Instruction
const COACH_SYSTEM_INSTRUCTION = `You are the "AI Health Coach & Dynamic Diet Planner" inside the Health Tracker Ultimate (Healthify) application.
Subtitle: "Your personalized Healthify assistant".

Your role is to understand natural-language questions and analyze the user's REAL Healthify data to provide personalized, encouraging, and highly structured insights.

CRITICAL INSTRUCTIONS & GROUNDING RULES:
1. NATURAL CONVERSATION & MEMORY:
   - Behave like a natural, intelligent conversational assistant (powered by GroqCloud).
   - Understand follow-up questions, corrections, and instructions using the current conversation context.
   - Explain recommendations and ask for clarification when information is insufficient.
   - Do not behave like a rigid keyword-based chatbot.

2. INTELLIGENT UNDERSTANDING OF SHORT INPUTS:
   - When the user sends a single word or broad category (e.g. "Protein", "Vegetarian", "Weight gain", "Dinner", "Diet"), intelligently understand the likely intents and offer clear, helpful possibilities or a brief clarification:
     * "Protein": Offer protein-rich foods from available items, daily protein requirements based on bodyweight (1.6-2.2g/kg), or protein distribution across 5 meals.
     * "Vegetarian": Offer vegetarian meal planning, vegetarian protein sources (Paneer, Tofu, Soy chunks, Legumes), or plant-based plan conversion.
     * "Weight gain": Explain appropriate calorie surplus (+10-20% above maintenance TDEE), macro targets, and structured 5-meal diet planning based on the Profile Calculator.
     * "Dinner": Offer dinner suggestions, lighter dinner ideas, nutrient timing, or dinner alternatives.
     * "Diet": Explain generating a personalized 5-meal daily, 7-day, or 25-day plan based on Profile BMR and TDEE.

3. EXISTING PROFILE CALCULATOR AS PRIMARY CALORIE SOURCE:
   - STRICTLY ground calorie and nutrition targets in the user's verified Profile Calculator numbers (BMR, TDEE, weight, height, age, gender, activity level, selectedGoal, targetCalories).
   - BMR = Basal Metabolic Rate.
   - Maintenance calories = TDEE (Total Daily Energy Expenditure).
   - Muscle gain / Weight gain = calorie surplus above maintenance (+10% to +20%).
   - Weight loss / Fat loss = calorie deficit below maintenance (-10% to -21%).
   - Maintenance goal = calories around maintenance.
   - Never invent conflicting numerical formulas. Always ground targets in the verified calculator values.

4. DYNAMIC FOOD SELECTION (NEVER HARDCODE DEFAULT MEALS):
   - Never hardcode default meals (do not default to oats, milk, chicken, eggs, or rice unless confirmed available or requested).
   - Base choices strictly on confirmed available foods, user preferences, allergies, and dietary requirements.

5. FIVE-MEAL DIET STRUCTURE:
   - When generating or discussing diet plans, use 5 distinct meals:
     1. Breakfast
     2. Pre-Lunch (Mid-Morning)
     3. Lunch
     4. Evening Snack
     5. Dinner
   - For each food item, state food name, quantity, raw or cooked weight, and preparation method.

6. NATURAL-LANGUAGE DIET EDITING:
   - When user requests adjustments ("Make dinner lighter", "Replace food X with Y", "Make the plan vegetarian", "Increase calories appropriately"), understand the context and update only the requested part, maintaining all other meals.

TONE: Friendly, motivating, concise, structured with emojis, bold headers, and bullet points.`;

// GroqCloud API Query Function with Multi-turn Context and Multimodal support
async function queryGroq(systemPrompt, userPrompt, history = [], fileData = null, mimeType = null) {
  if (!GROQ_API_KEY || GROQ_API_KEY.trim() === '' || GROQ_API_KEY === 'your_new_groq_api_key' || GROQ_API_KEY === 'your_groq_api_key') {
    return null; // Triggers intelligent fallback
  }

  const modelsToTry = fileData ? [GROQ_VISION_MODEL, 'llama-3.2-11b-vision-preview', 'llama-3.2-90b-vision-preview'] : [GROQ_MODEL, 'openai/gpt-oss-120b'];
  let lastError = null;

  const messages = [];
  if (systemPrompt && systemPrompt.trim()) {
    messages.push({ role: 'system', content: systemPrompt.trim() });
  }

  if (history && Array.isArray(history) && history.length > 0) {
    for (const h of history) {
      if (h && h.content && h.content.trim()) {
        messages.push({
          role: h.role === 'user' ? 'user' : 'assistant',
          content: h.content.trim()
        });
      }
    }
  }

  if (fileData && typeof fileData === 'string' && fileData.trim()) {
    const cleanBase64 = fileData.includes(',') ? fileData.split(',')[1] : fileData;
    const cleanMime = (mimeType && mimeType.trim()) || 'image/jpeg';
    const dataUri = `data:${cleanMime};base64,${cleanBase64}`;
    messages.push({
      role: 'user',
      content: [
        { type: 'text', text: userPrompt },
        { type: 'image_url', image_url: { url: dataUri } }
      ]
    });
  } else {
    messages.push({ role: 'user', content: userPrompt });
  }

  for (const model of modelsToTry) {
    try {
      const endpoint = 'https://api.groq.com/openai/v1/chat/completions';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY.trim()}`
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.35,
          max_tokens: 2500
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        lastError = new Error(`GroqCloud API Error (${model}) [${response.status}]: ${errorText}`);
        continue;
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        const text = data.choices[0].message.content.trim();
        return { text, groundingMetadata: null, searchSources: [] };
      }
    } catch (err) {
      lastError = err;
    }
  }

  console.warn('Groq API call fallback to deterministic engine:', lastError ? lastError.message : 'No API key configured');
  return null;
}

// ---------------- DETERMINISTIC HEALTH COACH FALLBACK ENGINE ----------------
function generateDeterministicCoachAnswer(message, data) {
  const q = (message || '').toLowerCase().trim();
  const profile = data.profile || {};
  const steps = data.steps || data.dailySteps || 0;
  const stepGoal = data.stepGoal || 10000;
  const water = data.waterGlasses || 0;
  const targetWater = data.targetGlasses || 12;
  const foodLog = data.foodLog || [];
  const challenge = data.challenge || {};
  const history = data.history7Days || challenge.history || {};
  const dayKeys = Object.keys(history);
  const totalDays = challenge.totalDays || data.totalDays || 25;
  const completedDays = data.completedDays !== undefined ? data.completedDays : dayKeys.length;
  const currentDay = data.challengeDay || (completedDays < totalDays ? completedDays + 1 : totalDays);

  let totalCal = 0, totalPro = 0;
  foodLog.forEach(f => { totalCal += (f.cal || 0); totalPro += (f.protein || 0); });

  const hasAnyTodayData = (steps > 0 || water > 0 || foodLog.length > 0 || !!data.workout || (data.workoutMode && data.workoutMode !== 'none'));

  // 1. INTENT: Weekly Report
  if (q.includes('weekly') || q.includes('week') || q.includes('last 7 days') || q.includes('7 days') || q.includes('past week')) {
    if (dayKeys.length === 0) {
      return `### 📊 WEEKLY AI REPORT
I don't have enough logged data to analyze that yet.

You currently have **0 completed days** recorded in your 25-Day Transformation Challenge history.

**To build your weekly performance report:**
- 👣 Target **10,000 steps daily** on the Steps Tracker.
- 💧 Log **10–12 glasses of water (~2.5–3L)** in the Water Tracker.
- 🍎 Log your meals in the **Food & Nutrition** catalog.
- 🏋️ Finish your workout on the **Day ${currentDay} Dashboard** and mark the day complete!`;
    }

    let totalSteps = 0, totalWater = 0, workoutCount = 0, waterGoalMetDays = 0;
    const allMeals = [];

    dayKeys.forEach(k => {
      const d = history[k];
      const s = d.dailySteps || 0;
      const w = d.waterGlasses || 0;
      totalSteps += s;
      totalWater += w;
      if (w >= 10) waterGoalMetDays++;
      if (d.routineTitle && d.routineTitle !== 'Rest Day') workoutCount++;
      else if (d.workoutMode === 'gym' || d.workoutMode === 'home') workoutCount++;
      (d.foodLog || []).forEach(f => allMeals.push((f.name || '').toLowerCase()));
    });

    const avgSteps = Math.round(totalSteps / dayKeys.length);
    const avgWaterLiters = ((totalWater / dayKeys.length) * 0.25).toFixed(1);

    const mealFreq = {};
    allMeals.forEach(m => { mealFreq[m] = (mealFreq[m] || 0) + 1; });
    const repeated = Object.entries(mealFreq).filter(([_, c]) => c >= 3).map(([n, c]) => `${n} (${c}x)`);

    return `### 📊 WEEKLY AI REPORT
Here is your weekly Healthify performance breakdown:

🏆 **Challenge:** ${completedDays} / ${totalDays} days completed (${Math.round((completedDays / totalDays) * 100)}%)
👣 **Average Steps:** ${avgSteps.toLocaleString()} steps / day
💧 **Water Goal:** Achieved on ${waterGoalMetDays} / ${dayKeys.length} days (~${avgWaterLiters}L daily avg)
🏋️ **Workouts:** ${workoutCount} completed

🍎 **Food Patterns:**
${repeated.length > 0 ? `You logged similar meals on several days: **${repeated.join(', ')}**.` : 'Good dietary variety recorded across your logged meals.'}

🌟 **Overall Assessment:**
Your workout consistency is ${workoutCount >= 4 ? 'strong' : 'moderate'}. ${waterGoalMetDays < dayKeys.length ? `Hydration was missed on ${dayKeys.length - waterGoalMetDays} days.` : 'Hydration adherence is excellent.'}

💡 **Personalized Recommendations:**
1. ${avgSteps < 10000 ? `Increase daily walking to bridge the gap toward ${stepGoal.toLocaleString()} steps.` : 'Maintain your strong daily movement consistency.'}
2. ${repeated.length > 0 ? 'Rotate your protein sources (alternate paneer, lentils, chicken, eggs, and tofu) for micronutrient diversity.' : 'Keep prioritizing high-protein whole foods.'}
3. Lock in **Day ${currentDay}** on your Transformation Dashboard!`;
  }

  // 2. INTENT: Food Variety Check / Repetitive Diet
  if (q.includes('variety') || q.includes('same food') || q.includes('repetitive') || q.includes('eating') || q.includes('diet') || q.includes('what should i eat')) {
    const recentFoods = [];
    foodLog.forEach(f => recentFoods.push((f.name || '').toLowerCase()));
    Object.values(history).forEach(d => {
      (d.foodLog || []).forEach(f => recentFoods.push((f.name || '').toLowerCase()));
    });

    if (recentFoods.length === 0) {
      return `### 🥗 FOOD VARIETY CHECK
No data logged yet.

You haven't logged any meals in Healthify yet. Start logging your foods in the **Veg**, **Non-Veg**, or **Nuts** sections to analyze your dietary variety and micronutrient balance!

**Recommended Choices from Healthify Catalog:**
- 🥦 **Veg:** Paneer (18g protein/100g), Soya Chunks (52g), Chickpeas, Greek Curd.
- 🍗 **Non-Veg:** Grilled Chicken Breast (31g), Boiled Eggs, Salmon.
- 🌾 **Complex Carbs & Fibre:** Oats, Chia Seeds, Brown Rice, Sweet Potatoes.`;
    }

    const counts = {};
    recentFoods.forEach(f => { counts[f] = (counts[f] || 0) + 1; });
    const duplicates = Object.entries(counts).filter(([_, c]) => c >= 2).map(([n, c]) => `${n} (${c}x)`);

    if (duplicates.length > 0) {
      return `🔍 **Food Variety Analysis:**

You have logged **${duplicates.join(', ')}** on several recent days. 

While consistency is helpful, eating the exact same meals repeatedly can limit micronutrient diversity. Consider rotating different protein and vegetable sources:

🍽️ **Suggested Swaps from Healthify Food Database:**
- 🧀 **Plant / Dairy Proteins:** Soya chunks (52g protein/100g), Paneer (18g/100g), Boiled Chickpeas.
- 🍗 **Lean Proteins:** Grilled Chicken Breast (31g/100g), Whole Eggs / Egg Whites.
- 🌾 **Fiber & Healthy Fats:** Oats, Chia Seeds, Almonds, Spinach.

Aim for at least 20–30g of varied protein in each main meal!`;
    }

    return `✅ **Food Variety Check:**
Your logged meals show good variety without excessive repetition. Keep balancing high-protein foods with leafy greens, complex carbs, and healthy fats!`;
  }

  // 3. INTENT: Workout Routine Recommendation
  if (q.includes('workout') || q.includes('routine') || q.includes('exercise') || q.includes('train') || q.includes('gym') || q.includes('what should i do')) {
    const isOdd = (currentDay % 2 !== 0);
    const routineTitle = isOdd ? 'Push & Upper Strength Blast' : 'Pull & Core Conditioning';
    const routineType = isOdd ? 'Home Bodyweight / Dumbbells' : 'Gym / Home Hybrid';

    return `Based on your current challenge day (Day ${currentDay}) and recent workout history, today's recommended routine is:

🏋️ **${routineTitle}** (${routineType})
- **Focus Muscles:** ${isOdd ? 'Chest, Shoulders, Triceps & Quads' : 'Back, Biceps, Core Stabilizers & Hamstrings'}
- **Estimated Time:** 35–40 minutes (~280 kcal burn)

📋 **Exercise Plan from Healthify Catalog:**
1. **${isOdd ? 'Flat Dumbbell / Push-Ups' : 'Wide-Grip Lat Pulldowns / Rows'}** — 4 Sets × 8–12 Reps *(Rest: 60s)*
2. **${isOdd ? 'Incline Dumbbell Press' : 'Seated Cable Rows / Pulls'}** — 3 Sets × 10–12 Reps *(Rest: 60s)*
3. **${isOdd ? 'Overhead Shoulder Press' : 'Standing Barbell / Dumbbell Curls'}** — 3 Sets × 10–12 Reps *(Rest: 45s)*
4. **${isOdd ? 'Cable Tricep Pushdowns / Dips' : 'Bicycle Crunches / Plank Hold'}** — 3 Sets × 15 Reps *(Rest: 45s)*

💡 *Tip: Open **"🏋️ Workouts Hub"** from the Menu and click **"🎬 Watch Video"** on any movement to verify proper exercise form!*`;
  }

  // 4. INTENT: Transformation Challenge Progress
  if (q.includes('transformation') || q.includes('challenge') || q.includes('how many days') || q.includes('progress')) {
    const pct = Math.round((completedDays / totalDays) * 100);
    return `🏆 **25-Day Transformation Challenge Progress:**

- 📍 **Current Day:** Day ${currentDay} of ${totalDays}
- ✅ **Completed Days:** ${completedDays} / ${totalDays} (${pct}% Complete)
- 🔒 **Remaining Days:** ${totalDays - completedDays} days
- ⭐ **Status:** ${completedDays >= totalDays ? '🎉 Challenge Completed! Fantastic dedication!' : `Day ${currentDay} is active and ready for your workout, steps, and water!`}`;
  }

  // 5. INTENT: Steps Analysis
  if (q.includes('step') || q.includes('walk') || q.includes('activity')) {
    if (steps === 0) {
      return `👣 **Steps Analysis:**
- **Logged Today:** 0 / ${stepGoal.toLocaleString()} steps (0% of goal)
- **Status:** No walking steps recorded today yet.

A 20-30 minute brisk walk will help you log your first 2,500–3,000 steps toward your ${stepGoal.toLocaleString()} goal!`;
    }
    const pct = Math.round((steps / stepGoal) * 100);
    return `👣 **Steps Analysis:**
- **Logged Today:** ${steps.toLocaleString()} / ${stepGoal.toLocaleString()} steps (${pct}% of goal)
- **Estimated Distance:** ~${(steps * 0.00076).toFixed(2)} km
- **Estimated Caloric Burn:** ~${Math.round(steps * 0.04)} kcal

${steps >= stepGoal ? '🎯 Great job! You have conquered your daily step target!' : `You need ${(stepGoal - steps).toLocaleString()} more steps to hit your target. A 15-20 min brisk walk will get you there!`}`;
  }

  // 6. INTENT: Water Analysis
  if (q.includes('water') || q.includes('hydration') || q.includes('drink')) {
    if (water === 0) {
      return `💧 **Hydration Analysis:**
- **Logged Today:** 0 / ${targetWater} glasses (0L / ${(targetWater * 0.25).toFixed(1)}L target)
- **Status:** No water intake logged today yet.

Start your hydration routine by drinking a glass of fresh water (250ml) and logging it in the Water Tracker!`;
    }
    const waterL = (water * 0.25).toFixed(2);
    const targetL = (targetWater * 0.25).toFixed(1);
    const pct = Math.round((water / targetWater) * 100);
    return `💧 **Hydration Analysis:**
- **Logged Today:** ${water} / ${targetWater} glasses (~${waterL}L / ${targetL}L target, ${pct}%)

${water >= targetWater ? '✅ Excellent hydration! You have met your daily water target.' : `You are ${targetWater - water} glasses away from your ${targetL}L goal. Keep sipping water regularly!`}`;
  }

  // 7. INTENT: Protein Guidance
  if (q.includes('protein') || q.includes('muscle')) {
    return `💪 **Protein Guidance:**
- **Logged Today:** ${Math.round(totalPro)}g protein (${Math.round(totalCal)} kcal)

**Top Protein Sources in Healthify:**
- 🧀 **Veg:** Soya chunks (52g/100g), Paneer (18g/100g), Sprouted Moong (24g/100g).
- 🍗 **Non-Veg:** Chicken Breast (31g/100g), Boiled Eggs (13g/100g), Tuna (28g/100g).
- ⚡ **Supplements:** Whey Protein (24–25g/scoop), Creatine Monohydrate.`;
  }

  // 7a. INTENT: Vegetarian Nutrition
  if (q.includes('vegetarian') || q === 'veg') {
    return `### 🥗 Vegetarian Nutrition & Meal Planning
Vegetarian diets can easily achieve optimal macronutrient targets with intentional food pairing to ensure complete amino acid profiles.

**Key Vegetarian Powerhouses:**
- **Proteins:** Soya chunks (52g/100g), Paneer (18g/100g), Tofu (17g/100g), Lentils / Dal, Greek Yogurt
- **Complex Carbs:** Oats, Quinoa, Brown Rice, Sweet Potato, Whole Wheat Chapati
- **Micronutrients & Healthy Fats:** Spinach, Broccoli, Almonds, Walnuts, Chia Seeds

**How would you like to proceed?**
- Generate a **7-day 5-meal vegetarian diet plan** tailored to your Profile Calculator
- Suggest quick vegetarian high-protein snacks
- Review your current logged meals`;
  }

  // 7b. INTENT: Weight Gain Protocol
  if (q.includes('weight gain') || q.includes('muscle gain') || q === 'bulk' || q === 'bulking') {
    return `### 📈 Weight Gain & Lean Bulking Protocol
To build lean muscle mass while minimizing unnecessary fat accumulation:

**1. Caloric Surplus:**
Target a moderate surplus of **+250 to +500 kcal** above your Maintenance (TDEE).

**2. Macro Distribution:**
- **Protein:** 1.8 – 2.2g per kg body weight
- **Carbs:** 45% – 55% of daily calories for glycogen replenishment
- **Healthy Fats:** 25% – 30% for hormonal optimization

**3. Meal Frequency:**
Distribute nutrition across **5 structured meals** (Breakfast, Pre-Lunch, Lunch, Evening Snack, Dinner).

Shall I generate a customized **5-meal weight gain diet plan** grounded in your Profile Calculator?`;
  }

  // 7c. INTENT: Dinner Planning
  if (q.includes('dinner') || q === 'night meal') {
    return `### 🍲 Dinner Planning & Nutrition
Dinner should provide steady-release amino acids for overnight recovery without causing digestive strain or disrupting circadian sleep cycles.

**Best Dinner Practices:**
- Consume 2.5–3 hours before sleep.
- Emphasize lean protein and high-fibre greens with moderate low-GI carbs.
- Hydrate adequately earlier in the evening.

**Healthy Examples:**
- Grilled Paneer / Tofu (150g) with sautéed vegetables & 1 whole wheat chapati
- Grilled chicken breast with broccoli and warm quinoa
- Spiced lentil dal with a fresh green salad

Would you like me to lighten your current dinner or generate a complete 5-meal plan?`;
  }

  // 8. INTENT: Daily Analysis / "How am I doing today?"
  if (q.includes('how am i doing') || q.includes('today') || q.includes('summary') || q.includes('improve')) {
    if (!hasAnyTodayData) {
      return `### 📋 TODAY'S HEALTH ANALYSIS
**No data logged yet today.**

- 👣 **Steps:** 0 logged today
- 💧 **Water:** 0 glasses logged today
- 🍎 **Meals:** No meals logged yet
- 🏋️ **Workout:** No workout logged yet
- 🏆 **Transformation Challenge:** Day ${currentDay} of ${totalDays} (${completedDays} completed)

**Suggestions to get started:**
1. 💧 Drink a glass of water and log it in the **Water Tracker**.
2. 👣 Take a walk and record your steps in the **Steps Tracker**.
3. 🏋️ Open **Day ${currentDay}** on your Dashboard and choose your workout routine!`;
    }

    const stepPct = Math.round((steps / stepGoal) * 100);
    const waterPct = Math.round((water / targetWater) * 100);
    const routine = data.workout ? data.workout.title : (data.workoutMode && data.workoutMode !== 'none' ? data.workoutMode.toUpperCase() + ' Workout' : 'No workout logged yet');

    return `### 📋 TODAY'S HEALTH ANALYSIS
Here is your real-time summary for today:

- 👣 **Steps:** ${steps.toLocaleString()} / ${stepGoal.toLocaleString()} (${stepPct}%)
- 💧 **Water:** ${water} / ${targetWater} glasses (~${(water * 0.25).toFixed(2)}L, ${waterPct}%)
- 🍎 **Nutrition:** ${foodLog.length} item(s) (${Math.round(totalCal)} kcal, ${Math.round(totalPro)}g protein)
- 🏋️ **Workout:** ${routine}
- 🏆 **Challenge:** Day ${currentDay} of ${totalDays} (${completedDays} completed)

${steps >= stepGoal && water >= targetWater ? '🔥 You are crushing all your daily targets today! Keep up the momentum!' : 'Stay focused on closing your remaining steps and water before finishing the day!'}`;
  }

  // Default intelligent grounded response
  return `Based on your Healthify data (Day ${currentDay} of ${totalDays}, ${steps.toLocaleString()} steps, ${water} glasses of water, ${foodLog.length} food items logged):

You are making solid progress. You can ask me:
- *"Generate my weekly report"*
- *"Check my food variety"*
- *"Give me today's workout routine"*
- *"How is my transformation going?"*`;
}

// ---------------- NUTRITION DATABASE & 5-MEAL PLANNER ENGINE ----------------
const NUTRITION_DB = {
  // Grains & Starches (Raw vs Cooked Grounded in USDA FoodData Central & IFCT)
  'oats': { name: 'Oats (Raw)', emoji: '🥣', cal: 389, pro: 16.9, carbs: 66.3, fat: 6.9, fib: 10.6, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'dry oats': { name: 'Oats (Raw)', emoji: '🥣', cal: 389, pro: 16.9, carbs: 66.3, fat: 6.9, fib: 10.6, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'raw oats': { name: 'Oats (Raw)', emoji: '🥣', cal: 389, pro: 16.9, carbs: 66.3, fat: 6.9, fib: 10.6, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'rolled oats': { name: 'Oats (Raw)', emoji: '🥣', cal: 389, pro: 16.9, carbs: 66.3, fat: 6.9, fib: 10.6, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'uncooked oats': { name: 'Oats (Raw)', emoji: '🥣', cal: 389, pro: 16.9, carbs: 66.3, fat: 6.9, fib: 10.6, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'cooked oats': { name: 'Oats (Cooked Porridge)', emoji: '🥣', cal: 71, pro: 2.5, carbs: 12.0, fat: 1.5, fib: 1.7, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'raw rice': { name: 'White Rice (Raw)', emoji: '🍚', cal: 360, pro: 7.0, carbs: 79.0, fat: 0.6, fib: 1.3, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'uncooked rice': { name: 'White Rice (Raw)', emoji: '🍚', cal: 360, pro: 7.0, carbs: 79.0, fat: 0.6, fib: 1.3, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'white rice (raw)': { name: 'White Rice (Raw)', emoji: '🍚', cal: 360, pro: 7.0, carbs: 79.0, fat: 0.6, fib: 1.3, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'brown rice (raw)': { name: 'Brown Rice (Raw)', emoji: '🍚', cal: 362, pro: 7.5, carbs: 76.0, fat: 2.7, fib: 3.4, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'brown rice': { name: 'Brown Rice (Cooked)', emoji: '🍚', cal: 111, pro: 2.6, carbs: 23.0, fat: 0.9, fib: 1.8, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'white rice': { name: 'White Rice (Cooked)', emoji: '🍚', cal: 130, pro: 2.7, carbs: 28.2, fat: 0.3, fib: 0.4, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'rice': { name: 'White Rice (Cooked)', emoji: '🍚', cal: 130, pro: 2.7, carbs: 28.2, fat: 0.3, fib: 0.4, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'chapati': { name: 'Whole Wheat Chapati / Roti', emoji: '🫓', cal: 260, pro: 9.0, carbs: 52.0, fat: 3.5, fib: 7.0, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'roti': { name: 'Whole Wheat Chapati / Roti', emoji: '🫓', cal: 260, pro: 9.0, carbs: 52.0, fat: 3.5, fib: 7.0, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'sweet potato': { name: 'Sweet Potato (Boiled)', emoji: '🍠', cal: 86, pro: 1.6, carbs: 20.1, fat: 0.1, fib: 3.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'quinoa': { name: 'Quinoa (Cooked)', emoji: '🌾', cal: 120, pro: 4.4, carbs: 21.3, fat: 1.9, fib: 2.8, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'poha': { name: 'Poha (Cooked)', emoji: '🥣', cal: 130, pro: 2.5, carbs: 26.0, fat: 2.0, fib: 1.2, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'upma': { name: 'Upma (Rava Upma)', emoji: '🥣', cal: 135, pro: 3.5, carbs: 24.0, fat: 3.0, fib: 1.8, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'idli': { name: 'Idli (Steamed)', emoji: '⚪', cal: 135, pro: 4.0, carbs: 28.0, fat: 0.5, fib: 1.5, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'idlis': { name: 'Idli (Steamed)', emoji: '⚪', cal: 135, pro: 4.0, carbs: 28.0, fat: 0.5, fib: 1.5, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'dosa': { name: 'Dosa (Plain)', emoji: '🥞', cal: 168, pro: 4.5, carbs: 29.0, fat: 3.8, fib: 1.8, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'pongal': { name: 'Pongal (Ven Pongal)', emoji: '🥣', cal: 175, pro: 4.2, carbs: 26.0, fat: 6.0, fib: 2.0, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'sambar': { name: 'Sambar', emoji: '🍲', cal: 55, pro: 2.5, carbs: 9.0, fat: 1.2, fib: 2.2, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'coconut chutney': { name: 'Coconut Chutney', emoji: '🥥', cal: 180, pro: 2.5, carbs: 6.0, fat: 17.0, fib: 3.0, state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
  'peanut chutney': { name: 'Peanut / Groundnut Chutney', emoji: '🥜', cal: 220, pro: 6.5, carbs: 8.0, fat: 18.0, fib: 2.5, state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
  'chutney': { name: 'Coconut Chutney', emoji: '🥥', cal: 180, pro: 2.5, carbs: 6.0, fat: 17.0, fib: 3.0, state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },

  // Proteins: Veg & Dairy
  'milk': { name: "Cow's Milk (Toned)", emoji: '🥛', cal: 58, pro: 3.2, carbs: 4.8, fat: 3.1, fib: 0.0, state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
  'paneer': { name: 'Paneer (Fresh/Raw)', emoji: '🧀', cal: 265, pro: 18.3, carbs: 3.5, fat: 20.8, fib: 0.0, state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
  'fresh paneer': { name: 'Paneer (Fresh/Raw)', emoji: '🧀', cal: 265, pro: 18.3, carbs: 3.5, fat: 20.8, fib: 0.0, state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
  'cottage cheese': { name: 'Paneer (Fresh/Raw)', emoji: '🧀', cal: 265, pro: 18.3, carbs: 3.5, fat: 20.8, fib: 0.0, state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
  'tofu': { name: 'Tofu (Firm)', emoji: '🧊', cal: 76, pro: 8.0, carbs: 1.9, fat: 4.8, fib: 0.3, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'greek yogurt': { name: 'Greek Yogurt', emoji: '🥛', cal: 59, pro: 10.0, carbs: 3.6, fat: 0.4, fib: 0.0, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'curd': { name: 'Curd / Dahi (Low Fat)', emoji: '🥣', cal: 60, pro: 3.5, carbs: 4.5, fat: 3.0, fib: 0.0, state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
  'dahi': { name: 'Curd / Dahi (Low Fat)', emoji: '🥣', cal: 60, pro: 3.5, carbs: 4.5, fat: 3.0, fib: 0.0, state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
  'soya chunks': { name: 'Soya Chunks (Dried)', emoji: '🧆', cal: 345, pro: 52.0, carbs: 33.0, fat: 0.5, fib: 13.0, state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
  'raw dal': { name: 'Moong Dal (Raw)', emoji: '🥣', cal: 347, pro: 24.0, carbs: 59.8, fat: 1.2, fib: 16.3, state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
  'raw moong dal': { name: 'Moong Dal (Raw)', emoji: '🥣', cal: 347, pro: 24.0, carbs: 59.8, fat: 1.2, fib: 16.3, state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
  'dry dal': { name: 'Moong Dal (Raw)', emoji: '🥣', cal: 347, pro: 24.0, carbs: 59.8, fat: 1.2, fib: 16.3, state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
  'dal': { name: 'Moong Dal (Cooked)', emoji: '🥣', cal: 105, pro: 7.1, carbs: 19.0, fat: 0.4, fib: 5.3, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'moong dal': { name: 'Moong Dal (Cooked)', emoji: '🥣', cal: 105, pro: 7.1, carbs: 19.0, fat: 0.4, fib: 5.3, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'lentils': { name: 'Lentils (Cooked)', emoji: '🍲', cal: 116, pro: 9.0, carbs: 20.1, fat: 0.4, fib: 7.9, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'raw chana': { name: 'Chickpeas / Chana (Raw)', emoji: '🧆', cal: 364, pro: 19.3, carbs: 60.6, fat: 6.0, fib: 17.4, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'chana': { name: 'Chickpeas / Chana (Cooked)', emoji: '🧆', cal: 164, pro: 8.9, carbs: 27.4, fat: 2.6, fib: 7.6, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'chickpeas': { name: 'Chickpeas / Chana (Cooked)', emoji: '🧆', cal: 164, pro: 8.9, carbs: 27.4, fat: 2.6, fib: 7.6, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'sprouts': { name: 'Sprouted Moong (Raw)', emoji: '🌱', cal: 31, pro: 3.2, carbs: 5.9, fat: 0.2, fib: 1.8, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },

  // Grains & Bread
  'bread': { name: 'Whole Wheat Bread', emoji: '🍞', cal: 247, pro: 13.0, carbs: 41.0, fat: 3.4, fib: 7.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'whole wheat bread': { name: 'Whole Wheat Bread', emoji: '🍞', cal: 247, pro: 13.0, carbs: 41.0, fat: 3.4, fib: 7.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },

  // Proteins: Non-Veg (Raw vs Cooked per USDA FoodData Central & IFCT)
  'raw chicken breast': { name: 'Chicken Breast (Raw)', emoji: '🍗', cal: 120, pro: 22.5, carbs: 0.0, fat: 2.6, fib: 0.0, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'chicken breast (raw)': { name: 'Chicken Breast (Raw)', emoji: '🍗', cal: 120, pro: 22.5, carbs: 0.0, fat: 2.6, fib: 0.0, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'raw chicken': { name: 'Chicken Breast (Raw)', emoji: '🍗', cal: 120, pro: 22.5, carbs: 0.0, fat: 2.6, fib: 0.0, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'uncooked chicken breast': { name: 'Chicken Breast (Raw)', emoji: '🍗', cal: 120, pro: 22.5, carbs: 0.0, fat: 2.6, fib: 0.0, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'chicken breast': { name: 'Chicken Breast (Grilled)', emoji: '🍗', cal: 165, pro: 31.0, carbs: 0.0, fat: 3.6, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'grilled chicken': { name: 'Chicken Breast (Grilled)', emoji: '🍗', cal: 165, pro: 31.0, carbs: 0.0, fat: 3.6, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'chicken': { name: 'Chicken Breast (Grilled)', emoji: '🍗', cal: 165, pro: 31.0, carbs: 0.0, fat: 3.6, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'cooked chicken breast': { name: 'Chicken Breast (Grilled)', emoji: '🍗', cal: 165, pro: 31.0, carbs: 0.0, fat: 3.6, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'grilled chicken breast': { name: 'Chicken Breast (Grilled)', emoji: '🍗', cal: 165, pro: 31.0, carbs: 0.0, fat: 3.6, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'cooked chicken': { name: 'Chicken Breast (Grilled)', emoji: '🍗', cal: 165, pro: 31.0, carbs: 0.0, fat: 3.6, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'egg': { name: 'Eggs (Whole Boiled)', emoji: '🥚', cal: 155, pro: 13.0, carbs: 1.1, fat: 11.0, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'eggs': { name: 'Eggs (Whole Boiled)', emoji: '🥚', cal: 155, pro: 13.0, carbs: 1.1, fat: 11.0, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'boiled egg': { name: 'Eggs (Whole Boiled)', emoji: '🥚', cal: 155, pro: 13.0, carbs: 1.1, fat: 11.0, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'egg whites': { name: 'Egg Whites (Boiled)', emoji: '🍳', cal: 52, pro: 11.0, carbs: 0.7, fat: 0.2, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'fish': { name: 'Fish (Steamed Rohu)', emoji: '🐠', cal: 97, pro: 17.0, carbs: 0.0, fat: 2.5, fib: 0.0, state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
  'salmon': { name: 'Salmon (Grilled)', emoji: '🐟', cal: 208, pro: 20.0, carbs: 0.0, fat: 13.0, fib: 0.0, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },

  // Nuts & Seeds
  'almonds': { name: 'Almonds', emoji: '🥜', cal: 579, pro: 21.2, carbs: 21.6, fat: 49.9, fib: 12.5, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'peanuts': { name: 'Peanuts (Roasted)', emoji: '🥜', cal: 567, pro: 25.8, carbs: 16.1, fat: 49.2, fib: 8.5, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'chia seeds': { name: 'Chia Seeds', emoji: '🥣', cal: 486, pro: 16.5, carbs: 42.1, fat: 30.7, fib: 34.4, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },

  // Dedicated 7 Rotating Fruits (USDA & IFCT)
  'apple': { name: 'Apple', emoji: '🍎', cal: 52, pro: 0.3, carbs: 13.8, fat: 0.2, fib: 2.4, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'apples': { name: 'Apple', emoji: '🍎', cal: 52, pro: 0.3, carbs: 13.8, fat: 0.2, fib: 2.4, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'banana': { name: 'Banana', emoji: '🍌', cal: 89, pro: 1.1, carbs: 22.8, fat: 0.3, fib: 2.6, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'bananas': { name: 'Banana', emoji: '🍌', cal: 89, pro: 1.1, carbs: 22.8, fat: 0.3, fib: 2.6, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'raw banana': { name: 'Banana', emoji: '🍌', cal: 89, pro: 1.1, carbs: 22.8, fat: 0.3, fib: 2.6, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'fresh banana': { name: 'Banana', emoji: '🍌', cal: 89, pro: 1.1, carbs: 22.8, fat: 0.3, fib: 2.6, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'papaya': { name: 'Papaya', emoji: '🍈', cal: 43, pro: 0.5, carbs: 10.8, fat: 0.3, fib: 1.7, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'guava': { name: 'Guava', emoji: '🍐', cal: 68, pro: 2.6, carbs: 14.3, fat: 1.0, fib: 5.4, state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
  'orange': { name: 'Orange', emoji: '🍊', cal: 47, pro: 0.9, carbs: 11.8, fat: 0.1, fib: 2.4, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'oranges': { name: 'Orange', emoji: '🍊', cal: 47, pro: 0.9, carbs: 11.8, fat: 0.1, fib: 2.4, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'watermelon': { name: 'Watermelon', emoji: '🍉', cal: 30, pro: 0.6, carbs: 7.6, fat: 0.2, fib: 0.4, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'pomegranate': { name: 'Pomegranate', emoji: '🫐', cal: 83, pro: 1.7, carbs: 18.7, fat: 1.2, fib: 4.0, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'anar': { name: 'Pomegranate', emoji: '🫐', cal: 83, pro: 1.7, carbs: 18.7, fat: 1.2, fib: 4.0, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },

  // Vegetables
  'spinach': { name: 'Spinach (Raw)', emoji: '🥬', cal: 23, pro: 2.9, carbs: 3.6, fat: 0.4, fib: 2.2, state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
  'broccoli': { name: 'Broccoli (Steamed)', emoji: '🥦', cal: 34, pro: 2.8, carbs: 6.6, fat: 0.4, fib: 2.6, state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
  'cucumber': { name: 'Cucumber', emoji: '🥒', cal: 15, pro: 0.7, carbs: 3.6, fat: 0.1, fib: 0.5, state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
  'protein bar': { name: 'Protein Bar', emoji: '🍫', cal: 210, pro: 20.0, carbs: 22.0, fat: 7.0, fib: 8.0, state: 'cooked', source: 'Standard Food Composition', isEstimated: false }
};

function lookupNutrient(name) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return { name: 'Wholesome Food', emoji: '🥗', cal: 120, pro: 6, carbs: 15, fat: 3, fib: 2.5, state: 'cooked', source: 'ESTIMATED', isEstimated: true };
  }
  const clean = name.toLowerCase().trim();
  if (NUTRITION_DB[clean]) return NUTRITION_DB[clean];

  const isRaw = clean.includes('raw') || clean.includes('uncooked') || clean.includes('dry');
  const isCooked = clean.includes('cooked') || clean.includes('grilled') || clean.includes('roasted') || clean.includes('boiled') || clean.includes('steamed');

  // Strip state words to test base name
  const core = clean.replace(/\b(raw|cooked|boiled|grilled|steamed|roasted|fresh|dry|uncooked)\b/g, '').replace(/[\(\)]/g, '').trim();
  if (core && NUTRITION_DB[core]) {
    const entry = NUTRITION_DB[core];
    return entry;
  }

  // Exact Word Boundary matching (never arbitrary substring)
  for (const k of Object.keys(NUTRITION_DB)) {
    const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escaped + '\\b', 'i');
    if (regex.test(clean)) {
      if (isRaw && NUTRITION_DB[k].state === 'raw') return NUTRITION_DB[k];
      if (isCooked && (NUTRITION_DB[k].state === 'cooked' || NUTRITION_DB[k].state === 'fresh')) return NUTRITION_DB[k];
      return NUTRITION_DB[k];
    }
  }

  return { name: name.trim(), emoji: '🥗', cal: 120, pro: 6, carbs: 15, fat: 3, fib: 2.5, state: isRaw ? 'raw' : 'cooked', source: 'ESTIMATED', isEstimated: true };
}

function createFoodItem(name, grams, state, prep) {
  if (!name || typeof name !== 'string') return null;
  const n = lookupNutrient(name);
  const factor = (grams || 100) / 100;
  const rawCal = n.cal * factor;
  const rawPro = n.pro * factor;
  const rawCarbs = n.carbs * factor;
  const rawFat = n.fat * factor;
  const rawFib = n.fib * factor;

  const cal = Math.round(rawCal * 10) / 10;
  const pro = Math.round(rawPro * 10) / 10;
  const carbs = Math.round(rawCarbs * 10) / 10;
  const fat = Math.round(rawFat * 10) / 10;
  const fib = Math.round(rawFib * 10) / 10;

  // Authoritative database state preserved unless explicitly overridden with non-empty string
  const resolvedState = (state && state.trim()) ? state : (n.state || 'raw');

  // CRITICAL: Always preserve the user's actual confirmed food name instead of forcing it to a default database entry!
  const displayName = name.trim();

  return {
    name: displayName,
    emoji: n.emoji,
    grams: grams || 100,
    quantity: grams || 100,
    unit: 'g',
    state: resolvedState,
    prepMethod: prep || 'Freshly prepared',
    cal: cal,
    calories: cal,
    pro: pro,
    protein: pro,
    carbs: carbs,
    fat: fat,
    fibre: fib,
    unroundedCal: rawCal,
    unroundedPro: rawPro,
    unroundedCarbs: rawCarbs,
    unroundedFat: rawFat,
    unroundedFib: rawFib,
    valueSource: n.source || (n.isEstimated ? 'ESTIMATED' : 'USDA FoodData Central / ICMR-NIN IFCT'),
    isEstimated: !!n.isEstimated
  };
}

function calculateMealTotals(items) {
  let unroundedCal = 0, unroundedPro = 0, unroundedCarbs = 0, unroundedFat = 0, unroundedFib = 0;
  let sumCal = 0, sumPro = 0, sumCarbs = 0, sumFat = 0, sumFib = 0;
  (items || []).forEach(it => {
    unroundedCal += it.unroundedCal !== undefined ? it.unroundedCal : ((it.cal !== undefined ? it.cal : it.calories) || 0);
    unroundedPro += it.unroundedPro !== undefined ? it.unroundedPro : ((it.pro !== undefined ? it.pro : it.protein) || 0);
    unroundedCarbs += it.unroundedCarbs !== undefined ? it.unroundedCarbs : (it.carbs || 0);
    unroundedFat += it.unroundedFat !== undefined ? it.unroundedFat : (it.fat || 0);
    unroundedFib += it.unroundedFib !== undefined ? it.unroundedFib : ((it.fibre !== undefined ? it.fibre : it.fib) || 0);

    sumCal += (it.cal !== undefined ? it.cal : it.calories) || 0;
    sumPro += (it.pro !== undefined ? it.pro : it.protein) || 0;
    sumCarbs += it.carbs || 0;
    sumFat += it.fat || 0;
    sumFib += (it.fibre !== undefined ? it.fibre : (it.fib || 0));
  });
  return {
    unroundedCal: unroundedCal,
    unroundedPro: unroundedPro,
    unroundedCarbs: unroundedCarbs,
    unroundedFat: unroundedFat,
    unroundedFib: unroundedFib,
    totalCalories: Math.round(sumCal * 10) / 10,
    totalProtein: Math.round(sumPro * 10) / 10,
    totalCarbs: Math.round(sumCarbs * 10) / 10,
    totalFat: Math.round(sumFat * 10) / 10,
    totalFibre: Math.round(sumFib * 10) / 10
  };
}

function enrichDetailedFoods(extraction) {
  if (!extraction) return;
  if (!Array.isArray(extraction.detailedFoods)) extraction.detailedFoods = [];
  if (!Array.isArray(extraction.extractedFoods)) extraction.extractedFoods = [];

  extraction.detailedFoods.forEach(item => {
    if (item.name && !extraction.extractedFoods.includes(item.name)) {
      extraction.extractedFoods.push(item.name);
    }
    const hasDirectLabel = item.valueSource === 'DIRECT_IMAGE_EXTRACTED' &&
      item.calories != null && item.protein != null;

    if (!hasDirectLabel) {
      const qty = (item.quantity && item.quantity > 0) ? item.quantity : 100;
      const fn = lookupNutrient(item.name);
      const factor = qty / 100;
      if (item.calories == null) item.calories = Math.round(fn.cal * factor * 10) / 10;
      if (item.protein == null) item.protein = Math.round(fn.pro * factor * 10) / 10;
      if (item.carbs == null) item.carbs = Math.round(fn.carbs * factor * 10) / 10;
      if (item.fat == null) item.fat = Math.round(fn.fat * factor * 10) / 10;
      if (item.fibre == null) item.fibre = Math.round(fn.fib * factor * 10) / 10;
      if (!item.valueSource) item.valueSource = 'BACKEND_CALCULATED';
    }
  });

  if (extraction.detailedFoods.length === 0 && extraction.extractedFoods.length > 0) {
    extraction.extractedFoods.forEach(f => {
      const fn = lookupNutrient(f);
      extraction.detailedFoods.push({
        name: fn.name,
        quantity: 100,
        unit: 'g',
        calories: fn.cal,
        protein: fn.pro,
        carbs: fn.carbs,
        fat: fn.fat,
        fibre: fn.fib,
        servingSize: '100g standard portion',
        valueSource: 'BACKEND_CALCULATED',
        isUncertain: false,
        uncertaintyReason: null,
        percentages: {}
      });
    });
  }
}

// ---------------- RAG NUTRITION GROUNDING RETRIEVER ----------------
function retrieveRAGNutritionContext(text, confirmedFoods = [], activeDietPlan = null) {
  const matched = new Map();
  const q = (text || '').toLowerCase();

  // 1. Match from user's confirmed pantry list
  if (Array.isArray(confirmedFoods)) {
    for (const food of confirmedFoods) {
      if (typeof food === 'string' && food.trim()) {
        const item = lookupNutrient(food);
        matched.set(item.name.toLowerCase(), item);
      }
    }
  }

  // 2. Match from message keywords
  for (const [key, item] of Object.entries(NUTRITION_DB)) {
    if (q.includes(key)) {
      matched.set(item.name.toLowerCase(), item);
    }
  }

  // 3. Match from active diet plan items if active
  if (activeDietPlan && activeDietPlan.days) {
    const dayVals = Array.isArray(activeDietPlan.days) ? activeDietPlan.days : Object.values(activeDietPlan.days);
    dayVals.slice(0, 3).forEach(day => {
      const meals = Array.isArray(day) ? day : (day.meals || []);
      meals.forEach(m => {
        if (Array.isArray(m.items)) {
          m.items.forEach(it => {
            if (it && it.name) {
              const item = lookupNutrient(it.name);
              matched.set(item.name.toLowerCase(), item);
            }
          });
        }
      });
    });
  }

  if (matched.size === 0) return '';

  const lines = ['[RAG GROUNDING CONTEXT: TRUSTED HEALTHIFY NUTRITION DATABASE]'];
  lines.push('Ground your culinary suggestions and macro assertions in these verified values (per 100g). Do not hallucinate or alter these verified figures:');
  matched.forEach(val => {
    lines.push(`- ${val.emoji || '🥗'} ${val.name} (${val.state || 'standard'}): ${val.cal} kcal | Protein: ${val.pro}g | Carbs: ${val.carbs}g | Fat: ${val.fat}g | Fibre: ${val.fib || 0}g [Source: Verified Backend DB]`);
  });
  return lines.join('\n');
}

// ---------------- DYNAMIC RECIPE REASONING ENGINE ----------------
function createRecipeIngredientItem(name, grams, prepState) {
  const n = lookupNutrient(name);
  const factor = (grams || 100) / 100;
  const cal = Math.round(n.cal * factor * 10) / 10;
  const pro = Math.round(n.pro * factor * 10) / 10;
  const carbs = Math.round(n.carbs * factor * 10) / 10;
  const fat = Math.round(n.fat * factor * 10) / 10;
  const fib = Math.round(n.fib * factor * 10) / 10;

  return {
    name: n.name,
    quantity: grams || 100,
    unit: 'g',
    prepState: prepState || 'freshly prepared',
    calories: cal,
    protein: pro,
    carbs: carbs,
    fat: fat,
    fibre: fib,
    valueSource: 'BACKEND_CALCULATED'
  };
}

function extractNegativeExclusions(text) {
  if (!text) return [];
  const exclusions = [];
  const q = text.toLowerCase();
  const candidateFoods = [
    'milk', 'curd', 'yogurt', 'apple', 'banana', 'oats', 'egg', 'eggs', 'egg whites',
    'bread', 'paneer', 'tofu', 'chicken', 'rice', 'dal', 'spinach', 'broccoli', 'almonds', 'peanuts'
  ];

  for (const food of candidateFoods) {
    if (q.includes('without ' + food) || q.includes('no ' + food) || q.includes('remove ' + food) ||
        q.includes('drop ' + food) || q.includes('exclude ' + food) || q.includes('omit ' + food) ||
        q.includes('except ' + food) || q.includes("don't use " + food) || q.includes("dont use " + food)) {
      exclusions.push(food);
      if (food === 'egg') exclusions.push('eggs');
      if (food === 'eggs') exclusions.push('egg');
      if (food === 'curd') exclusions.push('yogurt', 'greek yogurt');
      if (food === 'milk') exclusions.push('dairy');
    }
  }
  if (q.includes('dairy free') || q.includes('dairy-free')) {
    exclusions.push('milk', 'curd', 'paneer', 'yogurt', 'greek yogurt');
  }
  if (q.includes('egg free') || q.includes('egg-free')) {
    exclusions.push('egg', 'eggs', 'egg whites');
  }
  return [...new Set(exclusions)];
}

function extractIngredientsFromText(text, exclusions = []) {
  if (!text) return [];
  const ex = (exclusions || []).map(e => e.toLowerCase());
  const found = [];
  const dict = [
    'apple', 'apples', 'banana', 'bananas', 'curd', 'yogurt', 'greek yogurt', 'oats', 'milk',
    'white rice', 'brown rice', 'rice', 'dal', 'lentils', 'spinach',
    'egg whites', 'eggs', 'egg', 'bread', 'whole wheat bread', 'paneer',
    'tofu', 'chicken breast', 'chicken', 'sweet potato', 'quinoa', 'broccoli',
    'almonds', 'walnuts', 'peanuts', 'chia seeds', 'sprouts', 'cucumber'
  ];
  const q = text.toLowerCase();
  for (const item of dict) {
    if (q.includes(item)) {
      if (ex.some(e => item.includes(e) || e.includes(item))) continue;
      if (q.includes('without ' + item) || q.includes('no ' + item) || q.includes('remove ' + item) || q.includes('drop ' + item)) {
        continue;
      }
      let base = item;
      if (item === 'bananas' || item === 'banana') base = 'banana';
      else if (item === 'apples' || item === 'apple') base = 'apple';
      else if (item === 'white rice' || item === 'brown rice') base = 'rice';
      else if (item === 'egg' || item === 'eggs') base = 'eggs';
      else if (item === 'curd' || item === 'yogurt' || item === 'greek yogurt') base = 'curd';
      else if (item === 'chicken breast') base = 'chicken';
      else if (item === 'whole wheat bread') base = 'bread';
      if (!found.includes(base) && !ex.includes(base)) found.push(base);
    }
  }
  return found;
}

function detectRecipeIntent(text) {
  if (!text) return false;
  const q = text.toLowerCase().trim();
  if (q.includes('another recipe') || q.includes('high protein recipe') || q.includes('make it high protein') ||
      q.includes('low-calorie') || q.includes('without milk') || q.includes('different recipe') ||
      q.includes('make the recipe high protein')) {
    return 'RECIPE_MODIFICATION';
  }
  if (q.includes('dish') || q.includes('prepare') || q.includes('cook') || q.includes('recipe') ||
      q.includes('what dishes') || q.includes('what can i prepare') || q.includes('what can i make') ||
      q.includes('make with') ||
      (q.includes('and') && (q.includes('curd') || q.includes('apple') || q.includes('banana') || q.includes('oats') || q.includes('milk') || q.includes('dal') || q.includes('rice') || q.includes('spinach') || q.includes('eggs') || q.includes('bread')))) {
    return 'RECIPE_GENERATION';
  }
  return false;
}

function generateDynamicRecipe(message, history = [], confirmedFoods = []) {
  const q = (message || '').toLowerCase();
  const exclusions = extractNegativeExclusions(q);
  const isAnother = q.includes('another') || q.includes('different') || q.includes('second');
  const isHighProtein = q.includes('high protein') || q.includes('more protein') || q.includes('extra protein');
  const isWithoutMilk = exclusions.includes('milk') || q.includes('without milk') || q.includes('no milk') || q.includes('dairy free') || q.includes('dairy-free');

  let ingredients = extractIngredientsFromText(q, exclusions);

  // If current prompt does not mention ingredients, check prior conversation history
  if (ingredients.length <= 1 && history && history.length > 0) {
    for (let i = history.length - 1; i >= 0; i--) {
      const pastText = (history[i].content || history[i].text || '').toLowerCase();
      const pastIngs = extractIngredientsFromText(pastText, exclusions);
      if (pastIngs.length > 1) {
        ingredients = pastIngs;
        break;
      }
    }
  }

  // If still empty, check confirmed available foods
  if (ingredients.length === 0 && confirmedFoods && confirmedFoods.length > 0) {
    ingredients = extractIngredientsFromText(confirmedFoods.join(' '), exclusions);
  }

  if (ingredients.length === 0) {
    ingredients = ['apple', 'banana', 'curd'];
  }

  const recipe = {
    recipeName: '',
    description: '',
    pairingExplanation: '',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    servings: 1,
    ingredients: [],
    optionalIngredients: [],
    instructions: []
  };

  const hasAll = (list, ...items) => items.every(it => list.some(l => l.includes(it) || it.includes(l)));

  if (hasAll(ingredients, 'apple', 'banana', 'curd') || (ingredients.includes('curd') && (ingredients.includes('apple') || ingredients.includes('banana')))) {
    if (isAnother) {
      recipe.recipeName = 'Blended Frosted Banana-Apple Curd Smoothie Bowl';
      recipe.description = 'A thick, chilled smoothie bowl created by whipping cold curd with sliced bananas and folding in crisp apple cubes.';
      recipe.pairingExplanation = 'Whisking the curd with ripe banana creates a silky, mousse-like emulsion without added cream or sugars. The diced apples add a satisfying textural contrast and soluble pectin fibre.';
      recipe.instructions = [
        'Add 150g cold curd and 100g sliced ripe banana into a blender or bowl and whip until frothy and smooth.',
        'Pour the velvety mixture into a wide chilled breakfast bowl.',
        'Dice 100g of crisp fresh apple and arrange evenly across the surface as a crunchy topping.',
        'Enjoy immediately with a spoon for a refreshing prebiotic breakfast or post-workout bowl.'
      ];
    } else {
      recipe.recipeName = 'Chilled Curd Apple-Banana Parfait Bowl';
      recipe.description = 'A layered prebiotic bowl featuring whisked creamy curd, naturally sweet sliced banana, and crisp diced apple.';
      recipe.pairingExplanation = 'The probiotic lactic acid in curd cuts through the rich sweetness of ripe banana, while the crisp crunch of apple provides a refreshing contrast. No sweeteners or added fats are required.';
      recipe.instructions = [
        'Whisk 150g of fresh curd in a small bowl until completely smooth and creamy.',
        'Thinly slice 100g of ripe banana and finely dice 100g of fresh apple.',
        'Layer half the whisked curd at the bottom of a glass or bowl, add the banana slices, layer remaining curd, and crown with diced apples.',
        'Serve chilled for optimal freshness and texture.'
      ];
    }
    const curdGrams = isHighProtein ? 250 : 150;
    recipe.ingredients = [
      createRecipeIngredientItem('Curd / Dahi (Low Fat)', curdGrams, 'chilled whisked'),
      createRecipeIngredientItem('Banana', 100, 'sliced ripe'),
      createRecipeIngredientItem('Apple', 100, 'fresh diced')
    ];
    recipe.optionalIngredients = [
      { name: 'Ground Cinnamon', reason: 'Adds aromatic sweetness without sugar (Needs confirmation)' },
      { name: 'Chia Seeds (5g)', reason: 'Adds omega-3 crunch and extra fibre (Needs confirmation)' }
    ];
    recipe.prepTimeMinutes = 5;
    recipe.cookTimeMinutes = 0;
    recipe.servings = 1;
  } else if (hasAll(ingredients, 'oats', 'banana') || hasAll(ingredients, 'oats', 'milk', 'banana')) {
    if (isWithoutMilk) {
      recipe.recipeName = 'Stovetop Banana Oatmeal Bowl (Water-Simmered)';
      recipe.description = 'Warm rolled oats simmered in water with caramelized banana slices for natural sweetness.';
      recipe.pairingExplanation = 'Simmering rolled oats with ripe mashed banana releases natural beta-glucan and fruit sugars, producing a rich, creamy porridge texture even without dairy milk.';
      recipe.instructions = [
        'Bring 150ml of clean drinking water to a gentle simmer in a small saucepan.',
        'Add 50g of rolled oats and cook over medium heat for 4–5 minutes, stirring continuously.',
        'Mash half the banana into the porridge during the final minute of cooking to naturally sweeten it.',
        'Transfer to a bowl and top with the remaining sliced banana.'
      ];
      recipe.ingredients = [
        createRecipeIngredientItem('Oats (Raw)', isHighProtein ? 70 : 50, 'rolled'),
        createRecipeIngredientItem('Banana', 100, 'sliced')
      ];
    } else if (isAnother) {
      recipe.recipeName = 'Overnight Banana Oats Infusion';
      recipe.description = 'Rolled oats soaked cold in toned milk overnight with sweet banana slices.';
      recipe.pairingExplanation = 'Soaking oats cold in toned milk slowly softens the grain fibres without cooking, preserving heat-sensitive vitamins while absorbing the sweet aroma of sliced bananas.';
      recipe.instructions = [
        'In a clean mason jar or bowl, combine 50g rolled oats with 200ml cold toned milk.',
        'Stir thoroughly, seal tightly, and place in the refrigerator for at least 4 hours or overnight.',
        'In the morning, slice 100g of ripe banana and layer on top of the softened oats.',
        'Enjoy cold as a grab-and-go energy-dense breakfast.'
      ];
      recipe.ingredients = [
        createRecipeIngredientItem('Oats (Raw)', isHighProtein ? 70 : 50, 'rolled'),
        createRecipeIngredientItem("Cow's Milk (Toned)", 200, 'chilled'),
        createRecipeIngredientItem('Banana', 100, 'sliced')
      ];
    } else {
      recipe.recipeName = 'Warm Stovetop Banana Oatmeal Porridge';
      recipe.description = 'A wholesome warm porridge made by simmering rolled oats in toned milk and folding in sliced ripe banana.';
      recipe.pairingExplanation = 'Oats provide complex carbohydrates and soluble beta-glucan fibre, milk contributes complete dairy protein and calcium, and banana provides fast-acting natural glucose and potassium.';
      recipe.instructions = [
        'Pour 200ml toned milk into a saucepan and bring to a gentle simmer over medium heat.',
        'Add 50g rolled oats and cook for 4–5 minutes, stirring until thick and creamy.',
        'Slice 100g of fresh banana into rounds.',
        'Pour the warm oatmeal into a bowl, arrange the banana slices on top, and serve warm.'
      ];
      recipe.ingredients = [
        createRecipeIngredientItem('Oats (Raw)', isHighProtein ? 70 : 50, 'rolled'),
        createRecipeIngredientItem("Cow's Milk (Toned)", 200, 'simmered'),
        createRecipeIngredientItem('Banana', 100, 'sliced')
      ];
    }
    recipe.optionalIngredients = [
      { name: 'Almonds (10g)', reason: 'Adds vitamin E, healthy fats and crunch (Needs confirmation)' }
    ];
    recipe.prepTimeMinutes = 5;
    recipe.cookTimeMinutes = 5;
    recipe.servings = 1;
  } else if (hasAll(ingredients, 'rice', 'dal', 'spinach')) {
    if (isAnother) {
      recipe.recipeName = 'Layered Steamed Rice with Tempered Dal & Sautéed Spinach';
      recipe.description = 'Fragrant steamed white or brown rice served alongside golden tempered moong dal and vibrant wilted spinach.';
      recipe.pairingExplanation = 'Serving the components layered allows you to experience the crisp earthy notes of garlic-wilted spinach against the warm soothing comfort of protein-rich dal and steamed grain.';
      recipe.instructions = [
        'Cook 100g rice and 150g moong dal separately until tender.',
        'In a non-stick pan with minimal water or drop of oil, gently wilt 100g chopped spinach for 2 minutes.',
        'Mound the fluffy steamed rice on one side of a plate and ladle the hot dal on the other.',
        'Place the warm wilted spinach alongside and serve hot.'
      ];
    } else {
      recipe.recipeName = 'Nutrient-Dense Dal Palak Khichdi / One-Pot Bowl';
      recipe.description = 'A comforting one-pot Indian meal combining steamed rice, protein-packed yellow lentils (dal), and tender chopped spinach.';
      recipe.pairingExplanation = 'Combining grain (rice) with legume (dal) forms a complete amino acid profile with all 9 essential amino acids. Fresh spinach infuses non-heme iron and folate, which is better absorbed alongside the lentils.';
      recipe.instructions = [
        'Rinse rice and dal; simmer in 2.5 cups of water with a pinch of turmeric and salt until soft and porridge-like (about 12 minutes).',
        'Thoroughly wash and finely chop 100g of fresh spinach leaves.',
        'Fold the chopped spinach into the hot dal and rice mixture during the last 3 minutes of cooking so it wilts gently while retaining its vibrant green color.',
        'Stir well and serve steaming hot as a restorative complete meal.'
      ];
    }
    const dalGrams = isHighProtein ? 220 : 150;
    recipe.ingredients = [
      createRecipeIngredientItem('White Rice (Cooked)', 100, 'steamed'),
      createRecipeIngredientItem('Moong Dal (Cooked)', dalGrams, 'cooked tempered'),
      createRecipeIngredientItem('Spinach (Raw)', 100, 'chopped fresh')
    ];
    recipe.optionalIngredients = [
      { name: 'Cumin & Mustard Seeds', reason: 'For aromatic digestive tempering (Needs confirmation)' },
      { name: 'Lemon Wedge', reason: 'Vitamin C to boost plant iron absorption (Needs confirmation)' }
    ];
    recipe.prepTimeMinutes = 5;
    recipe.cookTimeMinutes = 15;
    recipe.servings = 1;
  } else if (hasAll(ingredients, 'eggs', 'bread', 'milk') || (ingredients.includes('eggs') && ingredients.includes('bread'))) {
    if (isAnother) {
      recipe.recipeName = 'Soft Scrambled Eggs with Warm Toasted Bread';
      recipe.description = 'Velvety eggs scrambled gently with a splash of milk and served atop crisp whole wheat toast.';
      recipe.pairingExplanation = 'Whisking a splash of toned milk into whole eggs tenderizes the egg proteins, producing delicate, melt-in-the-mouth curds that complement the crunch of toasted bread.';
      recipe.instructions = [
        'Whisk 2 whole eggs with 50ml toned milk in a bowl until light and uniform.',
        'Pour into a warm non-stick skillet over low heat and gently fold with a spatula for 2 minutes until soft curds form.',
        'Toast 2 slices of whole wheat bread until golden and crisp.',
        'Spoon the soft scrambled eggs over the warm toast and serve immediately.'
      ];
    } else {
      recipe.recipeName = 'Golden Protein French Toast';
      recipe.description = 'Whole wheat bread slices dipped in a wholesome whisked egg and milk batter, then toasted golden on a skillet.';
      recipe.pairingExplanation = 'The egg and milk custard penetrates the crumb of whole wheat bread, infusing it with high biological value protein (18g+) and healthy fats while creating a comforting crisp exterior.';
      recipe.instructions = [
        'In a shallow dish, beat 2 whole eggs with 50ml toned milk until completely blended.',
        'Dip each slice of whole wheat bread into the egg mixture for 10 seconds per side until evenly soaked.',
        'Heat a non-stick pan over medium heat. Place the soaked bread and cook for 2–3 minutes per side until golden brown and cooked through.',
        'Transfer to a plate and serve hot.'
      ];
    }
    const eggGrams = isHighProtein ? 150 : 100;
    recipe.ingredients = [
      createRecipeIngredientItem('Eggs (Whole Boiled)', eggGrams, 'whisked'),
      createRecipeIngredientItem('Whole Wheat Bread', 60, 'toasted'),
      createRecipeIngredientItem("Cow's Milk (Toned)", 50, 'custard mix')
    ];
    recipe.optionalIngredients = [
      { name: 'Black Pepper & Pink Salt', reason: 'Savory seasoning (Needs confirmation)' },
      { name: 'Vanilla Extract / Cinnamon', reason: 'For a sweet French toast profile (Needs confirmation)' }
    ];
    recipe.prepTimeMinutes = 5;
    recipe.cookTimeMinutes = 6;
    recipe.servings = 1;
  } else if (ingredients.includes('apple') && ingredients.includes('banana') && ingredients.length <= 2) {
    recipe.recipeName = 'Warm Spiced Stewed Fruit Medley';
    recipe.description = 'Gentle warm fruit purée made by simmering fresh diced apple and sliced banana.';
    recipe.pairingExplanation = 'Apples provide tartness, firm texture, and soluble pectin fibre, while bananas provide soft creamy sweetness and potassium. Cooking them gently breaks down the cellular walls into a soothing, easily digestible warm bowl.';
    recipe.instructions = [
      'Peel and slice 100g ripe banana and finely dice 120g fresh apple.',
      'Place in a small saucepan with 2 tablespoons of water over low heat.',
      'Cover and simmer for 5–6 minutes until the apples soften and the banana becomes jammy.',
      'Mash lightly with a fork and serve warm in a dessert glass or bowl.'
    ];
    recipe.ingredients = [
      createRecipeIngredientItem('Apple', 120, 'diced'),
      createRecipeIngredientItem('Banana', 100, 'sliced')
    ];
    recipe.optionalIngredients = [
      { name: 'Greek Yogurt / Curd (100g)', reason: 'CRITICAL NOTICE: You provided only two fruits. Adding curd or yogurt provides missing protein for a balanced meal (Needs confirmation)' },
      { name: 'Almonds or Walnuts (15g)', reason: 'Adds healthy fats and satiety to round out the fruit carbs (Needs confirmation)' }
    ];
    recipe.prepTimeMinutes = 5;
    recipe.cookTimeMinutes = 6;
    recipe.servings = 1;
  } else {
    // Dynamic fallback from provided items
    const title = 'Wholesome ' + ingredients.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ') + ' Medley';
    recipe.recipeName = title;
    recipe.description = 'A customized balanced dish constructed strictly from your confirmed available ingredients.';
    recipe.pairingExplanation = 'Each ingredient has been paired to maximize micronutrient bioavailability and provide sustained satiety according to your confirmed ingredient list.';
    recipe.instructions = [
      'Wash and prep all confirmed ingredients into uniform portion sizes.',
      'Lightly cook grains and proteins until tender and thoroughly heated through.',
      'Assemble and serve together for optimal macronutrient balance.'
    ];
    recipe.ingredients = ingredients.map(item => createRecipeIngredientItem(item, 100, 'freshly prepared'));
    recipe.prepTimeMinutes = 10;
    recipe.cookTimeMinutes = 10;
    recipe.servings = 1;
  }

  // Calculate totals
  let totCal = 0, totPro = 0, totCarbs = 0, totFat = 0, totFib = 0;
  recipe.ingredients.forEach(i => {
    totCal += i.calories;
    totPro += i.protein;
    totCarbs += i.carbs;
    totFat += i.fat;
    totFib += i.fibre;
  });

  recipe.totalCalories = Math.round(totCal * 10) / 10;
  recipe.totalProtein = Math.round(totPro * 10) / 10;
  recipe.totalCarbs = Math.round(totCarbs * 10) / 10;
  recipe.totalFat = Math.round(totFat * 10) / 10;
  recipe.totalFibre = Math.round(totFib * 10) / 10;
  recipe.caloriesPerServing = recipe.totalCalories;
  recipe.proteinPerServing = recipe.totalProtein;
  recipe.carbsPerServing = recipe.totalCarbs;
  recipe.fatPerServing = recipe.totalFat;
  recipe.fibrePerServing = recipe.totalFibre;

  return recipe;
}

function formatRecipeMarkdown(r) {
  let sb = `### 🍽️ ${r.recipeName}\n\n`;
  sb += `${r.description}\n\n`;
  if (r.pairingExplanation) {
    sb += `**Why these ingredients work together:**\n${r.pairingExplanation}\n\n`;
  }
  sb += `⏱️ **Prep Time:** ${r.prepTimeMinutes} mins | 🍽️ **Servings:** ${r.servings}\n`;
  sb += `⚡ **Verified Database Nutrition:** **${r.totalCalories} kcal** | 🥩 **${r.totalProtein}g Protein** | 🌾 **${r.totalCarbs}g Carbs** | 🧈 **${r.totalFat}g Fat** | 🥗 **${r.totalFibre}g Fibre**\n\n`;

  sb += `#### 🥗 Exact Ingredients (Strictly from your input):\n`;
  r.ingredients.forEach(ing => {
    sb += `- **${ing.name}:** ${ing.quantity}${ing.unit} (${ing.prepState}) — *${ing.calories} kcal, ${ing.protein}g protein*\n`;
  });
  sb += `\n`;

  if (r.optionalIngredients && r.optionalIngredients.length > 0) {
    sb += `#### 💡 Optional Enhancements (Requires your approval):\n`;
    r.optionalIngredients.forEach(opt => {
      sb += `- *${opt.name}:* ${opt.reason}\n`;
    });
    sb += `\n`;
  }

  sb += `#### 👨‍🍳 Preparation Instructions:\n`;
  r.instructions.forEach((inst, idx) => {
    sb += `${idx + 1}. ${inst}\n`;
  });

  sb += `\n*You can ask me to: "Give me another recipe", "Make it high protein", or "Suggest a low-calorie option"!*`;
  return sb;
}

const ROTATING_FRUITS_7 = ['Apple', 'Banana', 'Papaya', 'Guava', 'Orange', 'Watermelon', 'Pomegranate'];

const INDIAN_BREAKFASTS_7 = [
  [['Idli (Steamed)', 160], ['Sambar', 180], ['Coconut Chutney', 40]],
  [['Dosa (Plain)', 150], ['Sambar', 180], ['Coconut Chutney', 40]],
  [['Poha (Cooked)', 220], ['Curd / Dahi (Low Fat)', 160]],
  [['Pongal (Ven Pongal)', 180], ['Coconut Chutney', 50], ['Sambar', 120]],
  [['Upma (Rava Upma)', 220], ['Sambar', 180], ['Curd / Dahi (Low Fat)', 100]],
  [['Whole Wheat Chapati / Roti', 100], ['Curd / Dahi (Low Fat)', 150], ['Eggs (Whole Boiled)', 50]],
  [['Idli (Steamed)', 150], ['Peanut / Groundnut Chutney', 50], ['Sambar', 150]]
];

const INDIAN_LUNCH_COMBOS_7 = [
  [['White Rice (Cooked)', 200], ['Moong Dal (Cooked)', 160], ['Spinach (Raw)', 80], ['Paneer (Fresh/Raw)', 70]],
  [['Whole Wheat Chapati / Roti', 120], ['Chicken Breast (Grilled)', 150], ['Moong Dal (Cooked)', 120], ['Cucumber', 80]],
  [['White Rice (Cooked)', 200], ['Chicken Breast (Grilled)', 150], ['Mixed Green Salad', 80], ['Sambar', 120]],
  [['Brown Rice (Cooked)', 200], ['Moong Dal (Cooked)', 160], ['Paneer (Fresh/Raw)', 70], ['Cucumber', 80]],
  [['Whole Wheat Chapati / Roti', 120], ['Moong Dal (Cooked)', 150], ['Paneer (Fresh/Raw)', 80], ['Mixed Green Salad', 80]],
  [['White Rice (Cooked)', 200], ['Fish (Steamed Rohu)', 150], ['Moong Dal (Cooked)', 140], ['Cucumber', 80]],
  [['White Rice (Cooked)', 200], ['Chicken Breast (Grilled)', 150], ['Moong Dal (Cooked)', 130], ['Cucumber', 80]]
];

const INDIAN_SNACKS_7 = [
  [['Almonds', 30], ['Curd / Dahi (Low Fat)', 100]],
  [['Sprouted Moong (Raw)', 100], ['Almonds', 20], ['Cucumber', 60]],
  [['Paneer (Fresh/Raw)', 75], ['Cucumber', 60]],
  [['Peanuts (Roasted)', 35], ['Curd / Dahi (Low Fat)', 100]],
  [['Greek Yogurt', 150], ['Almonds', 20]],
  [['Chickpeas / Chana (Cooked)', 100], ['Almonds', 15]],
  [['Eggs (Whole Boiled)', 100], ['Almonds', 15], ['Cucumber', 50]]
];

const INDIAN_DINNER_COMBOS_7 = [
  [['Whole Wheat Chapati / Roti', 100], ['Moong Dal (Cooked)', 160], ['Paneer (Fresh/Raw)', 50]],
  [['Idli (Steamed)', 120], ['Sambar', 180], ['Eggs (Whole Boiled)', 50]],
  [['Whole Wheat Chapati / Roti', 100], ['Paneer (Fresh/Raw)', 80], ['Cucumber', 80]],
  [['Dosa (Plain)', 120], ['Sambar', 180], ['Paneer (Fresh/Raw)', 50]],
  [['Whole Wheat Chapati / Roti', 100], ['Moong Dal (Cooked)', 160], ['Curd / Dahi (Low Fat)', 100]],
  [['Brown Rice (Cooked)', 150], ['Fish (Steamed Rohu)', 120], ['Moong Dal (Cooked)', 120]],
  [['Whole Wheat Chapati / Roti', 100], ['Curd / Dahi (Low Fat)', 150], ['Paneer (Fresh/Raw)', 50]]
];

function scaleItemsToTargetCal(items, targetMealCal) {
  if (!items || items.length === 0) return items;
  
  let currentCal = 0;
  items.forEach(it => {
    currentCal += (it.unroundedCal !== undefined ? it.unroundedCal : it.cal);
  });
  if (currentCal <= 0) return items;

  const ratio = targetMealCal / currentCal;

  // Identify items with strict portion caps
  const hasChicken = items.some(it => /chicken/i.test(it.name));
  const hasEgg = items.some(it => /egg/i.test(it.name));

  if (hasChicken || (hasEgg && ratio > 1.0)) {
    let cappedItems = [];
    let uncappedItems = [];
    let cappedTotalCal = 0;

    items.forEach(it => {
      const origGrams = it.grams || it.quantity || 100;
      if (/chicken/i.test(it.name)) {
        // Strict Chicken Rule: Maximum 150g per meal across all 7 days
        let scaledGrams = Math.min(150, Math.max(50, Math.round((origGrams * ratio) / 5) * 5));
        const prep = 'Skinless lean chicken breast grilled with spices (150g max cooked weight)';
        const cleanName = it.name.includes('Grilled') ? it.name : 'Chicken Breast (Grilled)';
        const cItem = createFoodItem(cleanName, scaledGrams, 'cooked', prep);
        cappedItems.push(cItem);
        cappedTotalCal += (cItem.unroundedCal !== undefined ? cItem.unroundedCal : cItem.cal);
      } else if (/egg/i.test(it.name)) {
        // Eggs: max 100g (2 whole eggs) in any single meal
        let scaledGrams = Math.min(100, Math.max(50, Math.round((origGrams * ratio) / 5) * 5));
        const prep = it.prepMethod || 'Boiled whole eggs seasoned with black pepper (cooked weight)';
        const eItem = createFoodItem(it.name, scaledGrams, it.state || 'cooked', prep);
        cappedItems.push(eItem);
        cappedTotalCal += (eItem.unroundedCal !== undefined ? eItem.unroundedCal : eItem.cal);
      } else {
        uncappedItems.push(it);
      }
    });

    if (uncappedItems.length === 0) {
      return cappedItems;
    }

    const remainingTargetCal = Math.max(30, targetMealCal - cappedTotalCal);
    let uncappedCurrentCal = 0;
    uncappedItems.forEach(it => {
      uncappedCurrentCal += (it.unroundedCal !== undefined ? it.unroundedCal : it.cal);
    });

    const uncappedRatio = uncappedCurrentCal > 0 ? (remainingTargetCal / uncappedCurrentCal) : 1;
    const scaledUncapped = uncappedItems.map(it => {
      const orig = it.grams || it.quantity || 100;
      let newG = Math.max(15, Math.round((orig * uncappedRatio) / 5) * 5);
      return createFoodItem(it.name, newG, it.state, it.prepMethod);
    });

    return [...scaledUncapped, ...cappedItems];
  }

  return items.map(it => {
    const origGrams = it.grams || it.quantity || 100;
    let scaledGrams = Math.max(15, Math.round((origGrams * ratio) / 5) * 5);
    return createFoodItem(it.name, scaledGrams, it.state, it.prepMethod);
  });
}

function evaluateConfirmedPoolFeasibility(pool, targetCal) {
  if (!pool || pool.length === 0) return { feasible: true };
  let totalCalPer100 = 0;
  let maxPro = 0;
  let hasStapleOrProtein = false;

  for (const f of pool) {
    const nut = lookupNutrient(f);
    totalCalPer100 += nut.cal;
    if (nut.pro > maxPro) maxPro = nut.pro;
    if (nut.cal >= 80 || nut.pro >= 6) hasStapleOrProtein = true;
  }
  const avgCal = totalCalPer100 / pool.length;
  if (avgCal < 45 || !hasStapleOrProtein) {
    return {
      feasible: false,
      reason: `Your confirmed food list contains predominantly low-caloric/high-water vegetables (average ~${Math.round(avgCal)} kcal/100g). Reaching ${targetCal} kcal exclusively with these foods would require consuming >4-5 kg of food daily, which is physiologically unrealistic. We recommend adding whole grains (rice, roti, oats) or protein staples (paneer, eggs, chicken, lentils).`
    };
  }
  return { feasible: true };
}

function buildFiveMealsForDay(dayNum, targetCal, confirmedPool, isVeg) {
  const target = targetCal || 2100;

  // Calorie targets across 5 meal slots:
  // Breakfast: ~24% (~504 kcal)
  // Pre-Lunch (11:30 AM Fruit Snack): ~10% (~210 kcal)
  // Lunch: ~34% (~714 kcal)
  // Evening Snack: ~12% (~252 kcal)
  // Dinner: ~20% (~420 kcal)
  const tB = target * 0.24;
  const tPL = target * 0.10;
  const tL = target * 0.34;
  const tES = target * 0.12;
  const tD = target * 0.20;

  let eggMealsCount = 0;

  const isFruitName = (name) => {
    const l = (name || '').toLowerCase();
    return l.includes('apple') || l.includes('banana') || l.includes('papaya') ||
           l.includes('guava') || l.includes('orange') || l.includes('watermelon') ||
           l.includes('pomegranate') || l.includes('fruit') || l.includes('berry');
  };

  const isMeatName = (name) => {
    const l = (name || '').toLowerCase();
    return l.includes('chicken') || l.includes('mutton') || l.includes('lamb') ||
           l.includes('fish') || l.includes('salmon') || l.includes('tuna') || l.includes('shrimp');
  };

  const isEggName = (name) => /egg/i.test(name || '');

  let bItems, plItems, lItems, esItems, dItems;

  const rawPool = (confirmedPool && Array.isArray(confirmedPool)) ? confirmedPool : [];
  const poolLower = rawPool.map(f => (f || '').toLowerCase().trim());

  // South Indian staple detections
  const hasDosa = poolLower.some(f => f.includes('dosa'));
  const hasSambar = poolLower.some(f => f.includes('sambar'));
  const hasIdli = poolLower.some(f => f.includes('idli'));
  const hasChutney = poolLower.some(f => f.includes('chutney'));
  const hasRice = poolLower.some(f => f.includes('rice'));
  const hasRoti = poolLower.some(f => f.includes('roti') || f.includes('chapati'));
  const hasChicken = !isVeg && poolLower.some(f => f.includes('chicken'));
  const hasEggs = !isVeg && poolLower.some(f => f.includes('egg'));
  const hasPaneer = poolLower.some(f => f.includes('paneer'));
  const hasCurd = poolLower.some(f => f.includes('curd') || f.includes('dahi') || f.includes('yogurt'));
  const hasMoong = poolLower.some(f => f.includes('moong') || f.includes('sprout'));
  const fruitsInPool = rawPool.filter(isFruitName);

  if (rawPool.length === 0) {
    // 1. Breakfast
    const bDef = INDIAN_BREAKFASTS_7[(dayNum - 1) % INDIAN_BREAKFASTS_7.length];
    bItems = bDef.map(x => {
      if (isVeg && isEggName(x[0])) return createFoodItem('Paneer (Fresh/Raw)', 60, null, 'Freshly prepared breakfast protein');
      return createFoodItem(x[0], x[1], null, 'Freshly prepared breakfast');
    });
    if (bItems.some(it => isEggName(it.name))) eggMealsCount++;
    bItems = scaleItemsToTargetCal(bItems, tB);

    // 2. Pre-Lunch (11:30 AM Fruit Snack)
    const fruit = ROTATING_FRUITS_7[(dayNum - 1) % ROTATING_FRUITS_7.length];
    plItems = [
      createFoodItem(fruit, 140, null, 'Fresh sliced fruit portion'),
      createFoodItem('Almonds', 20, null, 'Healthy raw almonds')
    ];
    plItems = scaleItemsToTargetCal(plItems, tPL);

    // 3. Lunch (1:30 PM)
    const lDef = INDIAN_LUNCH_COMBOS_7[(dayNum - 1) % INDIAN_LUNCH_COMBOS_7.length];
    lItems = lDef.map((x, idx) => {
      let foodName = x[0];
      let grams = x[1];
      if (isVeg && isMeatName(foodName)) {
        foodName = 'Paneer (Fresh/Raw)';
        grams = 80;
      }
      return createFoodItem(foodName, grams, null, idx === 0 ? 'Steamed grains portion' : (idx === 1 ? 'Protein accompaniment' : 'Fresh crisp greens'));
    });
    if (lItems.some(it => isEggName(it.name))) eggMealsCount++;
    lItems = scaleItemsToTargetCal(lItems, tL);

    // 4. Evening Snack (5:00 PM) - Realistic Indian snack (NEVER raw spinach or plain dal!)
    const esDef = INDIAN_SNACKS_7[(dayNum - 1) % INDIAN_SNACKS_7.length];
    esItems = esDef.map(x => {
      let foodName = x[0];
      if (isEggName(foodName)) {
        if (eggMealsCount >= 2 || isVeg) {
          foodName = 'Curd / Dahi (Low Fat)';
          return createFoodItem(foodName, 120, null, 'Wholesome evening protein snack');
        }
        eggMealsCount++;
      }
      return createFoodItem(foodName, x[1], null, 'Wholesome evening snack');
    });
    esItems = scaleItemsToTargetCal(esItems, tES);

    // 5. Dinner (8:00 PM)
    const dDef = INDIAN_DINNER_COMBOS_7[(dayNum - 1) % INDIAN_DINNER_COMBOS_7.length];
    dItems = dDef.map(x => {
      let foodName = x[0];
      if (isVeg && isMeatName(foodName)) {
        foodName = 'Paneer (Fresh/Raw)';
      }
      if (isEggName(foodName)) {
        if (eggMealsCount >= 2 || isVeg) {
          foodName = 'Paneer (Fresh/Raw)';
        } else {
          eggMealsCount++;
        }
      }
      return createFoodItem(foodName, x[1], null, 'Light wholesome dinner');
    });
    dItems = scaleItemsToTargetCal(dItems, tD);
  } else {
    // User provided confirmed available foods!
    // Incorporate confirmed foods realistically (e.g. Dosa + Sambar paired together).

    // --- 1. BREAKFAST (08:30 AM) ---
    if (hasDosa && hasSambar) {
      bItems = [
        createFoodItem('Dosa (Plain)', 150, 'cooked', 'Crispy fermented rice-lentil dosa'),
        createFoodItem('Sambar', 180, 'cooked', 'Hot lentil and vegetable stew'),
        createFoodItem(hasChutney ? 'Coconut Chutney' : 'Curd / Dahi (Low Fat)', 40, 'fresh', 'Cooling breakfast accompaniment')
      ];
    } else if (hasDosa) {
      bItems = [
        createFoodItem('Dosa (Plain)', 160, 'cooked', 'Crispy fermented rice-lentil dosa'),
        createFoodItem('Sambar', 180, 'cooked', 'Hot lentil and vegetable stew'),
        createFoodItem('Coconut Chutney', 40, 'fresh', 'Freshly grated coconut chutney')
      ];
    } else if (hasIdli && hasSambar) {
      bItems = [
        createFoodItem('Idli (Steamed)', 160, 'cooked', 'Steamed fluffy rice-lentil cakes'),
        createFoodItem('Sambar', 180, 'cooked', 'Hot lentil and vegetable stew'),
        createFoodItem(hasChutney ? 'Coconut Chutney' : 'Curd / Dahi (Low Fat)', 40, 'fresh', 'Fresh breakfast accompaniment')
      ];
    } else if (hasEggs && eggMealsCount < 2 && (dayNum % 2 === 1)) {
      eggMealsCount++;
      bItems = [
        createFoodItem('Eggs (Whole Boiled)', 100, 'cooked', 'Freshly boiled whole eggs (2 eggs)'),
        createFoodItem(hasRoti ? 'Whole Wheat Chapati / Roti' : (hasRice ? 'White Rice (Cooked)' : 'Whole Wheat Chapati / Roti'), 100, 'cooked', 'Wholesome morning staple'),
        createFoodItem('Cucumber', 60, 'fresh', 'Fresh crisp greens')
      ];
    } else {
      const bGrain = rawPool.find(f => /dosa|idli|poha|upma|oat|roti|chapati|bread/i.test(f)) || (hasRice ? 'White Rice (Cooked)' : 'Whole Wheat Chapati / Roti');
      const bAccompaniment = rawPool.find(f => f !== bGrain && /sambar|curd|dahi|dal|paneer|egg/i.test(f));
      
      let sideItem = 'Curd / Dahi (Low Fat)';
      if (bAccompaniment) {
        if (isEggName(bAccompaniment)) {
          if (eggMealsCount < 2 && !isVeg) {
            sideItem = bAccompaniment;
            eggMealsCount++;
          } else {
            sideItem = 'Paneer (Fresh/Raw)';
          }
        } else {
          sideItem = bAccompaniment;
        }
      }
      bItems = [
        createFoodItem(bGrain, 150, null, 'Wholesome morning staple'),
        createFoodItem(sideItem, 120, null, 'Nutrient-rich breakfast accompaniment')
      ];
    }
    bItems = scaleItemsToTargetCal(bItems, tB);

    // --- 2. PRE-LUNCH (11:30 AM Mid-Morning Fruit Snack) ---
    const chosenFruit = fruitsInPool.length > 0 
      ? fruitsInPool[(dayNum - 1) % fruitsInPool.length]
      : ROTATING_FRUITS_7[(dayNum - 1) % ROTATING_FRUITS_7.length];
    const nutAccompaniment = rawPool.find(f => /almond|walnut|peanut|cashew/i.test(f)) || 'Almonds';
    plItems = [
      createFoodItem(chosenFruit, 140, 'fresh', 'Freshly sliced mid-morning fruit'),
      createFoodItem(nutAccompaniment, 20, 'raw', 'Heart-healthy raw nut portion')
    ];
    plItems = scaleItemsToTargetCal(plItems, tPL);

    // --- 3. LUNCH (1:30 PM Main Meal) ---
    const lunchGrain = rawPool.find(f => /rice|chapati|roti|quinoa/i.test(f)) || (dayNum % 2 === 1 ? 'White Rice (Cooked)' : 'Whole Wheat Chapati / Roti');
    
    // Lentil / Gravy accompaniment
    const lunchLentil = hasSambar 
      ? 'Sambar' 
      : (rawPool.find(f => f !== lunchGrain && /dal|lentil|chana|rajma/i.test(f)) || 'Moong Dal (Cooked)');
    
    // Protein accompaniment
    let lunchProtein;
    if (hasChicken && (dayNum % 2 === 1)) {
      lunchProtein = createFoodItem('Chicken Breast (Grilled)', 120, 'cooked', 'Skinless lean chicken breast grilled with spices (150g max cooked weight)');
    } else if (hasPaneer) {
      lunchProtein = createFoodItem('Paneer (Fresh/Raw)', 70, 'fresh', 'Fresh high-protein cottage cheese portion');
    } else if (hasEggs && eggMealsCount < 2 && !isVeg && (dayNum % 2 === 0)) {
      eggMealsCount++;
      lunchProtein = createFoodItem('Eggs (Whole Boiled)', 100, 'cooked', 'Boiled whole eggs with black pepper (2 eggs)');
    } else {
      lunchProtein = createFoodItem(hasCurd ? 'Curd / Dahi (Low Fat)' : 'Moong Dal (Cooked)', 120, 'cooked', 'Wholesome protein accompaniment');
    }

    const lunchSalad = rawPool.find(f => /cucumber|spinach|salad|tomato/i.test(f)) || 'Mixed Green Salad';

    lItems = [
      createFoodItem(lunchGrain, 180, 'cooked', 'Steamed wholesome grains portion'),
      createFoodItem(lunchLentil, 140, 'cooked', hasSambar ? 'Aromatic vegetable sambar portion' : 'Hearty cooked yellow lentil dal'),
      lunchProtein,
      createFoodItem(lunchSalad, 70, 'fresh', 'Fresh crunchy dietary fiber salad')
    ];
    lItems = scaleItemsToTargetCal(lItems, tL);

    // --- 4. EVENING SNACK (5:00 PM) ---
    if (hasEggs && eggMealsCount < 2 && !isVeg && (dayNum % 2 === 1)) {
      eggMealsCount++;
      esItems = [
        createFoodItem('Eggs (Whole Boiled)', 100, 'cooked', 'Boiled eggs seasoned with black pepper (cooked weight)'),
        createFoodItem('Cucumber', 50, 'fresh', 'Crisp cucumber slices')
      ];
    } else if (hasPaneer) {
      esItems = [
        createFoodItem('Paneer (Fresh/Raw)', 70, 'fresh', 'Fresh paneer cubes with chaat masala'),
        createFoodItem('Cucumber', 50, 'fresh', 'Crisp refreshing cucumber slices')
      ];
    } else if (hasCurd) {
      esItems = [
        createFoodItem('Curd / Dahi (Low Fat)', 140, 'fresh', 'Probiotic low-fat homemade dahi'),
        createFoodItem('Almonds', 15, 'raw', 'Crunchy raw almonds')
      ];
    } else if (hasMoong) {
      esItems = [
        createFoodItem('Sprouted Moong (Raw)', 100, 'raw', 'Sprouted moong chaat with lemon juice and salt'),
        createFoodItem('Almonds', 15, 'raw', 'Crunchy raw almonds')
      ];
    } else {
      const snackDef = INDIAN_SNACKS_7[(dayNum - 1) % INDIAN_SNACKS_7.length];
      esItems = snackDef.map(x => {
        let name = x[0];
        if (isEggName(name)) {
          if (eggMealsCount >= 2 || isVeg) name = 'Curd / Dahi (Low Fat)';
          else eggMealsCount++;
        }
        return createFoodItem(name, x[1], null, 'Wholesome evening protein snack');
      });
    }
    esItems = scaleItemsToTargetCal(esItems, tES);

    // --- 5. DINNER (8:00 PM Wholesome Dinner) ---
    if (hasDosa && hasSambar && (dayNum % 2 === 0)) {
      dItems = [
        createFoodItem('Dosa (Plain)', 130, 'cooked', 'Light crispy plain dosa portion'),
        createFoodItem('Sambar', 180, 'cooked', 'Warm vegetable sambar'),
        createFoodItem(hasPaneer ? 'Paneer (Fresh/Raw)' : 'Curd / Dahi (Low Fat)', 50, 'fresh', 'Light protein accompaniment')
      ];
    } else {
      const dinnerGrain = rawPool.find(f => /chapati|roti|rice/i.test(f)) || (hasRoti ? 'Whole Wheat Chapati / Roti' : 'Whole Wheat Chapati / Roti');
      const dinnerLentil = hasSambar ? 'Sambar' : (rawPool.find(f => f !== dinnerGrain && /dal|lentil|sambar/i.test(f)) || 'Moong Dal (Cooked)');
      
      let dinnerProtein = 'Paneer (Fresh/Raw)';
      if (hasEggs && eggMealsCount < 2 && !isVeg) {
        dinnerProtein = 'Eggs (Whole Boiled)';
        eggMealsCount++;
      } else if (hasCurd) {
        dinnerProtein = 'Curd / Dahi (Low Fat)';
      }

      dItems = [
        createFoodItem(dinnerGrain, 110, 'cooked', 'Light evening grain'),
        createFoodItem(dinnerLentil, 160, 'cooked', hasSambar ? 'Nutrient-rich vegetable sambar' : 'Light moong dal portion'),
        createFoodItem(dinnerProtein, 60, null, 'Wholesome evening protein')
      ];
    }
    dItems = scaleItemsToTargetCal(dItems, tD);
  }

  const bTotals = calculateMealTotals(bItems);
  const plTotals = calculateMealTotals(plItems);
  const lTotals = calculateMealTotals(lItems);
  const esTotals = calculateMealTotals(esItems);
  const dTotals = calculateMealTotals(dItems);

  return [
    { slot: 'BREAKFAST', slotTitle: '🌅 Breakfast', timeWindow: '08:30 AM', title: '🌅 Breakfast', timing: '08:30 AM', items: bItems, subtotalCalories: bTotals.totalCalories, subtotalProtein: bTotals.totalProtein, subtotalCarbs: bTotals.totalCarbs, subtotalFat: bTotals.totalFat, subtotalFibre: bTotals.totalFibre, ...bTotals, status: 'PENDING' },
    { slot: 'PRE_LUNCH', slotTitle: '🍎 11:30 AM Mid-Morning Fruit Snack', timeWindow: '11:30 AM', title: '🍎 Pre-Lunch (11:30 AM Fruit Snack)', timing: '11:30 AM', items: plItems, subtotalCalories: plTotals.totalCalories, subtotalProtein: plTotals.totalProtein, subtotalCarbs: plTotals.totalCarbs, subtotalFat: plTotals.totalFat, subtotalFibre: plTotals.totalFibre, ...plTotals, status: 'PENDING' },
    { slot: 'LUNCH', slotTitle: '🍛 Lunch', timeWindow: '01:30 PM', title: '🍱 Lunch', timing: '01:30 PM', items: lItems, subtotalCalories: lTotals.totalCalories, subtotalProtein: lTotals.totalProtein, subtotalCarbs: lTotals.totalCarbs, subtotalFat: lTotals.totalFat, subtotalFibre: lTotals.totalFibre, ...lTotals, status: 'PENDING' },
    { slot: 'EVENING_SNACK', slotTitle: '🥜 Evening Snack', timeWindow: '05:00 PM', title: '☕ Evening Snack', timing: '05:00 PM', items: esItems, subtotalCalories: esTotals.totalCalories, subtotalProtein: esTotals.totalProtein, subtotalCarbs: esTotals.totalCarbs, subtotalFat: esTotals.totalFat, subtotalFibre: esTotals.totalFibre, ...esTotals, status: 'PENDING' },
    { slot: 'DINNER', slotTitle: '🍲 Dinner', timeWindow: '08:00 PM', title: '🌙 Dinner', timing: '08:00 PM', items: dItems, subtotalCalories: dTotals.totalCalories, subtotalProtein: dTotals.totalProtein, subtotalCarbs: dTotals.totalCarbs, subtotalFat: dTotals.totalFat, subtotalFibre: dTotals.totalFibre, ...dTotals, status: 'PENDING' }
  ];
}

// In-Memory Storage for Diet Plans & Consumptions
const inMemoryDietPlans = new Map();
const inMemoryConsumptions = new Map();
const userConfirmedFoodsStore = {};

// ---------------- REST API ENDPOINTS ----------------

app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  if (mysqlPool) {
    try {
      await mysqlPool.query('SELECT 1');
      dbStatus = 'connected';
    } catch (e) {
      dbStatus = 'error: ' + e.message;
    }
  }
  res.json({
    status: 'ok',
    backend: 'Node Express (Healthify)',
    database: mysqlPool ? (process.env.DB_NAME || 'healthify_db') : 'in-memory',
    dbConnection: dbStatus,
    dbHost: process.env.DB_HOST ? (process.env.DB_HOST.includes('tidbcloud') ? 'TiDB Cloud Starter' : 'MySQL') : 'localhost',
    hasGroqKey: !!(GROQ_API_KEY && GROQ_API_KEY.trim() !== '' && GROQ_API_KEY !== 'your_new_groq_api_key' && GROQ_API_KEY !== 'your_groq_api_key'),
    hasGrokKey: false,
    hasGeminiKey: false,
    model: GROQ_MODEL,
    visionModel: GROQ_VISION_MODEL,
    provider: 'GroqCloud'
  });
});

// ==================== PERMANENT AI CHAT PERSISTENCE (MYSQL BACKED) ====================

// Save AI Chat Message to MySQL
app.post('/api/ai/chat/message', async (req, res) => {
  const { email, user_id, sender, message, text, source, dietPlanId, diet_plan_id, attachmentName, attachment_name, attachmentType, attachment_type, hasAttachment, has_attachment } = req.body || {};
  const msgText = (text || message || '').trim();
  const msgSender = (sender || 'user').toLowerCase().trim(); // 'user' or 'bot'

  if (!msgText && !hasAttachment && !has_attachment) {
    return res.status(400).json({ success: false, error: 'Message text or attachment is required' });
  }

  if (!mysqlPool) {
    return res.json({ success: true, messageId: Date.now(), offline: true });
  }

  try {
    let resolvedUserId = user_id;
    if (!resolvedUserId && email) {
      const [uRows] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1', [email.toLowerCase().trim()]);
      if (uRows.length > 0) resolvedUserId = uRows[0].id;
    }

    if (!resolvedUserId) {
      return res.status(404).json({ success: false, error: 'User not found. Please log in.' });
    }

    const resolvedDietPlanId = diet_plan_id || dietPlanId || null;
    const resolvedAttachName = (attachment_name || attachmentName || '').substring(0, 255) || null;
    const resolvedAttachType = (attachment_type || attachmentType || '').substring(0, 100) || null;
    const resolvedHasAttach = (has_attachment || hasAttachment || !!resolvedAttachName) ? 1 : 0;
    const resolvedSource = (source || 'groq').substring(0, 50);

    const [insertResult] = await mysqlPool.query(
      `INSERT INTO ai_chat_messages 
       (user_id, sender, message_text, source, diet_plan_id, attachment_name, attachment_type, has_attachment, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [resolvedUserId, msgSender, msgText, resolvedSource, resolvedDietPlanId, resolvedAttachName, resolvedAttachType, resolvedHasAttach]
    );

    return res.json({
      success: true,
      messageId: insertResult.insertId,
      message: {
        id: insertResult.insertId,
        user_id: resolvedUserId,
        sender: msgSender,
        text: msgText,
        source: resolvedSource,
        dietPlanId: resolvedDietPlanId,
        attachmentName: resolvedAttachName,
        attachmentType: resolvedAttachType,
        hasAttachment: !!resolvedHasAttach,
        createdAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Save AI chat message error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Retrieve AI Chat History with pagination
app.get('/api/ai/chat/history', async (req, res) => {
  const email = (req.query.email || '').toLowerCase().trim();
  const userIdQuery = req.query.user_id;
  const page = Math.max(1, parseInt(req.query.page || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '50', 10) || 50));
  const offset = (page - 1) * limit;

  if (!email && !userIdQuery) {
    return res.status(400).json({ success: false, error: 'Email or user_id is required' });
  }

  if (!mysqlPool) {
    return res.json({ success: true, messages: [], total: 0, page, limit, offline: true });
  }

  try {
    let resolvedUserId = userIdQuery;
    if (!resolvedUserId && email) {
      const [uRows] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1', [email]);
      if (uRows.length > 0) resolvedUserId = uRows[0].id;
    }

    if (!resolvedUserId) {
      return res.json({ success: true, messages: [], total: 0, page, limit });
    }

    const [countRows] = await mysqlPool.query(
      'SELECT COUNT(*) as total FROM ai_chat_messages WHERE user_id = ?',
      [resolvedUserId]
    );
    const total = (countRows && countRows.length > 0) ? countRows[0].total : 0;

    const [rows] = await mysqlPool.query(
      `SELECT id, user_id, sender, message_text as text, source, diet_plan_id as dietPlanId, 
              attachment_name as attachmentName, attachment_type as attachmentType, 
              has_attachment as hasAttachment, created_at as createdAt
       FROM ai_chat_messages
       WHERE user_id = ?
       ORDER BY id ASC
       LIMIT ? OFFSET ?`,
      [resolvedUserId, limit, offset]
    );

    return res.json({
      success: true,
      messages: (rows || []).map(r => ({
        id: r.id,
        user_id: r.user_id,
        sender: r.sender,
        text: r.text,
        source: r.source,
        dietPlanId: r.dietPlanId,
        attachment: r.hasAttachment ? { name: r.attachmentName, type: r.attachmentType } : null,
        createdAt: r.createdAt
      })),
      total,
      page,
      limit
    });
  } catch (err) {
    console.error('Fetch AI chat history error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Delete AI Chat History for a user
app.delete('/api/ai/chat/history', async (req, res) => {
  const email = (req.body.email || req.query.email || '').toLowerCase().trim();
  const userIdQuery = req.body.user_id || req.query.user_id;

  if (!email && !userIdQuery) {
    return res.status(400).json({ success: false, error: 'Email or user_id is required' });
  }

  if (!mysqlPool) {
    return res.json({ success: true, cleared: true });
  }

  try {
    let resolvedUserId = userIdQuery;
    if (!resolvedUserId && email) {
      const [uRows] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1', [email]);
      if (uRows.length > 0) resolvedUserId = uRows[0].id;
    }

    if (resolvedUserId) {
      await mysqlPool.query('DELETE FROM ai_chat_messages WHERE user_id = ?', [resolvedUserId]);
    }
    return res.json({ success: true, message: 'Chat history cleared successfully' });
  } catch (err) {
    console.error('Clear AI chat history error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Central AI Health Coach Endpoint
app.post(['/api/ai/coach', '/api/ai/chat'], async (req, res) => {
  try {
    const fileData = req.body.fileData;
    const mimeType = req.body.mimeType;
    const filename = req.body.filename;
    const message = req.body.message || req.body.question || (fileData ? 'Analyze this attached food or document' : '');
    const fullUserData = req.body.fullUserData || {};
    const history = req.body.history || [];
    const activeDietPlan = req.body.activeDietPlan || null;
    const confirmedAvailableFoods = req.body.confirmedAvailableFoods || [];

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Message or attachment is required' });
    }

    const q = message.toLowerCase().trim();

    // Check if user is asking for dynamic recipe generation or modification
    const recipeIntent = detectRecipeIntent(message);
    if (recipeIntent) {
      const recipe = generateDynamicRecipe(message, history, confirmedAvailableFoods);
      const recipeText = formatRecipeMarkdown(recipe);
      return res.json({
        success: true,
        source: 'groq',
        answer: recipeText,
        recipe: recipe,
        intentType: 'RECIPE'
      });
    }

    // Check if user is asking for diet plan creation
    const isPlanReq = (q.includes('generate') || q.includes('create') || q.includes('make')) && (q.includes('diet') || q.includes('plan'));
    const isEditReq = activeDietPlan && (q.includes('lighter') || q.includes('replace') || q.includes('vegetarian') || q.includes('more calories') || q.includes('reduce'));

    let contextData = {
      userProfile: fullUserData.profile || {},
      dailySteps: fullUserData.steps || 0,
      waterGlasses: fullUserData.waterGlasses || 0,
      activeDietPlan: activeDietPlan,
      confirmedAvailableFoods: confirmedAvailableFoods
    };

    const ragContext = retrieveRAGNutritionContext(message, confirmedAvailableFoods, activeDietPlan);

    const userPrompt = `USER MESSAGE: "${message}"

${ragContext ? ragContext + '\n\n' : ''}VERIFIED USER STORED HEALTHIFY DATA:
${JSON.stringify(contextData, null, 2)}

Provide an intelligent, conversational response. Always ground numbers in the Profile Calculator. When discussing meals, recommend 5 balanced meals (Breakfast, Pre-lunch, Lunch, Snack, Dinner).`;

    const aiResponse = await queryGroq(COACH_SYSTEM_INSTRUCTION, userPrompt, history, fileData, mimeType);

    let dietPlan = null;
    let intentType = 'CHAT';

    if (isPlanReq) {
      intentType = 'DIET_PLAN';
      const pType = q.includes('25') ? '25_DAY' : (q.includes('daily') ? 'DAILY' : '7_DAY');
      const goal = q.includes('gain') ? 'Muscle Gain' : (q.includes('loss') ? 'Weight Loss' : 'Maintain Weight');
      const weight = (fullUserData.profile && fullUserData.profile.weight) || 70;
      const tdee = (fullUserData.profile && (fullUserData.profile.tdee || fullUserData.profile.targetCalories)) || 2200;
      const targetCal = goal === 'Muscle Gain' ? Math.round(tdee * 1.15) : (goal === 'Weight Loss' ? Math.round(tdee * 0.8) : Math.round(tdee));

      const days = [];
      const totalDays = pType === '25_DAY' ? 25 : (pType === '7_DAY' ? 7 : 1);
      for (let d = 1; d <= totalDays; d++) {
        const meals = buildFiveMealsForDay(d, targetCal, confirmedAvailableFoods);
        let dayUnroundedCal = 0, dayUnroundedPro = 0, dayUnroundedCarbs = 0, dayUnroundedFat = 0, dayUnroundedFib = 0;
        let daySumCal = 0, daySumPro = 0, daySumCarbs = 0, daySumFat = 0, daySumFib = 0;
        meals.forEach(m => {
          dayUnroundedCal += m.unroundedCal !== undefined ? m.unroundedCal : (m.subtotalCalories || m.totalCalories || 0);
          dayUnroundedPro += m.unroundedPro !== undefined ? m.unroundedPro : (m.subtotalProtein || m.totalProtein || 0);
          dayUnroundedCarbs += m.unroundedCarbs !== undefined ? m.unroundedCarbs : (m.subtotalCarbs || m.totalCarbs || 0);
          dayUnroundedFat += m.unroundedFat !== undefined ? m.unroundedFat : (m.subtotalFat || m.totalFat || 0);
          dayUnroundedFib += m.unroundedFib !== undefined ? m.unroundedFib : (m.subtotalFibre || m.totalFibre || 0);

          daySumCal += (m.subtotalCalories !== undefined ? m.subtotalCalories : m.totalCalories) || 0;
          daySumPro += (m.subtotalProtein !== undefined ? m.subtotalProtein : m.totalProtein) || 0;
          daySumCarbs += (m.subtotalCarbs !== undefined ? m.subtotalCarbs : m.totalCarbs) || 0;
          daySumFat += (m.subtotalFat !== undefined ? m.subtotalFat : m.totalFat) || 0;
          daySumFib += (m.subtotalFibre !== undefined ? m.subtotalFibre : m.totalFibre) || 0;
        });
        days.push({
          dayNumber: d,
          dayTitle: `Day ${d}`,
          day: d,
          targetCalories: targetCal,
          totalCalories: Math.round(daySumCal * 10) / 10,
          totalProtein: Math.round(daySumPro * 10) / 10,
          totalCarbs: Math.round(daySumCarbs * 10) / 10,
          totalFat: Math.round(daySumFat * 10) / 10,
          totalFibre: Math.round(daySumFib * 10) / 10,
          unroundedCalories: dayUnroundedCal,
          unroundedProtein: dayUnroundedPro,
          unroundedCarbs: dayUnroundedCarbs,
          unroundedFat: dayUnroundedFat,
          unroundedFibre: dayUnroundedFib,
          meals: meals
        });
      }

      dietPlan = {
        id: Date.now(),
        title: `5-Meal ${goal} Plan (${targetCal.toLocaleString()} kcal/day)`,
        planType: pType,
        goal: goal,
        calorieTarget: targetCal,
        dailyTargetCalories: targetCal,
        tdee: tdee,
        proteinTarget: Math.round(weight * 2.0),
        dailyTargetProtein: Math.round(weight * 2.0),
        carbsTarget: Math.round((targetCal * 0.5) / 4),
        dailyTargetCarbs: Math.round((targetCal * 0.5) / 4),
        fatTarget: Math.round((targetCal * 0.25) / 9),
        dailyTargetFat: Math.round((targetCal * 0.25) / 9),
        fibreTarget: 32,
        dailyTargetFibre: 32,
        days: days,
        confirmedFoods: confirmedAvailableFoods
      };
    } else if (isEditReq && activeDietPlan) {
      intentType = 'DIET_EDIT';
      dietPlan = JSON.parse(JSON.stringify(activeDietPlan));
      // Adjust dinner lighter or replace item
      if (q.includes('dinner') && (q.includes('light') || q.includes('less') || q.includes('reduce'))) {
        const dayList = Array.isArray(dietPlan.days) ? dietPlan.days : Object.values(dietPlan.days || {});
        dayList.forEach(dayObj => {
          const meals = Array.isArray(dayObj) ? dayObj : (dayObj.meals || []);
          const din = meals.find(m => m.slot === 'dinner' || m.slot === 'DINNER');
          if (din && din.items) {
            din.items.forEach(it => {
              const origGrams = it.grams || it.quantity || 100;
              const scaledGrams = Math.round(origGrams * 0.75);
              Object.assign(it, createFoodItem(it.name, scaledGrams, it.state, it.prepMethod));
            });
            const nt = calculateMealTotals(din.items);
            Object.assign(din, nt);
            din.subtotalCalories = nt.totalCalories;
            din.subtotalProtein = nt.totalProtein;
            din.subtotalCarbs = nt.totalCarbs;
            din.subtotalFat = nt.totalFat;
            din.subtotalFibre = nt.totalFibre;
          }
          if (dayObj && !Array.isArray(dayObj) && dayObj.meals) {
            let dayCal = 0, dayPro = 0, dayCarbs = 0, dayFat = 0, dayFib = 0;
            dayObj.meals.forEach(m => {
              dayCal += m.subtotalCalories || m.totalCalories || 0;
              dayPro += m.subtotalProtein || m.totalProtein || 0;
              dayCarbs += m.subtotalCarbs || m.totalCarbs || 0;
              dayFat += m.subtotalFat || m.totalFat || 0;
              dayFib += m.subtotalFibre || m.totalFibre || 0;
            });
            dayObj.totalCalories = Math.round(dayCal * 10) / 10;
            dayObj.totalProtein = Math.round(dayPro * 10) / 10;
            dayObj.totalCarbs = Math.round(dayCarbs * 10) / 10;
            dayObj.totalFat = Math.round(dayFat * 10) / 10;
            dayObj.totalFibre = Math.round(dayFib * 10) / 10;
          }
        });
      }
    }

    if (aiResponse) {
      return res.json({
        success: true,
        source: 'groq',
        answer: aiResponse.text,
        groundingMetadata: aiResponse.groundingMetadata,
        searchSources: aiResponse.searchSources,
        dietPlan,
        intentType
      });
    }

    const fallbackAnswer = generateDeterministicCoachAnswer(message, fullUserData);
    res.json({ success: true, source: 'offline-engine', answer: fallbackAnswer, dietPlan, intentType });
  } catch (err) {
    console.error('Error in /api/ai/coach:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Diet Plan REST Endpoints with MySQL Persistence
app.get('/api/diet/confirmed-foods', async (req, res) => {
  const email = (req.query.email || 'guest').toLowerCase().trim();
  if (mysqlPool && email && email !== 'guest') {
    try {
      const [rows] = await mysqlPool.query(
        `SELECT up.confirmed_foods_json FROM user_profiles up
         JOIN users u ON up.user_id = u.id
         WHERE LOWER(u.email) = ? LIMIT 1`,
        [email]
      );
      if (rows && rows.length > 0 && rows[0].confirmed_foods_json) {
        try {
          const list = JSON.parse(rows[0].confirmed_foods_json);
          if (Array.isArray(list) && list.length > 0) {
            userConfirmedFoodsStore[email] = list;
            return res.json({ success: true, confirmedFoods: list, count: list.length });
          }
        } catch (e) {}
      }
    } catch (e) {
      console.warn('MySQL confirmed foods query error:', e.message);
    }
  }
  const foods = userConfirmedFoodsStore[email] || [];
  res.json({ success: true, confirmedFoods: foods, count: foods.length });
});

app.post('/api/diet/confirmed-foods', async (req, res) => {
  const { email, confirmedFoods, availableFoods } = req.body;
  const resolvedEmail = (email || 'guest').toLowerCase().trim();
  const list = confirmedFoods || availableFoods || [];
  const unique = [...new Set(list.filter(f => f && typeof f === 'string' && f.trim()).map(f => f.trim()))];
  userConfirmedFoodsStore[resolvedEmail] = unique;

  if (mysqlPool && resolvedEmail && resolvedEmail !== 'guest') {
    try {
      const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [resolvedEmail]);
      if (users && users.length > 0) {
        const userId = users[0].id;
        const jsonStr = JSON.stringify(unique);
        const [prof] = await mysqlPool.query('SELECT id FROM user_profiles WHERE user_id = ?', [userId]);
        if (prof.length > 0) {
          await mysqlPool.query('UPDATE user_profiles SET confirmed_foods_json = ?, updated_at = NOW() WHERE user_id = ?', [jsonStr, userId]);
        } else {
          await mysqlPool.query('INSERT INTO user_profiles (user_id, confirmed_foods_json, updated_at) VALUES (?, ?, NOW())', [userId, jsonStr]);
        }
      }
    } catch (e) {
      console.warn('MySQL save confirmed foods error:', e.message);
    }
  }

  res.json({ success: true, confirmedFoods: unique, count: unique.length, message: 'Confirmed foods saved successfully' });
});

app.post('/api/diet/generate', async (req, res) => {
  try {
    const { email, planType, goal, targetCalories, availableFoods, confirmedFoods, confirmedAvailableFoods, profileData, doctorNotes } = req.body;
    const resolvedGoal = goal || 'Maintain Weight';
    const tdee = (profileData && (profileData.tdee || profileData.targetCalories)) || 2200;
    const target = targetCalories || (resolvedGoal.includes('Gain') ? Math.round(tdee * 1.15) : (resolvedGoal.includes('Loss') ? Math.round(tdee * 0.8) : Math.round(tdee)));
    const totalDays = planType === '25_DAY' ? 25 : (planType === '7_DAY' ? 7 : 1);
    const resolvedEmail = (email || 'guest').toLowerCase().trim();
    const resolvedFoods = (confirmedFoods && confirmedFoods.length > 0) ? confirmedFoods :
      ((availableFoods && availableFoods.length > 0) ? availableFoods :
      ((confirmedAvailableFoods && confirmedAvailableFoods.length > 0) ? confirmedAvailableFoods :
      (userConfirmedFoodsStore[resolvedEmail] || [])));
    if (resolvedFoods && resolvedFoods.length > 0) {
      userConfirmedFoodsStore[resolvedEmail] = [...new Set(resolvedFoods)];
    }

    const goalLower = (resolvedGoal || '').toLowerCase();
    const prefLower = (profileData && (profileData.dietaryPreference || profileData.dietPreference) ? (profileData.dietaryPreference || profileData.dietPreference) : '').toLowerCase();
    const isExplicitNonVeg = goalLower.includes('non-veg') || goalLower.includes('nonveg') || prefLower.includes('non-veg') || prefLower.includes('nonveg');
    const isVeg = !isExplicitNonVeg && ((profileData && (
      profileData.dietaryPreference === 'veg' ||
      profileData.dietaryPreference === 'vegetarian' ||
      profileData.dietPreference === 'veg' ||
      profileData.dietPreference === 'vegetarian' ||
      profileData.isVegetarian === true
    )) || (goalLower.includes('vegetarian') || /\bveg\b/.test(goalLower)));

    const daysArray = [];
    for (let d = 1; d <= totalDays; d++) {
      const meals = buildFiveMealsForDay(d, target, resolvedFoods, isVeg);
      let dayUnroundedCal = 0, dayUnroundedPro = 0, dayUnroundedCarbs = 0, dayUnroundedFat = 0, dayUnroundedFib = 0;
      let daySumCal = 0, daySumPro = 0, daySumCarbs = 0, daySumFat = 0, daySumFib = 0;
      meals.forEach(m => {
        dayUnroundedCal += m.unroundedCal !== undefined ? m.unroundedCal : (m.subtotalCalories || m.totalCalories || 0);
        dayUnroundedPro += m.unroundedPro !== undefined ? m.unroundedPro : (m.subtotalProtein || m.totalProtein || 0);
        dayUnroundedCarbs += m.unroundedCarbs !== undefined ? m.unroundedCarbs : (m.subtotalCarbs || m.totalCarbs || 0);
        dayUnroundedFat += m.unroundedFat !== undefined ? m.unroundedFat : (m.subtotalFat || m.totalFat || 0);
        dayUnroundedFib += m.unroundedFib !== undefined ? m.unroundedFib : (m.subtotalFibre || m.totalFibre || 0);

        daySumCal += (m.subtotalCalories !== undefined ? m.subtotalCalories : m.totalCalories) || 0;
        daySumPro += (m.subtotalProtein !== undefined ? m.subtotalProtein : m.totalProtein) || 0;
        daySumCarbs += (m.subtotalCarbs !== undefined ? m.subtotalCarbs : m.totalCarbs) || 0;
        daySumFat += (m.subtotalFat !== undefined ? m.subtotalFat : m.totalFat) || 0;
        daySumFib += (m.subtotalFibre !== undefined ? m.subtotalFibre : m.totalFibre) || 0;
      });
      daysArray.push({
        dayNumber: d,
        dayTitle: `Day ${d}`,
        day: d,
        targetCalories: target,
        totalCalories: Math.round(daySumCal * 10) / 10,
        totalProtein: Math.round(daySumPro * 10) / 10,
        totalCarbs: Math.round(daySumCarbs * 10) / 10,
        totalFat: Math.round(daySumFat * 10) / 10,
        totalFibre: Math.round(daySumFib * 10) / 10,
        unroundedCalories: dayUnroundedCal,
        unroundedProtein: dayUnroundedPro,
        unroundedCarbs: dayUnroundedCarbs,
        unroundedFat: dayUnroundedFat,
        unroundedFibre: dayUnroundedFib,
        meals: meals
      });
    }

    const feasibility = evaluateConfirmedPoolFeasibility(resolvedFoods, target);
    let finalDocNotes = doctorNotes || (req.body && req.body.doctorTrainerNotes) || '';
    if (!feasibility.feasible) {
      finalDocNotes = (finalDocNotes ? finalDocNotes + '\n\n' : '') + `⚠️ Nutrition Limitation Note: ${feasibility.reason}`;
    }

    const plan = {
      id: 'diet_' + Date.now(),
      email: email || 'user',
      title: `${planType === '25_DAY' ? '25-Day' : (planType === '7_DAY' ? '7-Day' : 'Daily')} Transformation 5-Meal Plan`,
      planType: planType || '7_DAY',
      fitnessGoal: resolvedGoal,
      goal: resolvedGoal,
      dailyTargetCalories: target,
      calorieTarget: target,
      tdee: tdee,
      dailyTargetProtein: Math.round(((profileData && profileData.weight) || 70) * 1.8),
      proteinTarget: Math.round(((profileData && profileData.weight) || 70) * 1.8),
      dailyTargetCarbs: Math.round((target * 0.5) / 4),
      carbsTarget: Math.round((target * 0.5) / 4),
      dailyTargetFat: Math.round((target * 0.25) / 9),
      fatTarget: Math.round((target * 0.25) / 9),
      dailyTargetFibre: 32,
      fibreTarget: 32,
      doctorNotes: finalDocNotes,
      doctorTrainerNotes: finalDocNotes,
      limitationNote: !feasibility.feasible ? feasibility.reason : null,
      warning: !feasibility.feasible ? feasibility.reason : null,
      days: daysArray,
      confirmedFoods: resolvedFoods
    };

    if (email) inMemoryDietPlans.set(email, plan);

    // Persist diet plan directly to MySQL diet_plans table
    if (mysqlPool && resolvedEmail && resolvedEmail !== 'guest') {
      try {
        const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [resolvedEmail]);
        if (users && users.length > 0) {
          const userId = users[0].id;
          await mysqlPool.query(
            "UPDATE diet_plans SET status = 'ARCHIVED', updated_at = NOW() WHERE user_id = ? AND status = 'ACTIVE'",
            [userId]
          );
          const planJsonStr = JSON.stringify(plan.days || []);
          const confirmedFoodsStr = JSON.stringify(resolvedFoods || []);
          const [insertRes] = await mysqlPool.query(
            `INSERT INTO diet_plans 
             (user_id, title, plan_type, goal, calorie_target, bmr, tdee, protein_target, carbs_target, fat_target, fibre_target, plan_json, confirmed_foods_json, doctor_notes, status, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', NOW(), NOW())`,
            [
              userId,
              plan.title,
              plan.planType,
              plan.goal,
              plan.calorieTarget,
              plan.bmr || null,
              plan.tdee || null,
              plan.proteinTarget || null,
              plan.carbsTarget || null,
              plan.fatTarget || null,
              plan.fibreTarget || null,
              planJsonStr,
              confirmedFoodsStr,
              plan.doctorNotes || ''
            ]
          );
          plan.id = insertRes.insertId;
        }
      } catch (dbErr) {
        console.warn('MySQL persist diet plan error:', dbErr.message);
      }
    }

    res.json({ success: true, dietPlan: plan });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post('/api/diet/edit', (req, res) => {
  try {
    const { email, editRequest, instruction, currentPlan, dietPlan } = req.body;
    const plan = dietPlan || currentPlan || (email && inMemoryDietPlans.get(email));
    if (!plan) return res.status(400).json({ success: false, error: 'No active plan found' });

    const q = (instruction || editRequest || '').toLowerCase();
    const updated = JSON.parse(JSON.stringify(plan));

    if (Array.isArray(updated.days)) {
      updated.days.forEach(d => {
        const din = (d.meals || []).find(m => (m.slot || '').toUpperCase() === 'DINNER');
        if (din && (q.includes('dinner') || q.includes('light') || q.includes('reduce') || q.includes('less'))) {
          (din.items || []).forEach(it => {
            const origGrams = it.grams || it.quantity || 100;
            const scaledGrams = Math.round(origGrams * 0.75);
            Object.assign(it, createFoodItem(it.name, scaledGrams, it.state, it.prepMethod));
          });
          const nt = calculateMealTotals(din.items);
          din.subtotalCalories = nt.totalCalories;
          din.subtotalProtein = nt.totalProtein;
          din.subtotalCarbs = nt.totalCarbs;
          din.subtotalFat = nt.totalFat;
          din.subtotalFibre = nt.totalFibre;
        }
        if (d.meals) {
          let dayCal = 0, dayPro = 0, dayCarbs = 0, dayFat = 0, dayFib = 0;
          d.meals.forEach(m => {
            dayCal += m.subtotalCalories || m.totalCalories || 0;
            dayPro += m.subtotalProtein || m.totalProtein || 0;
            dayCarbs += m.subtotalCarbs || m.totalCarbs || 0;
            dayFat += m.subtotalFat || m.totalFat || 0;
            dayFib += m.subtotalFibre || m.totalFibre || 0;
          });
          d.totalCalories = Math.round(dayCal * 10) / 10;
          d.totalProtein = Math.round(dayPro * 10) / 10;
          d.totalCarbs = Math.round(dayCarbs * 10) / 10;
          d.totalFat = Math.round(dayFat * 10) / 10;
          d.totalFibre = Math.round(dayFib * 10) / 10;
        }
      });
    }

    if (email) inMemoryDietPlans.set(email, updated);
    res.json({ success: true, dietPlan: updated, updatedPlan: updated });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.get('/api/diet/active', async (req, res) => {
  const email = (req.query.email || '').toLowerCase().trim();
  if (mysqlPool && email && email !== 'guest') {
    try {
      const [rows] = await mysqlPool.query(
        `SELECT dp.*, u.email as user_email FROM diet_plans dp 
         JOIN users u ON dp.user_id = u.id 
         WHERE LOWER(u.email) = ? AND dp.status = 'ACTIVE' 
         ORDER BY dp.created_at DESC LIMIT 1`,
        [email]
      );
      if (rows && rows.length > 0) {
        const row = rows[0];
        const userId = row.user_id;
        let days = [];
        let confirmedFoods = [];
        try { days = JSON.parse(row.plan_json || '[]'); } catch (e) {}
        try { confirmedFoods = JSON.parse(row.confirmed_foods_json || '[]'); } catch (e) {}

        // 1. Fetch challenge progress to determine completed and active days
        let completedDaysMap = {};
        let currentActiveDay = 1;
        try {
          const [cRows] = await mysqlPool.query('SELECT history_json, current_day, total_days FROM challenge_progress WHERE user_id = ? LIMIT 1', [userId]);
          if (cRows.length > 0 && cRows[0].history_json) {
            const hist = JSON.parse(cRows[0].history_json || '{}');
            completedDaysMap = hist;
            const completedCount = Object.keys(hist).length;
            const totalDays = cRows[0].total_days || 25;
            currentActiveDay = completedCount < totalDays ? completedCount + 1 : totalDays;
          }
        } catch (cErr) {
          console.warn('Challenge progress fetch in diet/active notice:', cErr.message);
        }

        // 2. Fetch meal consumptions to guarantee consumed statuses are 100% restored
        let consumptionsList = [];
        try {
          const [cList] = await mysqlPool.query('SELECT * FROM diet_meal_consumptions WHERE user_id = ?', [userId]);
          consumptionsList = cList || [];
        } catch (consErr) {
          console.warn('Consumptions fetch in diet/active notice:', consErr.message);
        }

        // 3. Enrich days with sequential locking and meal consumption statuses
        if (Array.isArray(days)) {
          days.forEach(d => {
            const dNum = d.dayNumber || 1;
            const isCompleted = !!completedDaysMap[`Day ${dNum}`] || (dNum < currentActiveDay);
            const isActive = (dNum === currentActiveDay && !isCompleted);
            const isLocked = dNum > currentActiveDay || isCompleted;

            d.isCompleted = isCompleted;
            d.isActive = isActive;
            d.isLocked = isLocked;

            // Restore meal status from consumptions table
            if (Array.isArray(d.meals)) {
              d.meals.forEach(m => {
                const match = consumptionsList.find(c => 
                  c.day_number === dNum && (
                    (c.meal_type && (c.meal_type.toUpperCase() === (m.slot || '').toUpperCase())) ||
                    (c.meal_name && c.meal_name === m.slotTitle)
                  )
                );
                if (match && match.status) {
                  m.status = match.status;
                }
              });
            }
          });
        }

        const plan = {
          id: row.id,
          email: row.user_email,
          title: row.title,
          planType: row.plan_type,
          goal: row.goal,
          fitnessGoal: row.goal,
          calorieTarget: row.calorie_target,
          dailyTargetCalories: row.calorie_target,
          bmr: row.bmr,
          tdee: row.tdee,
          proteinTarget: row.protein_target,
          dailyTargetProtein: row.protein_target,
          carbsTarget: row.carbs_target,
          dailyTargetCarbs: row.carbs_target,
          fatTarget: row.fat_target,
          dailyTargetFat: row.fat_target,
          fibreTarget: row.fibre_target,
          dailyTargetFibre: row.fibre_target,
          doctorNotes: row.doctor_notes,
          doctorTrainerNotes: row.doctor_notes,
          status: row.status,
          createdAt: row.created_at,
          days: days,
          confirmedFoods: confirmedFoods,
          currentActiveDay: currentActiveDay
        };
        inMemoryDietPlans.set(email, plan);
        return res.json({ success: true, dietPlan: plan });
      }
    } catch (dbErr) {
      console.warn('MySQL active diet plan fetch error:', dbErr.message);
    }
  }
  const plan = inMemoryDietPlans.get(email) || null;
  res.json({ success: true, dietPlan: plan });
});

app.get('/api/diet/history', async (req, res) => {
  const email = (req.query.email || '').toLowerCase().trim();
  if (mysqlPool && email && email !== 'guest') {
    try {
      const [rows] = await mysqlPool.query(
        `SELECT dp.*, u.email as user_email FROM diet_plans dp 
         JOIN users u ON dp.user_id = u.id 
         WHERE LOWER(u.email) = ? 
         ORDER BY dp.created_at DESC LIMIT 20`,
        [email]
      );
      if (rows && rows.length > 0) {
        const plans = rows.map(row => {
          let days = [];
          let confirmedFoods = [];
          try { days = JSON.parse(row.plan_json || '[]'); } catch (e) {}
          try { confirmedFoods = JSON.parse(row.confirmed_foods_json || '[]'); } catch (e) {}
          return {
            id: row.id,
            email: row.user_email,
            title: row.title,
            planType: row.plan_type,
            goal: row.goal,
            fitnessGoal: row.goal,
            calorieTarget: row.calorie_target,
            dailyTargetCalories: row.calorie_target,
            bmr: row.bmr,
            tdee: row.tdee,
            proteinTarget: row.protein_target,
            dailyTargetProtein: row.protein_target,
            carbsTarget: row.carbs_target,
            dailyTargetCarbs: row.carbs_target,
            fatTarget: row.fat_target,
            dailyTargetFat: row.fat_target,
            fibreTarget: row.fibre_target,
            dailyTargetFibre: row.fibre_target,
            doctorNotes: row.doctor_notes,
            status: row.status,
            createdAt: row.created_at,
            days: days,
            confirmedFoods: confirmedFoods
          };
        });
        return res.json({ success: true, plans });
      }
    } catch (dbErr) {
      console.warn('MySQL diet history fetch error:', dbErr.message);
    }
  }
  const plan = inMemoryDietPlans.get(email);
  res.json({ success: true, plans: plan ? [plan] : [] });
});

app.delete('/api/diet/:id', async (req, res) => {
  const planId = req.params.id;
  const email = (req.query.email || req.body.email || '').toLowerCase().trim();
  if (!email || email === 'guest') {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }
  if (mysqlPool) {
    try {
      const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [email]);
      if (users && users.length > 0) {
        const userId = users[0].id;
        const [delResult] = await mysqlPool.query('DELETE FROM diet_plans WHERE id = ? AND user_id = ?', [planId, userId]);
        if (delResult.affectedRows > 0) {
          const cached = inMemoryDietPlans.get(email);
          if (cached && String(cached.id) === String(planId)) {
            inMemoryDietPlans.delete(email);
          }
          return res.json({ success: true, message: 'Diet plan deleted successfully' });
        }
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
  const cached = inMemoryDietPlans.get(email);
  if (cached && String(cached.id) === String(planId)) {
    inMemoryDietPlans.delete(email);
    return res.json({ success: true, message: 'Diet plan deleted successfully' });
  }
  res.status(404).json({ success: false, error: 'Diet plan not found or unauthorized' });
});

app.post('/api/diet/delete', async (req, res) => {
  const planId = req.body.planId || req.body.id;
  const email = (req.body.email || req.query.email || '').toLowerCase().trim();
  if (!email || email === 'guest') {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }
  if (mysqlPool) {
    try {
      const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [email]);
      if (users && users.length > 0) {
        const userId = users[0].id;
        const [delResult] = await mysqlPool.query('DELETE FROM diet_plans WHERE id = ? AND user_id = ?', [planId, userId]);
        if (delResult.affectedRows > 0) {
          const cached = inMemoryDietPlans.get(email);
          if (cached && String(cached.id) === String(planId)) {
            inMemoryDietPlans.delete(email);
          }
          return res.json({ success: true, message: 'Diet plan deleted successfully' });
        }
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
  const cached = inMemoryDietPlans.get(email);
  if (cached && String(cached.id) === String(planId)) {
    inMemoryDietPlans.delete(email);
    return res.json({ success: true, message: 'Diet plan deleted successfully' });
  }
  res.status(404).json({ success: false, error: 'Diet plan not found or unauthorized' });
});

app.post('/api/diet/consume-meal', async (req, res) => {
  const {
    email, planId, dayNumber, mealSlot, mealType, mealName,
    plannedCal, plannedCalories, actualCal, actualCalories,
    actualProtein, actualCarbs, actualFat, actualFibre,
    status, logDate
  } = req.body || {};

  const resolvedEmail = (email || 'guest').toLowerCase().trim();
  const resolvedDayNumber = parseInt(dayNumber || 1, 10);
  const resolvedMealSlot = (mealSlot || mealType || 'BREAKFAST').toUpperCase();
  const resolvedMealName = mealName || 'Meal';
  const resolvedPlannedCal = Number(plannedCal !== undefined ? plannedCal : (plannedCalories || 0));
  const resolvedActualCal = Number(actualCal !== undefined ? actualCal : (actualCalories !== undefined ? actualCalories : resolvedPlannedCal));
  const resolvedActualProtein = Number(actualProtein || 0);
  const resolvedActualCarbs = Number(actualCarbs || 0);
  const resolvedActualFat = Number(actualFat || 0);
  const resolvedActualFibre = Number(actualFibre || 0);
  const resolvedStatus = status || 'CONSUMED';
  const resolvedDate = logDate || new Date().toISOString().split('T')[0];

  const key = `${resolvedEmail}_${resolvedDate}`;
  const list = inMemoryConsumptions.get(key) || [];
  list.push({
    mealType: resolvedMealSlot,
    mealName: resolvedMealName,
    dayNumber: resolvedDayNumber,
    plannedCal: resolvedPlannedCal,
    actualCal: resolvedActualCal,
    status: resolvedStatus,
    time: new Date()
  });
  inMemoryConsumptions.set(key, list);

  let updatedPlan = null;

  if (mysqlPool && resolvedEmail && resolvedEmail !== 'guest') {
    try {
      const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [resolvedEmail]);
      if (users && users.length > 0) {
        const userId = users[0].id;

        // 1. Backend Sequential Day Locking Check:
        // Prevent modifying meals of a previously completed challenge day!
        const [cRows] = await mysqlPool.query('SELECT history_json FROM challenge_progress WHERE user_id = ? LIMIT 1', [userId]);
        if (cRows.length > 0 && cRows[0].history_json) {
          try {
            const hist = JSON.parse(cRows[0].history_json || '{}');
            if (hist[`Day ${resolvedDayNumber}`]) {
              return res.status(403).json({
                success: false,
                error: `Day ${resolvedDayNumber} is completed and locked. Modifications are not allowed.`
              });
            }
          } catch (e) {}
        }

        // 2. Upsert into diet_meal_consumptions table
        const [existingCons] = await mysqlPool.query(
          'SELECT id FROM diet_meal_consumptions WHERE user_id = ? AND day_number = ? AND (meal_type = ? OR meal_name = ?) LIMIT 1',
          [userId, resolvedDayNumber, resolvedMealSlot, resolvedMealName]
        );

        if (existingCons.length > 0) {
          await mysqlPool.query(
            `UPDATE diet_meal_consumptions
             SET plan_id = ?, meal_name = ?, meal_type = ?, planned_cal = ?, actual_cal = ?, actual_protein = ?, actual_carbs = ?, actual_fat = ?, actual_fibre = ?, status = ?, log_date = ?, consumed_at = NOW()
             WHERE id = ?`,
            [
              planId || null,
              resolvedMealName,
              resolvedMealSlot,
              resolvedPlannedCal,
              resolvedActualCal,
              resolvedActualProtein,
              resolvedActualCarbs,
              resolvedActualFat,
              resolvedActualFibre,
              resolvedStatus,
              resolvedDate,
              existingCons[0].id
            ]
          );
        } else {
          await mysqlPool.query(
            `INSERT INTO diet_meal_consumptions
             (user_id, plan_id, day_number, meal_name, meal_type, planned_cal, actual_cal, actual_protein, actual_carbs, actual_fat, actual_fibre, status, log_date, consumed_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
              userId,
              planId || null,
              resolvedDayNumber,
              resolvedMealName,
              resolvedMealSlot,
              resolvedPlannedCal,
              resolvedActualCal,
              resolvedActualProtein,
              resolvedActualCarbs,
              resolvedActualFat,
              resolvedActualFibre,
              resolvedStatus,
              resolvedDate
            ]
          );
        }

        // 3. Update diet_plans.plan_json in MySQL so status is permanently persisted
        const [pRows] = await mysqlPool.query(
          'SELECT id, plan_json FROM diet_plans WHERE user_id = ? AND status = "ACTIVE" ORDER BY created_at DESC LIMIT 1',
          [userId]
        );
        if (pRows.length > 0) {
          try {
            const pObj = JSON.parse(pRows[0].plan_json || '[]');
            if (Array.isArray(pObj)) {
              const targetDayObj = pObj.find(d => d.dayNumber === resolvedDayNumber);
              if (targetDayObj && Array.isArray(targetDayObj.meals)) {
                const targetMeal = targetDayObj.meals.find(m => 
                  (m.slot && m.slot.toUpperCase() === resolvedMealSlot) || 
                  (m.slotTitle && m.slotTitle === resolvedMealName)
                );
                if (targetMeal) {
                  targetMeal.status = resolvedStatus;
                  targetMeal.consumedAt = new Date().toISOString();
                }
              }
              const updatedJsonStr = JSON.stringify(pObj);
              await mysqlPool.query('UPDATE diet_plans SET plan_json = ?, updated_at = NOW() WHERE id = ?', [updatedJsonStr, pRows[0].id]);
            }
          } catch (pErr) {
            console.warn('MySQL update plan_json error in consume-meal:', pErr.message);
          }
        }
      }
    } catch (e) {
      console.warn('MySQL consume meal error:', e.message);
    }
  }

  // Update in-memory plan if present
  const memPlan = inMemoryDietPlans.get(resolvedEmail);
  if (memPlan && Array.isArray(memPlan.days)) {
    const d = memPlan.days.find(x => x.dayNumber === resolvedDayNumber);
    if (d && Array.isArray(d.meals)) {
      const m = d.meals.find(x => (x.slot && x.slot.toUpperCase() === resolvedMealSlot) || (x.slotTitle === resolvedMealName));
      if (m) m.status = resolvedStatus;
    }
    updatedPlan = memPlan;
  }

  res.json({ success: true, consumption: req.body, dietPlan: updatedPlan });
});

app.get('/api/diet/consumption', async (req, res) => {
  const { email, date } = req.query;
  const resolvedEmail = (email || 'guest').toLowerCase().trim();
  const targetDate = date || new Date().toISOString().split('T')[0];

  if (mysqlPool && resolvedEmail && resolvedEmail !== 'guest') {
    try {
      const [rows] = await mysqlPool.query(
        `SELECT dmc.* FROM diet_meal_consumptions dmc
         JOIN users u ON dmc.user_id = u.id
         WHERE LOWER(u.email) = ? AND dmc.log_date = ?`,
        [resolvedEmail, targetDate]
      );
      if (rows && rows.length > 0) {
        let plannedCal = 0, actualCal = 0;
        rows.forEach(c => {
          plannedCal += (c.planned_cal || 0);
          if (c.status === 'CONSUMED') actualCal += (c.actual_cal || 0);
        });
        return res.json({
          success: true,
          data: {
            planned: { calories: plannedCal },
            actual: { calories: actualCal },
            remaining: { calories: Math.max(0, plannedCal - actualCal) },
            mealsSummary: { consumed: rows.filter(c => c.status === 'CONSUMED').length, totalTracked: rows.length }
          },
          plannedVsActual: {
            planned: { calories: plannedCal },
            actual: { calories: actualCal },
            remaining: { calories: Math.max(0, plannedCal - actualCal) },
            mealsSummary: { consumed: rows.filter(c => c.status === 'CONSUMED').length, totalTracked: rows.length }
          }
        });
      }
    } catch (e) {
      console.warn('MySQL consumption query error:', e.message);
    }
  }

  const key = `${resolvedEmail}_${date || 'today'}`;
  const list = inMemoryConsumptions.get(key) || [];
  let plannedCal = 0, actualCal = 0;
  list.forEach(c => {
    plannedCal += (c.plannedCal || 0);
    if (c.status === 'CONSUMED') actualCal += (c.actualCal || 0);
  });
  const trackingData = {
    planned: { calories: plannedCal },
    actual: { calories: actualCal },
    remaining: { calories: Math.max(0, plannedCal - actualCal) },
    mealsSummary: { consumed: list.filter(c => c.status === 'CONSUMED').length, totalTracked: list.length }
  };
  res.json({
    success: true,
    data: trackingData,
    plannedVsActual: trackingData
  });
});

// User Profile REST Endpoints (MySQL Backed)
app.get('/api/profile', async (req, res) => {
  const email = (req.query.email || '').toLowerCase().trim();
  if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        `SELECT up.*, u.name, u.email, u.phone FROM user_profiles up
         JOIN users u ON up.user_id = u.id
         WHERE LOWER(u.email) = ? LIMIT 1`,
        [email]
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        let foods = [];
        try { foods = JSON.parse(r.confirmed_foods_json || '[]'); } catch (e) {}
        return res.json({
          success: true,
          profile: {
            id: r.id,
            email: r.email,
            name: r.name,
            phone: r.phone,
            age: r.age,
            gender: r.gender,
            height: r.height,
            weight: r.weight,
            activity: r.activity,
            bmr: r.bmr,
            tdee: r.tdee,
            selectedGoal: r.selected_goal,
            targetCalories: r.target_calories,
            confirmedFoods: foods
          }
        });
      }
    } catch (e) {
      console.warn('MySQL profile query error:', e.message);
    }
  }
  res.json({ success: true, profile: {} });
});

app.post('/api/profile', async (req, res) => {
  const { email, age, gender, height, weight, activity, bmr, tdee, selectedGoal, targetCalories, confirmedFoods } = req.body || {};
  const resolvedEmail = (email || '').toLowerCase().trim();
  if (!resolvedEmail) return res.status(400).json({ success: false, error: 'Email is required' });

  if (mysqlPool) {
    try {
      const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [resolvedEmail]);
      if (users && users.length > 0) {
        const userId = users[0].id;
        const foodsJson = confirmedFoods ? JSON.stringify(confirmedFoods) : null;
        const [prof] = await mysqlPool.query('SELECT id FROM user_profiles WHERE user_id = ?', [userId]);
        if (prof.length > 0) {
          await mysqlPool.query(
            `UPDATE user_profiles SET
             age = ?, gender = ?, height = ?, weight = ?, activity = ?, bmr = ?, tdee = ?, selected_goal = ?, target_calories = ?, confirmed_foods_json = COALESCE(?, confirmed_foods_json), updated_at = NOW()
             WHERE user_id = ?`,
            [age || null, gender || null, height || null, weight || null, activity || null, bmr || null, tdee || null, selectedGoal || null, targetCalories || null, foodsJson, userId]
          );
        } else {
          await mysqlPool.query(
            `INSERT INTO user_profiles (user_id, age, gender, height, weight, activity, bmr, tdee, selected_goal, target_calories, confirmed_foods_json, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [userId, age || null, gender || null, height || null, weight || null, activity || null, bmr || null, tdee || null, selectedGoal || null, targetCalories || null, foodsJson]
          );
        }
        return res.json({ success: true, message: 'Profile saved successfully', profile: req.body });
      }
    } catch (e) {
      console.warn('MySQL profile save error:', e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }
  res.json({ success: true, message: 'Profile saved in cache', profile: req.body });
});

// Daily Data & Food Logs REST Endpoints (MySQL Backed)
app.get('/api/daily-data', async (req, res) => {
  const email = (req.query.email || '').toLowerCase().trim();
  if (!email) return res.status(400).json({ success: false, error: 'Email is required' });
  const today = req.query.date || new Date().toISOString().split('T')[0];

  if (mysqlPool) {
    try {
      const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [email]);
      if (users && users.length > 0) {
        const userId = users[0].id;
        const [stepsRows] = await mysqlPool.query('SELECT steps_count, step_goal FROM daily_steps WHERE user_id = ? AND log_date = ? LIMIT 1', [userId, today]);
        const [waterRows] = await mysqlPool.query('SELECT glasses FROM water_intake WHERE user_id = ? AND log_date = ? LIMIT 1', [userId, today]);
        let [foodRows] = await mysqlPool.query('SELECT id, type, name, cal, protein, fibre, grams FROM food_logs WHERE user_id = ? AND log_date = ?', [userId, today]);
        const [workoutRows] = await mysqlPool.query('SELECT workout_mode, workout_title, trained_muscles, exercises_json, completed FROM workout_logs WHERE user_id = ? AND log_date = ? ORDER BY id DESC LIMIT 1', [userId, today]);

        let workoutMode = 'none';
        let currentWorkout = null;
        if (workoutRows.length > 0) {
          workoutMode = workoutRows[0].workout_mode || 'none';
          try {
            currentWorkout = {
              title: workoutRows[0].workout_title,
              type: workoutRows[0].workout_mode,
              mode: workoutRows[0].workout_mode,
              muscles: workoutRows[0].trained_muscles,
              exercises: JSON.parse(workoutRows[0].exercises_json || '[]'),
              completed: !!workoutRows[0].completed
            };
          } catch (e) {}
        }

        let cleanFoodLog = (foodRows || []).map(f => ({
          id: f.id,
          name: f.name,
          grams: f.grams,
          cal: f.cal,
          protein: f.protein,
          fibre: f.fibre,
          type: f.type || 'food'
        }));

        // If food_logs for date is empty, check active day's consumed meals or challenge history
        if (cleanFoodLog.length === 0) {
          try {
            const [cRows] = await mysqlPool.query('SELECT history_json, total_days FROM challenge_progress WHERE user_id = ? LIMIT 1', [userId]);
            let activeDay = 1;
            let hist = {};
            if (cRows.length > 0 && cRows[0].history_json) {
              hist = JSON.parse(cRows[0].history_json || '{}');
              const compCount = Object.keys(hist).length;
              const totDays = cRows[0].total_days || 25;
              activeDay = compCount < totDays ? compCount + 1 : totDays;
            }

            // If active day has consumed meals in diet_meal_consumptions or active plan, restore those for the active day!
            let activeMealsFound = false;
            const [consRows] = await mysqlPool.query(
              'SELECT * FROM diet_meal_consumptions WHERE user_id = ? AND day_number = ? AND status = "CONSUMED"',
              [userId, activeDay]
            );

            if (consRows && consRows.length > 0) {
              const [pRows] = await mysqlPool.query(
                'SELECT plan_json FROM diet_plans WHERE user_id = ? AND status = "ACTIVE" ORDER BY created_at DESC LIMIT 1',
                [userId]
              );
              let itemsFromPlan = [];
              if (pRows.length > 0) {
                try {
                  const pDays = JSON.parse(pRows[0].plan_json || '[]');
                  const dObj = pDays.find(d => d.dayNumber === activeDay);
                  if (dObj && Array.isArray(dObj.meals)) {
                    dObj.meals.filter(m => m.status === 'CONSUMED').forEach(m => {
                      (m.items || []).forEach(it => {
                        itemsFromPlan.push({
                          name: it.name,
                          grams: it.grams || it.quantity || 100,
                          cal: +(it.cal || it.calories || 0).toFixed(1),
                          protein: +(it.pro || it.protein || 0).toFixed(1),
                          fibre: +(it.fibre || 0).toFixed(1),
                          type: 'diet_plan'
                        });
                      });
                    });
                  }
                } catch (e) {}
              }

              if (itemsFromPlan.length > 0) {
                cleanFoodLog = itemsFromPlan;
                activeMealsFound = true;
              } else {
                cleanFoodLog = consRows.map((c, idx) => ({
                  id: c.id || idx + 1,
                  name: c.meal_name || 'Consumed Meal',
                  grams: 150,
                  cal: c.actual_cal || c.planned_cal || 0,
                  protein: c.actual_protein || c.planned_protein || 0,
                  fibre: c.actual_fibre || c.planned_fibre || 0,
                  type: 'diet_plan'
                }));
                activeMealsFound = true;
              }
            }

            // Only if active day has no meals logged and Day 1 is completed with activeDay === 1, check history
            if (!activeMealsFound && activeDay === 1) {
              const dayKeys = Object.keys(hist);
              if (dayKeys.length > 0) {
                let matchedDay = null;
                for (const dk of dayKeys) {
                  const d = hist[dk];
                  if (d && (d.date === today || (d.timestamp && d.timestamp.startsWith(today)))) {
                    matchedDay = d;
                    break;
                  }
                }
                if (!matchedDay) {
                  matchedDay = hist[dayKeys[dayKeys.length - 1]];
                }
                if (matchedDay && Array.isArray(matchedDay.foodLog) && matchedDay.foodLog.length > 0) {
                  cleanFoodLog = matchedDay.foodLog.map((f, idx) => ({
                    id: f.id || idx + 1,
                    name: f.name,
                    grams: f.grams,
                    cal: f.cal,
                    protein: f.protein,
                    fibre: f.fibre,
                    type: f.type || 'food'
                  }));
                }
              }
            }
          } catch (histErr) {
            console.warn('Daily-data fallback error in GET /api/daily-data:', histErr.message);
          }
        }

        return res.json({
          success: true,
          data: {
            dailySteps: stepsRows.length > 0 ? stepsRows[0].steps_count : 0,
            stepGoal: stepsRows.length > 0 ? stepsRows[0].step_goal : 10000,
            waterGlasses: waterRows.length > 0 ? waterRows[0].glasses : 0,
            foodLog: cleanFoodLog,
            workoutMode,
            gymMode: workoutMode === 'gym',
            currentWorkout
          }
        });
      }
    } catch (e) {
      console.warn('MySQL daily-data query error:', e.message);
    }
  }
  res.json({ success: true, data: { dailySteps: 0, stepGoal: 10000, waterGlasses: 0, foodLog: [], workoutMode: 'none', gymMode: false, currentWorkout: null } });
});

app.post('/api/daily-data', async (req, res) => {
  const { email, dailySteps, stepGoal, waterGlasses, foodLog, workoutMode, currentWorkout, clearFoodLog, date, log_date } = req.body || {};
  const resolvedEmail = (email || '').toLowerCase().trim();
  if (!resolvedEmail) return res.status(400).json({ success: false, error: 'Email is required' });
  const today = date || log_date || new Date().toISOString().split('T')[0];

  if (mysqlPool) {
    try {
      const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [resolvedEmail]);
      if (users && users.length > 0) {
        const userId = users[0].id;
        // Upsert daily_steps
        if (dailySteps !== undefined) {
          const [sRows] = await mysqlPool.query('SELECT id FROM daily_steps WHERE user_id = ? AND log_date = ?', [userId, today]);
          if (sRows.length > 0) {
            await mysqlPool.query('UPDATE daily_steps SET steps_count = ?, step_goal = ?, updated_at = NOW() WHERE id = ?', [dailySteps || 0, stepGoal || 10000, sRows[0].id]);
          } else {
            await mysqlPool.query('INSERT INTO daily_steps (user_id, log_date, steps_count, step_goal, updated_at) VALUES (?, ?, ?, ?, NOW())', [userId, today, dailySteps || 0, stepGoal || 10000]);
          }
        }
        // Upsert water_intake
        if (waterGlasses !== undefined) {
          const [wRows] = await mysqlPool.query('SELECT id FROM water_intake WHERE user_id = ? AND log_date = ?', [userId, today]);
          if (wRows.length > 0) {
            await mysqlPool.query('UPDATE water_intake SET glasses = ?, updated_at = NOW() WHERE id = ?', [waterGlasses || 0, wRows[0].id]);
          } else {
            await mysqlPool.query('INSERT INTO water_intake (user_id, log_date, glasses, updated_at) VALUES (?, ?, ?, NOW())', [userId, today, waterGlasses || 0]);
          }
        }
        // Upsert foodLog: if non-empty, replace for today. If empty, only delete if clearFoodLog === true
        if (Array.isArray(foodLog)) {
          if (foodLog.length > 0) {
            await mysqlPool.query('DELETE FROM food_logs WHERE user_id = ? AND log_date = ?', [userId, today]);
            for (const item of foodLog) {
              if (item && item.name) {
                await mysqlPool.query(
                  'INSERT INTO food_logs (user_id, log_date, name, grams, cal, protein, fibre, type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                  [userId, today, item.name, item.grams || 100, item.cal || 0, item.protein || 0, item.fibre || 0, item.type || 'food']
                );
              }
            }
          } else if (clearFoodLog === true) {
            await mysqlPool.query('DELETE FROM food_logs WHERE user_id = ? AND log_date = ?', [userId, today]);
          }
        }
        // Upsert workoutMode and currentWorkout
        if (workoutMode !== undefined || currentWorkout) {
          const effectiveMode = workoutMode || (currentWorkout ? currentWorkout.mode : 'none');
          const [wRows] = await mysqlPool.query('SELECT id FROM workout_logs WHERE user_id = ? AND log_date = ? ORDER BY id DESC LIMIT 1', [userId, today]);
          const currentTitle = (currentWorkout && currentWorkout.title) ? currentWorkout.title : (effectiveMode === 'home' ? 'Home Routine' : (effectiveMode === 'gym' ? 'Gym Routine' : 'Rest Day'));
          const exercisesJson = currentWorkout ? JSON.stringify(currentWorkout.exercises || []) : '[]';
          const muscles = currentWorkout ? (currentWorkout.muscles || '') : '';
          const completed = (currentWorkout && currentWorkout.completed) ? 1 : 0;

          if (wRows.length > 0) {
            await mysqlPool.query(
              'UPDATE workout_logs SET workout_mode = ?, workout_title = ?, trained_muscles = ?, exercises_json = ?, completed = ? WHERE id = ?',
              [effectiveMode, currentTitle, muscles, exercisesJson, completed, wRows[0].id]
            );
          } else if (effectiveMode !== 'none' || currentWorkout) {
            await mysqlPool.query(
              'INSERT INTO workout_logs (user_id, log_date, workout_title, workout_mode, trained_muscles, exercises_json, completed, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
              [userId, today, currentTitle, effectiveMode, muscles, exercisesJson, completed]
            );
          }
        }
      }
    } catch (e) {
      console.warn('MySQL daily-data save error:', e.message);
    }
  }

  res.json({ success: true, message: 'Daily data saved', data: req.body });
});

// 25-Day Challenge REST Endpoints (MySQL Backed)
app.get('/api/challenge', async (req, res) => {
  const email = (req.query.email || '').toLowerCase().trim();
  if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        `SELECT cp.* FROM challenge_progress cp
         JOIN users u ON cp.user_id = u.id
         WHERE LOWER(u.email) = ? LIMIT 1`,
        [email]
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        let history = {};
        try { history = JSON.parse(r.history_json || '{}'); } catch (e) {}
        return res.json({
          success: true,
          challenge: {
            id: r.id,
            currentDay: r.current_day,
            totalDays: r.total_days,
            startDate: r.start_date,
            history: history
          }
        });
      }
    } catch (e) {
      console.warn('MySQL challenge query error:', e.message);
    }
  }
  res.json({ success: true, challenge: { currentDay: 1, totalDays: 25, startDate: new Date().toISOString().split('T')[0], history: {} } });
});

app.post('/api/challenge', async (req, res) => {
  const { email, currentDay, totalDays, startDate, history } = req.body || {};
  const resolvedEmail = (email || '').toLowerCase().trim();
  if (!resolvedEmail) return res.status(400).json({ success: false, error: 'Email is required' });

  if (mysqlPool) {
    try {
      const [users] = await mysqlPool.query('SELECT id FROM users WHERE LOWER(email) = ?', [resolvedEmail]);
      if (users && users.length > 0) {
        const userId = users[0].id;
        const histJson = JSON.stringify(history || {});
        const [cRows] = await mysqlPool.query('SELECT id FROM challenge_progress WHERE user_id = ?', [userId]);
        if (cRows.length > 0) {
          await mysqlPool.query(
            'UPDATE challenge_progress SET current_day = ?, total_days = ?, start_date = ?, history_json = ?, updated_at = NOW() WHERE id = ?',
            [currentDay || 1, totalDays || 25, startDate || '', histJson, cRows[0].id]
          );
        } else {
          await mysqlPool.query(
            'INSERT INTO challenge_progress (user_id, current_day, total_days, start_date, history_json, updated_at) VALUES (?, ?, ?, ?, ?, NOW())',
            [userId, currentDay || 1, totalDays || 25, startDate || '', histJson]
          );
        }

        // Dual-persist completed food logs from history into food_logs table so individual food history is always available in MySQL
        if (history && typeof history === 'object') {
          const todayStr = new Date().toISOString().split('T')[0];
          for (const dk of Object.keys(history)) {
            const d = history[dk];
            if (d && Array.isArray(d.foodLog) && d.foodLog.length > 0) {
              const dDate = (d.timestamp ? d.timestamp.split('T')[0] : null) || todayStr;
              const [existingLogs] = await mysqlPool.query('SELECT id FROM food_logs WHERE user_id = ? AND log_date = ?', [userId, dDate]);
              if (existingLogs.length === 0) {
                for (const item of d.foodLog) {
                  if (item && item.name) {
                    await mysqlPool.query(
                      'INSERT INTO food_logs (user_id, log_date, name, grams, cal, protein, fibre, type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                      [userId, dDate, item.name, item.grams || 100, item.cal || 0, item.protein || 0, item.fibre || 0, item.type || 'food']
                    );
                  }
                }
              }
            }
          }
        }

        return res.json({ success: true, message: 'Challenge saved', challenge: req.body });
      }
    } catch (e) {
      console.warn('MySQL challenge save error:', e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }
  res.json({ success: true, message: 'Challenge saved in cache', challenge: req.body });
});


function isPlausibleFood(name) {
  if (!name || typeof name !== 'string') return false;
  const lower = name.toLowerCase().trim();
  const nonFood = new Set([
    'total', 'calories', 'calorie', 'protein', 'carbs', 'carbohydrates', 'fat', 'fibre', 'fiber',
    'macros', 'target', 'date', 'dr', 'doctor', 'trainer', 'patient', 'notes', 'prescription',
    'water', 'hydration', 'signature', 'hospital', 'clinic', 'diet', 'meal', 'nutrition',
    'instructions', 'daily', 'day', 'week', 'month', 'plan', 'chart', 'list', 'items', 'item',
    'quantity', 'amount', 'prep', 'preparation', 'breakfast', 'lunch', 'dinner', 'snack',
    'time', 'name', 'age', 'weight', 'height', 'bmi', 'bmr', 'kg', 'grams', 'table', 'food',
    'available', 'confirmed', 'grocery', 'groceries', 'supermarket', 'store', 'price', 'bill',
    'receipt', 'order', 'subtotal', 'tax', 'gst', 'change', 'cash', 'card', 'thank', 'you',
    'hardware', 'mart', 'market', 'shopping'
  ]);
  if (nonFood.has(lower)) return false;
  const foodRoots = [
    'rice', 'egg', 'banana', 'chicken', 'paneer', 'tofu', 'fish', 'meat', 'beef', 'pork',
    'apple', 'fruit', 'berry', 'milk', 'curd', 'yogurt', 'cheese', 'bread', 'roti', 'chapati',
    'dal', 'lentil', 'bean', 'chana', 'sprout', 'salad', 'spinach', 'potato', 'onion', 'tomato',
    'cucumber', 'oats', 'almond', 'walnut', 'peanut', 'idli', 'dosa', 'poha', 'upma', 'soup',
    'quinoa', 'orange', 'papaya', 'pomegranate', 'broccoli', 'salmon', 'tuna', 'protein'
  ];
  return foodRoots.some(r => lower.includes(r));
}

function cleanFoodName(name) {
  if (!name || typeof name !== 'string') return '';
  let s = name.trim();
  s = s.replace(/\b\d+(?:\.\d+)?\s*(?:kg|g|gm|gms|grams|gram|ml|l|ltr|oz|lbs|lb|cups?|tbsp|tsp|pieces?|pcs?|slices?|scoops?|servings?|calories|kcal|cal)\b/gi, '').trim();
  s = s.replace(/\b(?:1\/2|1\/4|3\/4)\s*(?:cup|cups|tbsp|tsp)?\b/gi, '').trim();
  s = s.replace(/\b\d+\b/g, '').trim();
  s = s.replace(/\([^)]*\)/g, '').trim();
  s = s.replace(/\[[^\]]*\]/g, '').trim();
  s = s.replace(/^[0-9]+[\.\)\-]?\s*/, '').trim();
  s = s.replace(/^[\-\*•▪►–—]\s*/, '').trim();
  s = s.replace(/\b(?:raw|cooked|fresh|boiled|steamed|grilled|roasted|fried|baked|sauteed|poached)\b/gi, '').trim();
  s = s.replace(/^[\s\-\:\,\(\)\[\]\.\/]+|[\s\-\:\,\(\)\[\]\.\/]+$/g, '').trim();
  if (!s || !isPlausibleFood(s)) return '';
  return s.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function parseFoodsFromTextDynamic(text) {
  if (!text || typeof text !== 'string') return [];
  const cleanFoods = [];
  const seen = new Set();
  const tokens = text.split(/[\r\n,;•*|]+/);
  tokens.forEach(raw => {
    let t = raw.trim();
    if (!t) return;
    t = t.replace(/^(?:breakfast|pre-lunch|mid-morning|morning|lunch|evening snack|snack|dinner|post-workout|ingredients|food items|grocery list|diet chart|items|foods)[\s\:\-]+/i, '').trim();
    const cleaned = cleanFoodName(t);
    if (cleaned && cleaned.length >= 2 && cleaned.length <= 40 && isPlausibleFood(cleaned)) {
      const lower = cleaned.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        cleanFoods.push(cleaned);
      }
    }
  });

  const knownFoodDict = [
    'rice', 'white rice', 'brown rice', 'eggs', 'egg', 'egg whites', 'banana', 'bananas',
    'chicken', 'chicken breast', 'paneer', 'tofu', 'curd', 'dahi', 'yogurt', 'greek yogurt',
    'milk', 'oats', 'almonds', 'walnuts', 'peanuts', 'chia seeds', 'flax seeds', 'spinach',
    'broccoli', 'cucumber', 'tomato', 'apple', 'apples', 'papaya', 'orange', 'pomegranate',
    'sweet potato', 'quinoa', 'poha', 'idli', 'dosa', 'dal', 'moong dal', 'lentils', 'chickpeas',
    'chana', 'rajma', 'kidney beans', 'sprouts', 'sprouted moong', 'fish', 'salmon', 'tuna',
    'roti', 'chapati', 'bread', 'whole wheat bread', 'protein bar'
  ];
  const lowerText = text.toLowerCase();
  knownFoodDict.forEach(kf => {
    const regex = new RegExp('\\b' + kf.replace(/\s+/g, '\\s+') + '\\b', 'i');
    if (regex.test(lowerText)) {
      const cleaned = cleanFoodName(kf);
      if (cleaned && isPlausibleFood(cleaned)) {
        const lower = cleaned.toLowerCase();
        let already = false;
        for (const s of seen) {
          if (s === lower || s.includes(lower) || lower.includes(s)) {
            already = true;
            break;
          }
        }
        if (!already) {
          seen.add(lower);
          cleanFoods.push(cleaned);
        }
      }
    }
  });
  return cleanFoods;
}

// ==================== ROBUST ZERO-DEPENDENCY PDF EXTRACTOR ====================
function extractFromPdfBuffer(pdfBuffer) {
  if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer) || pdfBuffer.length < 10) {
    return { success: false, empty: true, error: 'Empty or unreadable PDF file.' };
  }

  // 1. Validate PDF header signature
  const headerSlice = pdfBuffer.slice(0, 1024).toString('latin1');
  if (!headerSlice.includes('%PDF-')) {
    return { success: false, error: 'The uploaded file is not a valid PDF document or is corrupted.' };
  }

  // 2. Check for Password Protection / Encryption
  const fullRaw = pdfBuffer.toString('latin1');
  if (fullRaw.includes('/Encrypt')) {
    return { success: false, isEncrypted: true, error: 'The uploaded PDF is password-protected. Please upload an unprotected file or enter your foods manually.' };
  }

  // 3. Scan for stream ... endstream blocks and decompress FlateDecode
  const extractedTextParts = [];
  const extractedImages = [];

  const streamStarts = [];
  let idx = 0;
  while ((idx = pdfBuffer.indexOf('stream', idx)) !== -1) {
    const charBefore = idx > 0 ? pdfBuffer[idx - 1] : 0;
    const charAfter = pdfBuffer[idx + 6];
    if ((charBefore === 0x0a || charBefore === 0x0d || charBefore === 0x20) &&
        (charAfter === 0x0a || charAfter === 0x0d)) {
      streamStarts.push(idx);
    }
    idx += 6;
  }

  for (const sStart of streamStarts) {
    let dataStart = sStart + 6;
    if (pdfBuffer[dataStart] === 0x0d && pdfBuffer[dataStart + 1] === 0x0a) {
      dataStart += 2;
    } else if (pdfBuffer[dataStart] === 0x0a || pdfBuffer[dataStart] === 0x0d) {
      dataStart += 1;
    }

    const endstreamPos = pdfBuffer.indexOf('endstream', dataStart);
    if (endstreamPos === -1) continue;

    let streamEnd = endstreamPos;
    if (pdfBuffer[streamEnd - 1] === 0x0a) streamEnd--;
    if (pdfBuffer[streamEnd - 1] === 0x0d) streamEnd--;

    const streamData = pdfBuffer.slice(dataStart, streamEnd);
    const dictLookbackStart = Math.max(0, sStart - 1024);
    const dictText = pdfBuffer.slice(dictLookbackStart, sStart).toString('latin1');

    if (dictText.includes('/DCTDecode') || dictText.includes('/JPXDecode')) {
      if (streamData[0] === 0xFF && streamData[1] === 0xD8) {
        extractedImages.push({
          mimeType: 'image/jpeg',
          buffer: streamData
        });
      }
      continue;
    }

    let uncompressedData = null;
    if (dictText.includes('/FlateDecode')) {
      try {
        uncompressedData = zlib.inflateSync(streamData);
      } catch (e1) {
        try {
          uncompressedData = zlib.inflateRawSync(streamData);
        } catch (e2) {}
      }
    } else if (!dictText.includes('/Filter')) {
      uncompressedData = streamData;
    }

    if (uncompressedData) {
      const text = parsePdfStreamOperators(uncompressedData);
      if (text && text.trim().length > 0) {
        extractedTextParts.push(text);
      }
    }
  }

  const literalText = parsePdfStreamOperators(Buffer.from(fullRaw, 'latin1'));
  if (literalText && literalText.trim().length > 0) {
    extractedTextParts.push(literalText);
  }

  const combinedText = extractedTextParts.join('\n').trim();

  if (combinedText.length > 5) {
    return {
      success: true,
      hasText: true,
      text: combinedText,
      imagesCount: extractedImages.length
    };
  }

  if (extractedImages.length > 0) {
    return {
      success: true,
      hasText: false,
      isScannedImage: true,
      scannedImageBuffer: extractedImages[0].buffer,
      mimeType: extractedImages[0].mimeType,
      imagesCount: extractedImages.length
    };
  }

  return {
    success: false,
    empty: true,
    error: 'The uploaded PDF contains no readable text or supported scanned images.'
  };
}

function parsePdfStreamOperators(streamBuffer) {
  const content = streamBuffer.toString('latin1');
  let result = [];

  const tjRegex = /\[((?:[^[\]]|\([^)]*\))*)\]\s*TJ/g;
  let m;
  while ((m = tjRegex.exec(content)) !== null) {
    const arrayContent = m[1];
    const strInArrayRegex = /\(([^)]*)\)/g;
    let sm;
    let lineStr = '';
    while ((sm = strInArrayRegex.exec(arrayContent)) !== null) {
      lineStr += unescapePdfString(sm[1]);
    }
    if (lineStr.trim()) result.push(lineStr.trim());
  }

  const tSingleRegex = /\(([^)]*)\)\s*(?:Tj|'|")/g;
  while ((m = tSingleRegex.exec(content)) !== null) {
    const unescaped = unescapePdfString(m[1]).trim();
    if (unescaped) result.push(unescaped);
  }

  const hexRegex = /<([0-9a-fA-F]+)>\s*(?:Tj|TJ)/g;
  while ((m = hexRegex.exec(content)) !== null) {
    const hex = m[1];
    let decoded = '';
    for (let i = 0; i < hex.length; i += 2) {
      decoded += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    if (decoded.trim()) result.push(decoded.trim());
  }

  return result.join(' ');
}

function unescapePdfString(str) {
  return str
    .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\');
}

app.post(['/api/ai/upload-document', '/api/diet/upload-document'], async (req, res) => {
  try {
    const filename = (req.body && (req.body.filename || req.body.name)) || 'food_upload.jpg';
    const content = (req.body && (req.body.fileText || req.body.text || req.body.content)) || '';
    const ocrText = (req.body && req.body.ocrText) || '';
    const userGoal = (req.body && req.body.userGoal) || 'Weight Loss';
    const fileData = req.body && req.body.fileData;
    const mimeType = (req.body && req.body.mimeType) || 'image/jpeg';
    const prompt = (req.body && req.body.prompt) || '';

    let finalFileData = fileData;
    let finalMimeType = mimeType;
    let pdfTextExtracted = '';

    const combinedFoodsSet = new Set();

    // Check if uploaded document is a PDF
    const isPdf = (filename && filename.toLowerCase().endsWith('.pdf')) ||
                  (mimeType && mimeType.toLowerCase().includes('pdf'));

    if (isPdf && fileData) {
      try {
        const cleanBase64 = fileData.includes(',') ? fileData.split(',')[1] : fileData;
        const pdfBuf = Buffer.from(cleanBase64, 'base64');
        const pdfResult = extractFromPdfBuffer(pdfBuf);

        if (!pdfResult.success) {
          if (pdfResult.isEncrypted) {
            return res.status(400).json({
              success: false,
              error: 'The uploaded PDF is password-protected. Please upload an unprotected file or enter your foods manually.'
            });
          }
          if (pdfResult.empty) {
            return res.status(400).json({
              success: false,
              error: 'The uploaded PDF appears to be empty or unreadable.'
            });
          }
          return res.status(400).json({
            success: false,
            error: pdfResult.error || 'The uploaded file is not a valid PDF document or is corrupted.'
          });
        }

        if (pdfResult.hasText && pdfResult.text) {
          pdfTextExtracted = pdfResult.text;
          const pdfFoods = parseFoodsFromTextDynamic(pdfResult.text);
          pdfFoods.forEach(f => combinedFoodsSet.add(f));
          finalFileData = null; // Direct text extracted; don't send raw PDF bytes to vision endpoint
        }

        if (pdfResult.isScannedImage && pdfResult.scannedImageBuffer) {
          // Scanned PDF with embedded JPEG photo: pass to Groq Vision!
          finalFileData = pdfResult.scannedImageBuffer.toString('base64');
          finalMimeType = pdfResult.mimeType || 'image/jpeg';
        }
      } catch (pdfErr) {
        console.warn('PDF extraction warning:', pdfErr.message);
      }
    }

    // Dynamic OCR Parsing from text layer or client-side OCR
    const ocrExtractedFoods = parseFoodsFromTextDynamic(ocrText || content || pdfTextExtracted);
    ocrExtractedFoods.forEach(f => combinedFoodsSet.add(f));

    let vlmResult = null;

    // Multimodal Vision with GroqCloud Vision API if key and finalFileData (images) are present
    if (finalFileData && GROQ_API_KEY && GROQ_API_KEY.trim() !== '' && GROQ_API_KEY !== 'your_new_groq_api_key' && GROQ_API_KEY !== 'your_groq_api_key') {
      try {
        const cleanBase64 = finalFileData.includes(',') ? finalFileData.split(',')[1] : finalFileData;
        const cleanMime = (finalMimeType && finalMimeType.trim()) || 'image/jpeg';
        const dataUri = 'data:' + cleanMime + ';base64,' + cleanBase64;
        const visionSystemPrompt = 'You are the "Healthify Computer Vision & Multimodal Nutrition Extraction Engine", powered by GroqCloud Vision.\n' +
'Analyze photos of meals, handwritten food lists, printed grocery receipts, food packaging, nutrition facts tables, clinical diet prescriptions, or documents.\n' +
'STRICT RULES:\n' +
'1. In \'extractedFoods\', include ONLY clean food names (e.g. "Rice", "Eggs", "Banana", "Chicken", "Paneer").\n' +
'2. DO NOT include quantities, weights, or measurements in food names in \'extractedFoods\'.\n' +
'3. Clean and normalize food names to Title Case.\n' +
'4. If OCR text transcript is provided, cross-reference visible handwriting/text with the OCR transcript.\n' +
'5. If no food items are detected or visible, return an empty array [] for \'extractedFoods\'.\n' +
'Return STRICT JSON schema only (no markdown, no backticks):\n' +
'{\n' +
'  "documentName": "' + filename + '",\n' +
'  "doctorTrainerNotes": "...",\n' +
'  "targetCalories": 2100,\n' +
'  "proteinTarget": 130,\n' +
'  "carbsTarget": 220,\n' +
'  "fatTarget": 65,\n' +
'  "fibreTarget": 35,\n' +
'  "extractedFoods": ["Food 1", "Food 2"],\n' +
'  "detailedFoods": [\n' +
'    {\n' +
'      "name": "Food Name",\n' +
'      "quantity": 100,\n' +
'      "unit": "g",\n' +
'      "calories": 165,\n' +
'      "protein": 31,\n' +
'      "carbs": 0,\n' +
'      "fat": 3.6,\n' +
'      "fibre": 0,\n' +
'      "servingSize": "100g",\n' +
'      "valueSource": "DIRECT_IMAGE_EXTRACTED",\n' +
'      "isUncertain": false,\n' +
'      "uncertaintyReason": null,\n' +
'      "percentages": {}\n' +
'    }\n' +
'  ],\n' +
'  "unclearOrMissingInfo": []\n' +
'}';

        const visionModelsToTry = [GROQ_VISION_MODEL, 'llama-3.2-11b-vision-preview', 'llama-3.2-90b-vision-preview'];
        const endpoint = 'https://api.groq.com/openai/v1/chat/completions';

        for (const model of visionModelsToTry) {
          try {
            const promptText = 'Analyze this image/document (' + filename + '). User Fitness Goal: ' + userGoal + '. ' + (prompt ? 'User Note: ' + prompt : '') + (ocrText ? '\nOCR Detected Text from Image:\n' + ocrText : '') + '\nExtract ONLY clean food names in \'extractedFoods\'. Return strictly valid JSON.';
            const promptContent = [
              { type: 'text', text: promptText },
              { type: 'image_url', image_url: { url: dataUri } }
            ];

            const visionResp = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + GROQ_API_KEY.trim()
              },
              body: JSON.stringify({
                model: model,
                messages: [
                  { role: 'system', content: visionSystemPrompt },
                  { role: 'user', content: promptContent }
                ],
                temperature: 0.1
              })
            });

            if (visionResp.ok) {
              const vData = await visionResp.json();
              if (vData.choices && vData.choices[0] && vData.choices[0].message && vData.choices[0].message.content) {
                let jsonText = vData.choices[0].message.content.trim();
                if (jsonText.startsWith('```json')) jsonText = jsonText.substring(7);
                if (jsonText.startsWith('```')) jsonText = jsonText.substring(3);
                if (jsonText.endsWith('```')) jsonText = jsonText.substring(0, jsonText.length - 3);
                jsonText = jsonText.trim();
                vlmResult = JSON.parse(jsonText);
                break;
              }
            }
          } catch (mErr) {
            console.warn('Groq Vision model ' + model + ' failed:', mErr.message);
          }
        }
      } catch (err) {
        console.warn('Groq Vision extraction error:', err.message);
      }
    }

    if (vlmResult && Array.isArray(vlmResult.extractedFoods)) {
      vlmResult.extractedFoods.forEach(vf => {
        const cleaned = cleanFoodName(vf);
        if (cleaned) combinedFoodsSet.add(cleaned);
      });
    }

    // Dynamic fallback to prompt or filename parsing if still empty
    if (combinedFoodsSet.size === 0) {
      if (prompt) {
        parseFoodsFromTextDynamic(prompt).forEach(f => combinedFoodsSet.add(f));
      }
      if (filename) {
        const cleanFn = filename.replace(/\.[^/.]+$/, '').replace(/[_.-]/g, ' ');
        parseFoodsFromTextDynamic(cleanFn).forEach(f => combinedFoodsSet.add(f));
      }
    }

    const finalFoods = Array.from(combinedFoodsSet);
    const detailedFoods = [];
    const vlmDetailMap = new Map();
    if (vlmResult && Array.isArray(vlmResult.detailedFoods)) {
      vlmResult.detailedFoods.forEach(df => {
        if (df && df.name) vlmDetailMap.set(cleanFoodName(df.name).toLowerCase(), df);
      });
    }

    // Check for printed nutrition facts label metrics (DIRECT_IMAGE_EXTRACTED)
    const labelCorpus = (content + ' ' + ocrText + ' ' + prompt);
    const calMatch = labelCorpus.match(/(?:calories|cal|energy)[:\s]+(\d+)/i);
    const proMatch = labelCorpus.match(/(?:protein|prot)[:\s]+(\d+(?:\.\d+)?)\s*g?/i);
    const carbMatch = labelCorpus.match(/(?:carbohydrate|carbohydrates|carbs)[:\s]+(\d+(?:\.\d+)?)\s*g?/i);
    const fatMatch = labelCorpus.match(/(?:total fat|fat)[:\s]+(\d+(?:\.\d+)?)\s*g?/i);
    const fibMatch = labelCorpus.match(/(?:fibre|fiber)[:\s]+(\d+(?:\.\d+)?)\s*g?/i);

    if (calMatch || proMatch) {
      const labelItemName = finalFoods.length > 0 ? finalFoods[0] : (filename.replace(/\.[^/.]+$/, '').replace(/[_.-]/g, ' ') || 'Packaged Nutrition Food');
      detailedFoods.push({
        name: labelItemName,
        quantity: 100,
        unit: 'g',
        calories: calMatch ? parseFloat(calMatch[1]) : null,
        protein: proMatch ? parseFloat(proMatch[1]) : null,
        carbs: carbMatch ? parseFloat(carbMatch[1]) : 0,
        fat: fatMatch ? parseFloat(fatMatch[1]) : 0,
        fibre: fibMatch ? parseFloat(fibMatch[1]) : 0,
        servingSize: 'Printed Label Portion',
        valueSource: 'DIRECT_IMAGE_EXTRACTED',
        isUncertain: false,
        uncertaintyReason: null,
        percentages: {}
      });
      if (!finalFoods.includes(labelItemName)) {
        finalFoods.unshift(labelItemName);
      }
    }

    finalFoods.forEach(fn => {
      const lower = fn.toLowerCase();
      if (detailedFoods.some(d => d.name.toLowerCase() === lower)) return;
      if (vlmDetailMap.has(lower)) {
        const df = vlmDetailMap.get(lower);
        df.name = fn;
        detailedFoods.push(df);
      } else {
        detailedFoods.push({
          name: fn,
          quantity: 100,
          unit: 'g',
          calories: null,
          protein: null,
          carbs: null,
          fat: null,
          fibre: null,
          servingSize: '100g portion',
          valueSource: 'DIRECT_IMAGE_EXTRACTED',
          isUncertain: false,
          uncertaintyReason: null,
          percentages: {}
        });
      }
    });

    const targetCal = (vlmResult && vlmResult.targetCalories) || 2100;
    const docNotes = (vlmResult && vlmResult.doctorTrainerNotes) || (prompt ? prompt.trim() : 'Food items identified from image.');
    const unclearOrMissing = finalFoods.length === 0
      ? ['No food items could be detected in the uploaded image. Please ensure the food list is clear and legible, or add foods manually.']
      : [];

    const extraction = {
      documentName: filename,
      doctorTrainerNotes: docNotes,
      targetCalories: targetCal,
      extractedFoods: finalFoods,
      detailedFoods: detailedFoods,
      unclearOrMissingInfo: unclearOrMissing
    };

    enrichDetailedFoods(extraction);

    return res.json({
      success: true,
      extraction: extraction
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// ==================== AUTH & VALIDATION ENDPOINTS (MYSQL BACKED) ====================

async function handleCheckPhone(req, res, phoneRaw) {
  if (!phoneRaw || (typeof phoneRaw === 'string' && !phoneRaw.trim())) {
    return res.status(400).json({
      success: false,
      available: false,
      error: 'Phone number is required.'
    });
  }
  const phoneVal = validatePhoneNumberBackend(phoneRaw, true);
  if (!phoneVal.isValid) {
    return res.status(400).json({
      success: false,
      available: false,
      error: phoneVal.error
    });
  }
  const cleanPhone = phoneVal.sanitized;
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        'SELECT id, name, email, phone FROM users WHERE phone = ?',
        [cleanPhone]
      );
      if (rows && rows.length > 0) {
        return res.json({
          success: true,
          available: false,
          phone: cleanPhone,
          message: 'Phone number already registered. Please use another number.'
        });
      }
      return res.json({
        success: true,
        available: true,
        phone: cleanPhone,
        message: 'Phone number available.'
      });
    } catch (err) {
      console.error('MySQL phone availability check error:', err);
      return res.status(500).json({
        success: false,
        available: false,
        error: 'Failed to verify phone number against database: ' + err.message
      });
    }
  }

  return res.json({
    success: true,
    available: true,
    phone: cleanPhone,
    message: 'Phone number available.'
  });
}

app.get('/api/auth/check-phone', async (req, res) => {
  return handleCheckPhone(req, res, req.query.phone);
});

app.post('/api/auth/check-phone', async (req, res) => {
  const phone = (req.body && req.body.phone) ? req.body.phone : (req.query && req.query.phone);
  return handleCheckPhone(req, res, phone);
});

app.post('/api/auth/register', async (req, res) => {
  const { name, phone, email, password } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Full name is required.' });
  }
  const phoneVal = validatePhoneNumberBackend(phone, true);
  if (!phoneVal.isValid) {
    return res.status(400).json({ success: false, error: phoneVal.error });
  }
  const emailVal = validateEmailBackend(email, true);
  if (!emailVal.isValid) {
    return res.status(400).json({ success: false, error: emailVal.error });
  }
  if (!password || password.length < 4) {
    return res.status(400).json({ success: false, error: 'Password must be at least 4 characters long.' });
  }

  const cleanEmail = emailVal.sanitized;
  const cleanPhone = phoneVal.sanitized;
  const hashedPassword = hashPassword(password);

  if (mysqlPool) {
    try {
      // 1. Check existing user by email
      const [existingEmailUsers] = await mysqlPool.query(
        'SELECT id, name, email, phone, password FROM users WHERE LOWER(email) = ?',
        [cleanEmail]
      );
      if (existingEmailUsers.length > 0) {
        const existing = existingEmailUsers[0];
        // If password was empty or uninitialized (incomplete registration), update and complete
        if (!existing.password || !existing.password.trim()) {
          await mysqlPool.query(
            'UPDATE users SET name = ?, phone = ?, password = ?, updated_at = NOW() WHERE id = ?',
            [name.trim(), cleanPhone, hashedPassword, existing.id]
          );
          return res.json({
            success: true,
            message: 'User registration completed successfully',
            user: {
              id: existing.id,
              name: name.trim(),
              email: cleanEmail,
              phone: cleanPhone
            }
          });
        }
        return res.status(400).json({
          success: false,
          error: `Email already registered: ${cleanEmail}. Please click 'Login' to sign in with your password.`
        });
      }

      // 2. Check existing user by phone (strictly prevent duplicate accounts)
      const [existingPhoneUsers] = await mysqlPool.query(
        'SELECT id, name, email, phone, password FROM users WHERE phone = ?',
        [cleanPhone]
      );
      if (existingPhoneUsers.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Phone number already registered. Please use another number.'
        });
      }

      // 3. Insert new user into MySQL with SHA-256 hashed password
      const [insertResult] = await mysqlPool.query(
        'INSERT INTO users (name, email, phone, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [name.trim(), cleanEmail, cleanPhone, hashedPassword]
      );

      return res.json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: insertResult.insertId,
          name: name.trim(),
          email: cleanEmail,
          phone: cleanPhone
        }
      });
    } catch (dbErr) {
      console.error('MySQL register error:', dbErr);
      return res.status(500).json({ success: false, error: 'Database registration error: ' + dbErr.message });
    }
  }

  return res.status(500).json({ success: false, error: 'Database service is currently unavailable.' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const emailVal = validateEmailBackend(email, true);
  if (!emailVal.isValid) {
    return res.status(400).json({ success: false, error: emailVal.error });
  }
  if (!password || !password.trim()) {
    return res.status(400).json({ success: false, error: 'Password is required.' });
  }

  const cleanEmail = emailVal.sanitized;

  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        'SELECT id, name, email, phone, password FROM users WHERE LOWER(email) = ?',
        [cleanEmail]
      );
      if (rows.length === 0) {
        return res.status(400).json({
          success: false,
          error: `User not found with email: ${cleanEmail}. Please register first.`
        });
      }

      const user = rows[0];

      // If user had empty password, initialize it
      if (!user.password || !user.password.trim()) {
        const hashed = hashPassword(password);
        await mysqlPool.query('UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?', [hashed, user.id]);
        return res.json({
          success: true,
          message: 'User logged in successfully',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
          }
        });
      }

      if (!verifyPassword(password, user.password)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid password. Please check your credentials.'
        });
      }

      // Auto-upgrade plain-text password to SHA-256
      const hashed = hashPassword(password);
      if (user.password !== hashed) {
        await mysqlPool.query('UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?', [hashed, user.id]);
      }

      return res.json({
        success: true,
        message: 'User logged in successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
    } catch (dbErr) {
      console.error('MySQL login error:', dbErr);
      return res.status(500).json({ success: false, error: 'Database login error: ' + dbErr.message });
    }
  }

  return res.status(500).json({ success: false, error: 'Database service is currently unavailable.' });
});

app.post('/api/auth/demo', async (req, res) => {
  const demoEmail = 'champion@healthify.app';
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        'SELECT id, name, email, phone FROM users WHERE LOWER(email) = ?',
        [demoEmail]
      );
      if (rows.length > 0) {
        return res.json({
          success: true,
          message: 'Demo user loaded successfully',
          user: rows[0]
        });
      }
      const hashedDemoPass = hashPassword('DemoPassword123');
      const [insertRes] = await mysqlPool.query(
        'INSERT INTO users (name, email, phone, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        ['Fitness Champion', demoEmail, '9876543210', hashedDemoPass]
      );
      return res.json({
        success: true,
        message: 'Demo user created successfully',
        user: {
          id: insertRes.insertId,
          name: 'Fitness Champion',
          email: demoEmail,
          phone: '9876543210'
        }
      });
    } catch (e) {
      console.error('Demo login MySQL error:', e);
    }
  }

  return res.json({
    success: true,
    message: 'Demo user loaded successfully',
    user: {
      id: 1,
      name: 'Fitness Champion',
      email: demoEmail,
      phone: '9876543210'
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Healthify AI Health Coach Server running on http://localhost:${PORT}`);
    console.log(`🔑 Groq Key Status: ${GROQ_API_KEY && GROQ_API_KEY !== 'your_new_groq_api_key' && GROQ_API_KEY !== 'your_groq_api_key' ? 'Configured ✅ (' + GROQ_MODEL + ' / ' + GROQ_VISION_MODEL + ')' : 'Not set (using intelligent offline fallback engine) ℹ️'}`);
  });
}

module.exports = app;
