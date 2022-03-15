const express = require('express');
const controller = require('./controllers/track.controller');

const router = express.Router();

router.get('/tracks', controller.getAllTracks);
router.post('/tracks', controller.postTrack);

module.exports = router;
