// const Sequelize = require('sequelize');
// const sequelize = require('../config/DB');

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Models
// db.User = require('./userModel')(sequelize, Sequelize.DataTypes);

// module.exports = db;

// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load model definition
db.User = require('./userModel')(sequelize, DataTypes);

module.exports = db;

