const getDb = require('../services/db');

// Create artist controller function
exports.artist_create_post = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
      name,
      genre,
    ]);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).json(err);
  }

  await db.close();
};

// Read artists controller function
exports.artist_read = async (req, res) => {
  const db = await getDb();

  try {
    const artists = await db.query(`SELECT * FROM Artist`);

    res.status(200).json(artists[0]);
  } catch (err) {
    res.status(500).json(err);
  }

  await db.close();
};

// Get artist by id controller function
exports.artist_read_id = async (req, res) => {
  const db = await getDb();

  const [[artist]] = await db.query(
    `SELECT * FROM Artist WHERE id = ?`, [req.params.artistId]);
  
  !artist ? res.sendStatus(404) : res.status(200).json(artist);

  await db.close();
};
