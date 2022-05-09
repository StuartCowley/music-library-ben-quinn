const express = require('express');
const albumController = require('../controllers/album');

const router = express.Router();

// GET
router.get('/', albumController.album_read);
router.get('/:albumId', albumController.album_read_id);

// PATCH
router.patch('/:albumId', albumController.album_update);

// DELETE
router.delete('/:albumId', albumController.album_delete);

module.exports = router;
