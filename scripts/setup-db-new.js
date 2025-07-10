const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config();

async function setupDatabase() {
  // Use DB_NAME from env, fallback to 'postgres'
  const dbName = process.env.DB_NAME || 'postgres';

  // Create a pool without specifying database (to create database)
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    password: process.env.DB_PASSWORD || 'saransh',
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
  });

  try {
    console.log('Connecting to PostgreSQL...');
    
    // If using the default 'postgres' database, skip creation
    if (dbName === 'postgres') {
      console.log("Using default 'postgres' database, skipping creation.");
    } else {
      // Check if database exists, if not create it
      const dbExists = await pool.query(
        `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`
      );
      
      if (dbExists.rows.length === 0) {
        console.log(`Creating database ${dbName}...`);
        try {
          await pool.query(`CREATE DATABASE ${dbName}`);
          console.log('Database created successfully!');
        } catch (error) {
          if (error.code === '42P04') {
            console.log(`Database ${dbName} already exists.`);
          } else {
            throw error;
          }
        }
      } else {
        console.log(`Database ${dbName} already exists.`);
      }
    }
    
    await pool.end();
    
    // Now connect to the target database
    const dbPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      password: process.env.DB_PASSWORD || 'saransh',
      database: process.env.DB_NAME || 'postgres',
      user: process.env.DB_USER || 'postgres',
    });
    
    console.log('Setting up schema...');
    
    // Execute files in order
    const files = [
      'database/01-enums.sql',
      'database/02-tables.sql',
      'database/03-indexes.sql',
      'database/04-triggers.sql'
    ];
    
    for (const file of files) {
      console.log(`Executing ${file}...`);
      const filePath = path.join(__dirname, '..', file);
      
      if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf8');
        
        try {
          await dbPool.query(sql);
          console.log(`✅ ${file} executed successfully!`);
        } catch (error) {
          console.error(`❌ Error executing ${file}:`, error.message);
          
          // Try to execute statements individually
          const statements = sql
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
          
          for (const statement of statements) {
            if (statement.trim()) {
              try {
                await dbPool.query(statement);
              } catch (error) {
                // Ignore errors for statements that might already exist
                if (!error.message.includes('already exists') && 
                    !error.message.includes('duplicate key') &&
                    !error.message.includes('relation already exists') &&
                    !error.message.includes('function already exists') &&
                    !error.message.includes('trigger already exists') &&
                    !error.message.includes('index already exists')) {
                  console.error('Error executing statement:', error.message);
                  console.error('Statement:', statement.substring(0, 100) + '...');
                }
              }
            }
          }
        }
      } else {
        console.error(`❌ File not found: ${file}`);
      }
    }
    
    console.log('Database setup completed successfully!');
    await dbPool.end();
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 