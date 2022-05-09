const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update album', () => {
  let db;
  let albums;

  beforeEach(async () => {
    db = await getDb();

    await db.query(`INSERT INTO Album (name, year) VALUES (?, ?)`, [
      'Innerspeaker',
      2010,
    ]);

    [albums] = await db.query(`SELECT * FROM Album`);
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.close();
  });

  describe('/album/:albumId', () => {
    describe('PATCH', () => {
      it('updates a single album with the correct id', async () => {
        const album = albums[0];
        const res = await request(app)
          .patch(`/album/${album.id}`)
          .send({ name: 'new name', year: 2000 });

        expect(res.status).to.equal(200);

        const [[newAlbumRecord]] = await db.query(
          'SELECT * FROM Album WHERE id = ?',
          [album.id]
        );

        expect(newAlbumRecord.name).to.equal('new name');
      });

      it('returns a 404 if the artist is not in the database', async () => {
        const res = await request(app)
          .patch('/artist/999999')
          .send({ name: 'new name' });

        expect(res.status).to.equal(404);
      });
    });
  });
});
