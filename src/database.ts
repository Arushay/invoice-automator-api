import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// We check if the URL exists, otherwise TypeScript will complain
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing in .env");
  process.exit(1);
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Database connected at:', res.rows[0].now);
  }
});