const express = require('express');
const router = express.Router();
const Controller = require('../controllers/spotifyController').Controller;
const controller = new Controller();

router.get('/search', controller.searchAnything);

module.exports = router;