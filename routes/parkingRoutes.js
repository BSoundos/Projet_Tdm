const express = require('express');
const router = express.Router();
const { getAllParkings } = require('../controllers/parkingController');

router.get('/', getAllParkings);

module.exports = router;
