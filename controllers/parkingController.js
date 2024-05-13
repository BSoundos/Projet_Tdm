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

// Get a parking by ID
const getParkingById = async (req, res) => {
  const { parkingId } = req.params; // Extract the ID from the request parameters

  try {
    const parking = await Parking.findByPk(parkingId);

    if (parking) {
      res.json(parking);
    } else {
      res.status(404).json({ error: 'Parking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Export the getAllParkings and getParkingById functions
module.exports = { getAllParkings, getParkingById };
