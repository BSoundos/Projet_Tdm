const express = require('express');
const router = express.Router();
const { update,sendNotifications } = require('../controllers/notificationController');

router.post('/update-token', update);
router.get('/send-notifications', sendNotifications);
module.exports = router;
