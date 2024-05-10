const Parking = require('../models/Parking');

// Get all parkings
const getAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.findAll();
    res.json(parkings);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { getAllParkings };
