const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Referencing the database connection

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
