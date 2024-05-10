const express = require('express');
const router = express.Router();
const { getAllReservations, addReservation } = require('../controllers/reservationController');

router.get('/user/:userId', getAllReservations);
router.post('/', addReservation);

module.exports = router;
