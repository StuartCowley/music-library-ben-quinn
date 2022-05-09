const db = require('../services/db');
const getDb = require('../services/db');

// Create album controller function
exports.album_create = async (req, res) => {
  const db = await getDb();
  const id = req.params.artistId;
  const { name, year } = req.body;
  const [[artist]] = await db.query(`SELECT * FROM Artist WHERE id = ?`, [id]);

  try {
    await db.query(
      `INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)`,
      [name, year, id]
    );

    !artist ? res.sendStatus(404) : res.sendStatus(201);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }

  await db.close();
};

// Read albums controller function
exports.album_read = async (req, res) => {
  const db = await getDb();

  try {
    const albums = await db.query(`SELECT * FROM Album`);

    res.status(200).json(albums[0]);
  } catch (err) {
    res.status(500).json(err);
  }

  await db.close();
};

// Get album by id controller function
exports.album_read_id = async (req, res) => {
  const db = await getDb();
  const id = req.params.albumId;
  const [[album]] = await db.query(
    `SELECT Artist.name as artist_name, Album.id as album_id, Album.name as album_name, Album.year, Artist.genre, Album.artistId
      FROM Artist
      JOIN Album
      ON Artist.id = Album.artistId
      WHERE Album.id = ?`,
    [id]
  );

  try {
    !album ? res.sendStatus(404) : res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err);
  }

  await db.close();
};

// Update album controller function
exports.album_update = async (req, res) => {
  const db = await getDb();
  const id = req.params.albumId;
  const data = req.body;
  const [[album]] = await db.query(`SELECT * FROM Album WHERE id = ?`, [id]);

  try {
    await db.query(`UPDATE Album SET ? WHERE id = ?`, [data, id]);

    !album ? res.sendStatus(404) : res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }

  await db.close();
};
