const express = require('express');
const router = express.Router();

const { loginOrRegister } = require('../controllers/UserControllers');
const { getProfile } = require('../controllers/getProfile');
const protect = require('../Middleware/authMiddleware');
const { getAllUsers } = require('../controllers/AllUser');



router.post('/login', loginOrRegister);

router.get('/profile', protect, getProfile);

router.get('/all-user', getAllUsers)
module.exports = router;
