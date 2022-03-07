const mongoose = require('mongoose');

const { Schema } = mongoose;

const properties = new Schema({
  name: { type: String },
  desc: { type: String },
  author: {
    name: { type: String },
  },
  distance: {
    total: { type: Number },
  },
  elevation: {
    max: { type: Number },
    min: { type: Number },
    neg: { type: Number },
    pos: { type: Number },
  },
});

const features = new Schema({
  type: { type: String },
  properties: { type: properties },
  geometry: {
    coordinates: [[{ type: Number }]],
    type: { type: String },
  },
});

const geoJSONSchema = new Schema({
  geojson: {
    type: { type: String },
    properties: { type: properties },
    features: [{ type: features }],
  },
});

const Track = mongoose.model('track', geoJSONSchema);

module.exports = Track;
