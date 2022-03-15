const Track = require('../models/track.model');

const { addMetadata } = require('../tools/tools');

async function getAllTracks(req, res) {
  try {
    const dbResponse = await Track.find();
    res.status(200);
    res.send(dbResponse);
    // console.log(dbResponse); // eslint-disable-line no-console
  } catch (error) {
    res.status(500);
    console.error(error); // eslint-disable-line no-console
    res.send(error);
  }
}

async function postTrack(req, res) {
  try {
    const fullEntry = addMetadata(req.body);
    const dbResponse = await Track.create(fullEntry);
    res.status(201);
    res.send(dbResponse);
    console.log(dbResponse); // eslint-disable-line no-console
  } catch (error) {
    res.status(400);
    console.error(error); // eslint-disable-line no-console
    res.send(error);
  }
}

module.exports = { getAllTracks, postTrack };
