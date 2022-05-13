const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const artistRoutes = require('./routes/artist');
const albumRoutes = require('./routes/album');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

// Artist Routes
app.use('/artist', artistRoutes);

// Album Routes
app.use('/album', albumRoutes);

module.exports = app;
