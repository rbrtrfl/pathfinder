const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(router);

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tracks');
    app.listen(port, () => {
      console.log(`🪐 Server listening on http://localhost/${port}`); // eslint-disable-line no-console
    });
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
})();
