const express = require('express');
const router = express.Router();
const { getAllReservations, addReservation } = require('../controllers/reservationController');

router.get('/:userId', getAllReservations);
router.post('/addReservation', addReservation);

module.exports = router;
