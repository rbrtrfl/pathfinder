const express = require('express');
const controller = require('./controllers/track.controller');

const router = express.Router();

router.get('/tracks', controller.getAllTracks);
router.get('/tracks/:id', controller.getOneTrack);
router.post('/tracks', controller.postTrack);

module.exports = router;