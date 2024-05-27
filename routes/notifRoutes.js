const express = require('express');
const router = express.Router();
const { update } = require('../controllers/notificationpush');

router.post('/update-token', update);

module.exports = router;
