const express = require('express');
const router = express.Router();
const Controller = require('../controllers/loginController').Controller;
const controller = new Controller();

router.post('/checkCredentials',controller.verifyCredentials);
router.post('/register',controller.createUser);

module.exports = router;