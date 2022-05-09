# Music Library API :notes:

A simple API that allows users to perform CRUD operations on a Music Library (MySQL Database).

## Technologies

- JavaScript
- MySQL
- Express.js
- Node.js
- Mocha, Chai and Supertest

## Installation

- Pull a docker MySQL image and run the container

```
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

- Clone this repository and move into repository directory

```
$ git clone git@github.com:benjQuinn/music-library.git
$ cd music-library
```

- Create a .env file and add local variables to:
  - DB_PASSWORD
  - DB_NAME
  - DB_USER
  - DB_HOST
  - DB_PORT
  - PORT
- Start the project

```
npm start
```
## Routes

### Artist

- Create artist: POST to /artist with request body:
  ```
      {
          "name": "some artist",
          "genre": "some genre"
      }
  ```
- Read all artists: GET to /artist
- Read specific artist: GET to /artist/:artistId
- Update artist: UPDATE to /artist/:artistId with request body:

  ```
      {
          "name": "updated artist",
          "genre": "updated genre"
      }

  ```

- Delete specific artist: DELETE to /artist/:artistId

### Albums

- Create album: POST to /album with request body:
  ```
      {
          "name": "some album",
          "year": 1999
      }
  ```
- Read all albums: GET to /album
- Read specific album: GET to /album/:albumId
- Update album: UPDATE to /album/:albumId with request body:

  ```
      {
          "name": "updated album",
          "year": 2000
      }

  ```

- Delete specific album: DELETE to /album/:albumtId

## Testing

Test Driven Deleopment implemented. Mocha, Chai and Supertest used for integration testing.

To run the tests:

- Create a .env.test with the same variables as the .env file but with a different DB_NAME i.e. `music_library_test`

- Run the tests

```
$ npm test
```
## Credits

[Manchester Codes](https://github.com/MCRcodes) Junior Software Developer Bootcamp backend module project.
