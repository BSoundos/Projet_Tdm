const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
});

module.exports = sequelize;
