const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  message: DataTypes.TEXT,
  date_notification: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Notification.belongsTo(User, { foreignKey: 'conducteurId', as: 'conducteur' });

module.exports = Notification;
