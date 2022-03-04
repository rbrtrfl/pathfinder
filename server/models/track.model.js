const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  track: {
    type: String,
    required: true,
  },
});

const Track = mongoose.model('track', eventSchema);

module.exports = Track;
