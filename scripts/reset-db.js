const { Pool } = require('pg');
require('dotenv').config();

async function resetDatabase() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    password: process.env.DB_PASSWORD || 'saransh',
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
});

  try {
    console.log('Resetting database...');
    
    // Drop all tables, functions, and types
    await pool.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `);
    
    console.log('✅ Database reset successfully!');
    await pool.end();
    
  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
    process.exit(1);
  }
}

resetDatabase(); 