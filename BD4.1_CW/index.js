let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4.1_CW/database.sqlite',
    driver: sqlite3.Database,
  });
})();

// Fetch All Movies
/* Create an endpoint "/movies"  that fetches all the movies from the database
get
/movies */

async function fetchAllMovies() {
  let query = 'SELECt * FROM movies';
  let response = await db.all(query, []);
  return { movies: response };
}
app.get('/movies', async (req, res) => {
  let result = await fetchAllMovies();
  res.status(200).json(result);
});

// Fetch movies by genre
/*  Create an endpoint that fetches movies based on genere from the database. */

async function fetchMoviesByGenre(genre) {
  let query = 'SELECT * FROM movies WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { movies: response };
}

app.get('/movies/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let result = await fetchMoviesByGenre(genre);
  res.status(200).json(result);
});

// Fetch movies By id
/* Create an endpoint that fetches movies based on id from the database */
// movies/details/:id

async function fetchMoviesById(id) {
  let query = 'SELECT * FROM movies WHERE id = ?';
  let response = await db.all(query, [id]);
  return { movies: response };
}

app.get('/movies/details/:id', async (req, res) => {
  let id = req.params.id;
  let result = await fetchMoviesById(id);
  res.status(200).json(result);
});

// Fetch movies by release year
/* Create an endpoint that fetches movies based on release year from the datavase */
//  /movies/release-year/:release-year

async function fetchMoviesByYear(releaseYear) {
  let query = 'SELECT * FROM movies WHERE release_year = ? ';
  let response = await db.all(query, [releaseYear]);
  return { movies: response };
}

app.get('/movies/release-year/:year', async (req, res) => {
  let releaseYear = req.params.year;
  let result = await fetchMoviesByYear(releaseYear);
  res.status(200).json(result);
});

app.listen(PORT, () => console.log('server runniong on port 3000'));
