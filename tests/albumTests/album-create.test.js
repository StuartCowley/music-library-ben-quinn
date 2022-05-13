const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../../src/services/db');
const app = require('../../src/app');

describe('create album', () => {
  let db;
  let artist;

  beforeEach(async () => {
    db = await getDb();
    await db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
      'Tame Impala',
      'rock',
    ]);

    [artist] = await db.query('SELECT * from Artist');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.close();
  });

  describe('/album', () => {
    describe('POST', () => {
      it('creates a new album in the database using artist id', async () => {
        const res = await request(app)
          .post(`/artist/${artist[0].id}/album`)
          .send({
            name: 'Innerspeaker',
            year: 2010,
          });

        expect(res.status).to.equal(201);

        const [[albumEntries]] = await db.query(
          `SELECT * FROM Album WHERE artistId = ${artist[0].id}`
        );

        expect(albumEntries.name).to.equal('Innerspeaker');
        expect(albumEntries.year).to.equal(2010);
        expect(albumEntries.artistId).to.equal(artist[0].id);
      });

      it('returns a 404 if the artist is not in the database', async () => {
        const res = await request(app).delete('/artist/999999/album').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});
