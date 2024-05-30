const express = require('express');
const router = express.Router();
const { getAllReservations, addReservation,getReservationDetailsHandler } = require('../controllers/reservationController');

router.get('/:userId', getAllReservations);
router.post('/addReservation', addReservation);
router.get('/reservation/:id', getReservationDetailsHandler);

module.exports = router;
