const express = require('express');
const router = express.Router();
const Controller = require('../controllers/sessionController').Controller;
const controller = new Controller();

router.post('/logout',controller.logout);

module.exports = router;