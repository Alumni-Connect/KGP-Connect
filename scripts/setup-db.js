const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config();

async function setupDatabase() {
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
    
    // Check if database exists, if not create it
    const dbExists = await pool.query(
      "SELECT 1 FROM pg_database WHERE datname = 'kgp_connect'"
    );
    
    if (dbExists.rows.length === 0) {
      console.log('Creating database kgp_connect...');
      await pool.query('CREATE DATABASE kgp_connect');
      console.log('Database created successfully!');
    } else {
      console.log('Database kgp_connect already exists.');
    }
    
    await pool.end();
    
    // Now connect to the kgp_connect database
    const dbPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      password: process.env.DB_PASSWORD || 'saransh',
      database: process.env.DB_NAME || 'postgres',
      user: process.env.DB_USER || 'postgres',
    });
    
    console.log('Setting up schema...');
    
    // Read and execute schema file
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema in proper order
    console.log('Executing schema...');
    
    // Split the schema into sections and execute them properly
    const schemaSections = schema.split('-- Create');
    
    for (let i = 1; i < schemaSections.length; i++) {
      const section = '-- Create' + schemaSections[i];
      console.log(`Executing section ${i}...`);
      
      try {
        // Execute the entire section
        await dbPool.query(section);
      } catch (error) {
        console.log(`Section ${i} failed, trying individual statements...`);
        
        // Split by semicolon and execute each statement in this section
        const statements = section
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
    }
    
    console.log('Database setup completed successfully!');
    await dbPool.end();
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 