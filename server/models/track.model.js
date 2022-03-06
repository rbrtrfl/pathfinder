const mongoose = require('mongoose');

const { Schema } = mongoose;

const properties = new Schema({
  author: {
    name: { type: String },
  },
  desc: { type: String },
  name: { type: String },
});

const coordinates = new Schema([{
  type: Number,
}]);

const geoJSONSchema = new Schema({
  geojson: {
    type: { type: String },
    properties,
    features: [{
      type: { type: String },
      properties,
      coordinates,
    }],
  },
});

const Track = mongoose.model('track', geoJSONSchema);

module.exports = Track;
