const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read album', () => {
  let db;
  let artists;
  let albums;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
        'Tame Impala',
        'Rock',
      ]),
      db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
        'Theo Parrish',
        'Deep House',
      ]),
      db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
        'Nas',
        'Hip-hop',
      ]),
    ]);

    [artists] = await db.query(`SELECT * FROM Artist`);

    await Promise.all([
      db.query(`INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)`, [
        'Innerspeaker',
        2010,
        artists[0].id,
      ]),
      db.query(`INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)`, [
        'First Floor Metaphor',
        1998,
        artists[1].id,
      ]),
      db.query(`INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)`, [
        'Illmatic',
        1994,
        artists[2].id,
      ]),
    ]);

    [albums] = await db.query(`SELECT * FROM Album`);
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/album', () => {
    describe('GET', () => {
      it('returns all album records in the database', async () => {
        const res = await request(app).get('/album').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);
        expect(res.body[0].name).to.equal('Innerspeaker');
        expect(res.body[0].artistId).to.equal(artists[0].id);

        res.body.forEach((albumRecord) => {
          const expected = albums.find((a) => a.id === albumRecord.id);

          expect(albumRecord).to.deep.equal(expected);
        });
      });
    });
  });

  describe('/album/:albumId', () => {
    describe('GET', () => {
      it('returns a single album with the correct id', async () => {
        const expected = albums[0];
        const res = await request(app).get(`/album/${expected.id}`).send();

        expect(res.status).to.equal(200);
        expect(res.body.artist_name).to.equal('Tame Impala');
        expect(res.body.album_name).to.equal('Innerspeaker');
        expect(res.body.year).to.equal(2010);
        expect(res.body.genre).to.equal('Rock');
      });

      it('returns a 404 if the artist is not in the database', async () => {
        const res = await request(app).get('/album/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});
