const Reservation = require('../models/Reservation');

// Get all reservations for a specific user
const getAllReservations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reservations = await Reservation.findAll({
      where: { conducteurId: userId },
    });
    console.log(reservations);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Add a reservation for a user
const addReservation = async (req, res) => {
  try {
    const { conducteurId, parkingId, date_entree } = req.body;
    console.log(req.body);
    const reservation = await Reservation.create({
      conducteurId,
      parkingId,
      date_entree
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { getAllReservations, addReservation };
