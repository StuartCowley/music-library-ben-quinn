const express = require('express');
const artistRoutes = require('./routes/artist');
const albumRoutes = require('./routes/album');

const app = express();

app.use(express.json());

// Artist Routes
app.use('/artist', artistRoutes);

// Album Routes
app.use('/album', albumRoutes);

module.exports = app;
