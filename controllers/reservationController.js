const Reservation = require('../models/Reservation');
const Parking = require('../models/Parking');
const User = require('../models/User');

// Function to get reservation details along with user and parking details
const getReservationDetails = async (reservationId) => {
  try {
    const reservation = await Reservation.findOne({
      where: { id: reservationId },
      include: [
        {
          model: User,
          as: 'conducteur',
          attributes: ['id', 'email', 'firstname', 'lastname', 'token']  // Include necessary user fields
        },
        {
          model: Parking,
          as: 'parking',
          attributes: ['id', 'nom', 'commune', 'description', 'adresse', 'prix', 'dispo', 'places', 'longitude', 'latitude', 'image']  // Include necessary parking fields
        }
      ]
    });

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    return reservation;
  } catch (error) {
    console.error('Error fetching reservation details:', error);
    throw error;
  }
};

const getReservationDetailsHandler = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await getReservationDetails(reservationId);
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
    const { conducteurId, parkingId, date_entree,heure_entree,heure_sortie } = req.body;
    console.log(req.body);
    const reservation = await Reservation.create({
      conducteurId,
      parkingId,
      date_entree,
      heure_entree,
      heure_sortie
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { getAllReservations, addReservation, getReservationDetailsHandler};
