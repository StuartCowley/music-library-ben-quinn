const getDb = require('../services/db');

// Create artist controller function
exports.artist_create = async (req, res) => {
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
  const id = req.params.artistId;
  const [[artist]] = await db.query(`SELECT * FROM Artist WHERE id = ?`, [id]);

  try {
    !artist ? res.sendStatus(404) : res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err);
  }

  await db.close();
};

// Updating artist controller function
exports.artist_update = async (req, res) => {
  const db = await getDb();
  const id = req.params.artistId;
  const data = req.body;
  const [[artist]] = await db.query(`SELECT * FROM Artist WHERE id = ?`, [id]);

  try {
    await db.query(`UPDATE Artist SET ? WHERE id = ?`, [data, id]);

    !artist ? res.sendStatus(404) : res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500).JSON(err);
  }

  await db.close();
};
