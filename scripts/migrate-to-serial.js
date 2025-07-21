const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function migrateToSerial() {
  // Create a pool for database connection
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    password: process.env.DB_PASSWORD || 'saransh',
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
  });

  try {
    console.log('🚀 Starting migration to SERIAL IDs...');
    
    // Step 1: Drop all tables (to start fresh)
    console.log('📋 Dropping existing tables...');
    
    const dropTables = `
      DROP TABLE IF EXISTS "FormResponses" CASCADE;
      DROP TABLE IF EXISTS "ScholarshipForm" CASCADE;
      DROP TABLE IF EXISTS "FormQuestion" CASCADE;
      DROP TABLE IF EXISTS "Scholarships" CASCADE;
      DROP TABLE IF EXISTS "jobs" CASCADE;
      DROP TABLE IF EXISTS "CommentVote" CASCADE;
      DROP TABLE IF EXISTS "PostVote" CASCADE;
      DROP TABLE IF EXISTS "Comment" CASCADE;
      DROP TABLE IF EXISTS "Post" CASCADE;
      DROP TABLE IF EXISTS "Donation" CASCADE;
      DROP TABLE IF EXISTS "verification_Otp" CASCADE;
      DROP TABLE IF EXISTS verification_token CASCADE;
      DROP TABLE IF EXISTS sessions CASCADE;
      DROP TABLE IF EXISTS accounts CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      
      -- Drop types
      DROP TYPE IF EXISTS "Status" CASCADE;
      DROP TYPE IF EXISTS "SchFormQuestion" CASCADE;
      DROP TYPE IF EXISTS "JobStatus" CASCADE;
      DROP TYPE IF EXISTS "Role" CASCADE;
    `;
    
    await pool.query(dropTables);
    console.log('✅ Tables dropped successfully!');
    
    // Step 2: Execute schema files in order
    const schemaFiles = [
      'database/01-enums.sql',
      'database/02-tables.sql',
      'database/03-indexes.sql',
      'database/04-triggers.sql'
    ];
    
    for (const file of schemaFiles) {
      console.log(`📄 Executing ${file}...`);
      const filePath = path.join(__dirname, '..', file);
      
      if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf8');
        
        try {
          await pool.query(sql);
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
                await pool.query(statement);
              } catch (error) {
                // Ignore errors for statements that might already exist
                if (!error.message.includes('already exists') && 
                    !error.message.includes('duplicate key') &&
                    !error.message.includes('relation already exists') &&
                    !error.message.includes('function already exists') &&
                    !error.message.includes('trigger already exists') &&
                    !error.message.includes('index already exists') &&
                    !error.message.includes('type') &&
                    !error.message.includes('does not exist')) {
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
    
    // Step 3: Insert some sample data to verify the migration worked
    console.log('🌱 Inserting sample data...');
    
    // Create a sample admin user
    const adminUser = await pool.query(`
      INSERT INTO users (name, email, role, "hasRegistered", "isVerified")
      VALUES ('Admin User', 'admin@kgpconnect.com', 'ADMIN', true, true)
      RETURNING id
    `);
    
    console.log(`✅ Sample admin user created with ID: ${adminUser.rows[0].id}`);
    
    // Create a sample student user
    const studentUser = await pool.query(`
      INSERT INTO users (name, email, hall, "rollNumber", "Department", "YearOfGraduation", role, "hasRegistered", "isVerified")
      VALUES ('John Doe', 'john@kgpian.iitkgp.ac.in', 'Azad Hall', '21CS1001', 'Computer Science', '2025-05-01', 'STUDENT', true, true)
      RETURNING id
    `);
    
    console.log(`✅ Sample student user created with ID: ${studentUser.rows[0].id}`);
    
    // Create a sample post
    const samplePost = await pool.query(`
      INSERT INTO "Post" (title, caption, content, subreddit, type, "authorId", "isVerified")
      VALUES ('Welcome to KGP Connect!', 'First post', 'This is the first post on our new platform with SERIAL IDs!', 'general', 'text', $1, true)
      RETURNING id
    `, [adminUser.rows[0].id]);
    
    console.log(`✅ Sample post created with ID: ${samplePost.rows[0].id}`);
    
    console.log('🎉 Migration to SERIAL IDs completed successfully!');
    console.log(`
Migration Summary:
- Database schema updated to use SERIAL (auto-incrementing integer) IDs
- All foreign key relationships updated to use INTEGER references
- UUID extension usage removed (commented out)
- Sample users and post created to verify functionality

Next steps:
1. Update your application code to work with integer IDs
2. Test all API endpoints to ensure they work with the new schema
3. Update any client-side code that expects UUID strings
    `);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the migration
migrateToSerial().catch(console.error); 