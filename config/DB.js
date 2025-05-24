// config/database.js
const { Pool } = require('pg');

/**
 * Creates a PostgreSQL pool using the DATABASE_URL from environment variables.
 * @returns {Pool} PostgreSQL Pool instance
 */
const createDatabasePool = () => {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("❌ DATABASE_URL is not defined in environment variables.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false, // Required for Neon PostgreSQL
    },
  });

  return pool;
};

module.exports = { createDatabasePool };
