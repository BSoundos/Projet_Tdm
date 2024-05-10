const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');  // Importing User model
const Parking = require('./Parking');  // Importing Parking model

const Reservation = sequelize.define('Reservation', {
  date_entree: DataTypes.DATEONLY,
  heure_entree: DataTypes.STRING,
  heure_sortie: DataTypes.STRING,
  code_qr: DataTypes.STRING,
});

Reservation.belongsTo(User, { foreignKey: 'conducteurId', as: 'conducteur' });
Reservation.belongsTo(Parking, { foreignKey: 'parkingId', as: 'parking' });

module.exports = Reservation;
