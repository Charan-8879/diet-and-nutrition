const mysql = require('mysql2/promise');

async function inspect() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Healthify@2026',
    database: 'healthify_db'
  });

  const [tables] = await conn.query('SHOW TABLES');
  console.log('Tables in healthify_db:');
  console.table(tables);

  for (const row of tables) {
    const tableName = Object.values(row)[0];
    const [cols] = await conn.query(`DESCRIBE \`${tableName}\``);
    console.log(`\n--- Table: ${tableName} ---`);
    console.table(cols.map(c => ({ Field: c.Field, Type: c.Type, Null: c.Null, Key: c.Key, Default: c.Default })));
  }

  await conn.end();
}

inspect().catch(err => {
  console.error('Inspect error:', err);
  process.exit(1);
});

