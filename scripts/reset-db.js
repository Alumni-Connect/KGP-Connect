const { Pool } = require('pg');
require('dotenv').config();

async function resetDatabase() {
  const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://postgres:saransh@localhost:5432/postgres',
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