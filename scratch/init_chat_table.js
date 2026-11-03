const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Healthify@2026',
    database: 'healthify_db'
  });

  console.log('Connected to MySQL.');

  await conn.query(`
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
  `);

  console.log('Table ai_chat_messages created/verified.');
  const [cols] = await conn.query('DESCRIBE ai_chat_messages');
  console.log('Columns in ai_chat_messages:');
  console.table(cols);
  await conn.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

