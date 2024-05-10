const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Parking = sequelize.define('Parking', {
  nom: { type: DataTypes.STRING, allowNull: false },
  commune: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  adresse: { type: DataTypes.STRING },
  prix: { type: DataTypes.STRING },
  dispo: { type: DataTypes.BOOLEAN, defaultValue: false },
  places: { type: DataTypes.INTEGER, defaultValue: 0 },
  longitude: { type: DataTypes.FLOAT },
  latitude: { type: DataTypes.FLOAT },
  image: { type: DataTypes.STRING, allowNull: true },  // Field to store the image path or URL
}, {
  timestamps: true,  // Sequelize manages 'createdAt' and 'updatedAt'
});

module.exports = Parking;
