const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Referencing the database connection

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  token: {  // New field for storing FCM tokens
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
