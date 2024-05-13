const express = require('express');
const router = express.Router();
const { getAllParkings, getParkingById } = require('../controllers/parkingController');

router.get('/', getAllParkings);
router.get('/:parkingId', getParkingById);

module.exports = router;
