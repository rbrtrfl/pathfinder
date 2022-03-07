const express = require('express');
const controller = require('./controllers/track.controller');

const router = express.Router();

router.get('/tracks', controller.getAllTracks);
router.post('/tracks', controller.postTrack);
router.post('/route', controller.postRoute);

module.exports = router;
