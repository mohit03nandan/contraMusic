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
db.Song = require('./songModel')(sequelize,DataTypes);

module.exports = db;

