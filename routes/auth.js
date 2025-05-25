const express = require('express');
const { signup, login } = require('../controllers/authControllers');
const { AuthenticateToken } = require('../middlewares/AuthenticateToken');

const router = express.Router();

// Routes
router.post('/signup', signup);
router.post('/login', AuthenticateToken, login); 

module.exports = router;
