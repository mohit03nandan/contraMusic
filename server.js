// server.js
const express = require('express');
const dotenv = require('dotenv');
const { createDatabasePool } = require('./config/DB');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 7999;

// Setup DB connection
const dbPool = createDatabasePool();

// Example route to test DB connection
app.get('/health', async (req, res) => {
  try {
    const result = await dbPool.query('SELECT NOW()');
    res.status(200).json({
      message: 'Database connected successfully',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
