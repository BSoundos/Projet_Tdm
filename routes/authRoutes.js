const express = require('express');
const router = express.Router();
const {register, login,checkEmailExists} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/checkEmail', checkEmailExists);

module.exports = router;
