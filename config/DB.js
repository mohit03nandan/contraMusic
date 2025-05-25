// config/database.js
const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Creates a PostgreSQL pool using the DATABASE_URL from environment variables.
 * @returns {Pool} PostgreSQL Pool instance
 */
const dbUrl = process.env.DATABASE_URL;
const createDatabasePool = () => {
  

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

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

module.exports = { createDatabasePool , sequelize};
