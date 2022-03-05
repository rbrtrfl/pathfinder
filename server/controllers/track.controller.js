const Track = require('../models/track.model');

async function getAllTracks(req, res) {
  try {
    const dbResponse = await Track.find();
    res.status(200);
    res.send(dbResponse);
    console.log(dbResponse); // eslint-disable-line no-console
  } catch (error) {
    res.status(500);
    console.error(error); // eslint-disable-line no-console
    res.send(error);
  }
}

async function getOneTrack(req, res) {
  try {
    const dbResponse = await Track.findById(req.param.id);
    res.status(200);
    res.send(dbResponse);
    console.log(dbResponse); // eslint-disable-line no-console
  } catch (error) {
    res.status(500);
    console.error(error); // eslint-disable-line no-console
    res.send(error);
  }
}

async function postTrack(req, res) {
  try {
    const dbResponse = await Track.create(req.body);
    res.status(201);
    res.send(dbResponse);
    console.log(dbResponse); // eslint-disable-line no-console
  } catch (error) {
    res.status(400);
    console.error(error); // eslint-disable-line no-console
    res.send(error);
  }
}

module.exports = { getAllTracks, getOneTrack, postTrack };