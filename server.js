// server.js
const express = require('express');
const dotenv = require('dotenv');
const { createDatabasePool } = require('./config/DB');
const authRoutes = require("./routes/auth")

const db = require('./models')

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRoutes);



// Setup DB connection
const dbPool = createDatabasePool();

// Test DB connection
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

db.sequelize.sync({ alter: true }) // or use { force: true } only for development
  .then(() => {
    console.log('✅ Database synced');

    // Start server only after DB is ready
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err.message);
  });

// Start server
const PORT = process.env.PORT || 7999;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
