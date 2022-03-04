const Track = require('../models/track.model');

async function getAllTracks(req, res) {
  try {
    const dbResponse = await Track.find();
    res.status(200);
    res.send(dbResponse);
    console.log(dbResponse);
  } catch (error) {
    res.status(500);
    console.error(error);
    res.send(error);
  }
}

async function getOneTrack(req, res) {
  try {
    const dbResponse = await Track.findById(req.param.id);
    res.status(200);
    res.send(dbResponse);
    console.log(dbResponse);
  } catch (error) {
    res.status(500);
    console.error(error);
    res.send(error);
  }
}

async function postTrack(req, res) {
  try {
    console.log(req.body);
    const dbResponse = await Track.create({track: JSON.stringify(req.body)});
    res.status(201);
    res.send(dbResponse);
    console.log(dbResponse);
  } catch (error) {
    res.status(400);
    console.error(error);
    res.send(error);
  }
}

module.exports = { getAllTracks, getOneTrack, postTrack};
