require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();
const expressHost = process.env.EXPRESS_PORT;
const expressPort = process.env.HOST;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(router);

(async () => {
  try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/tracks`);
    app.listen(expressPort, () => {
      console.log(`🪐 Server listening on http://${expressHost}/${expressPort}`); // eslint-disable-line no-console
    });
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
})();
