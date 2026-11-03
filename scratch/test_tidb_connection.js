/**
 * Test script for verifying TiDB Cloud connectivity and all 12 tables.
 * Usage:
 *   node scratch/test_tidb_connection.js
 * 
 * Note: Requires DB_PASSWORD in .env or passed via environment variable:
 *   DB_PASSWORD=xxxx node scratch/test_tidb_connection.js
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testTiDB() {
  console.log('--- TiDB Cloud Compatibility Verification ---');
  const host = process.env.DB_HOST || 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com';
  const port = Number(process.env.DB_PORT) || 4000;
  const user = process.env.DB_USER || '3XZoHxRta5AerHn.root';
  const database = process.env.DB_NAME || 'healthify_db';
  const password = process.env.DB_PASSWORD;

  console.log(`Connecting to: ${user}@${host}:${port}/${database}`);

  if (!password) {
    console.error('❌ Error: DB_PASSWORD is not set! Set DB_PASSWORD in .env or environment.');
    process.exit(1);
  }

  const isTidbOrCloud = (process.env.DB_SSL === 'true') ||
    host.includes('tidbcloud.com') ||
    port === 4000;

  const sslConfig = isTidbOrCloud ? {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
  } : undefined;

  let pool;
  try {
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 3,
      queueLimit: 0,
      ssl: sslConfig
    });

    console.log('Testing connection (SELECT 1)...');
    const [pingRes] = await pool.query('SELECT 1 as ping, VERSION() as version');
    console.log('✅ Connected successfully! Version:', pingRes[0].version);

    console.log('\nChecking all 12 required tables...');
    const [tables] = await pool.query('SHOW TABLES');
    const tableNames = tables.map(t => Object.values(t)[0].toLowerCase());
    console.log('Existing tables in DB:', tableNames);

    const requiredTables = [
      'users',
      'user_profiles',
      'challenge_progress',
      'diet_plans',
      'diet_meal_consumptions',
      'food_logs',
      'daily_steps',
      'water_intake',
      'workout_logs',
      'supplements',
      'uploaded_documents',
      'ai_chat_messages'
    ];

    let allPresent = true;
    for (const reqTable of requiredTables) {
      if (tableNames.includes(reqTable.toLowerCase())) {
        console.log(`  ✅ ${reqTable} is present`);
      } else {
        console.warn(`  ⚠️ ${reqTable} is missing`);
        allPresent = false;
      }
    }

    if (allPresent) {
      console.log('\n🎉 All 12 tables exist and are verified!');
    } else {
      console.log('\nℹ️ Some tables are missing. When server.js starts, initDbTables() will create them.');
    }

    await pool.end();
    console.log('\n--- Test Completed Successfully ---');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    if (pool) await pool.end();
    process.exit(1);
  }
}

testTiDB();

