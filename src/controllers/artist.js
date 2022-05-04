const { getDb } = require('../services/db');

// Create artist controller
exports.artist_create_post = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query(
      `INSERT INTO Artist (name, genre) VALUE (${name}, ${genre})`
    );
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  await db.close();
};
