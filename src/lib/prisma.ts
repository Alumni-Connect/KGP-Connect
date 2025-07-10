import { Pool } from 'pg';

// You can set your connection string here or use environment variables
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  password: process.env.DB_PASSWORD || 'saransh',
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export { pool };
