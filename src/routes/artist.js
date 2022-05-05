const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

// GET
router.get('/', artistController.artist_read);
router.get('/:artistId', artistController.artist_read_id);

// POST
router.post('/', artistController.artist_create_post);

module.exports = router;
