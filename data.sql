\c cinecoop;

DROP TABLE IF EXISTS movies_lists;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS users_movies;
DROP TABLE IF EXISTS watchlists;
-- DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE movies (
  id integer PRIMARY KEY,
  title text NOT NULL,
  poster_path text NOT NULL,
  vote_average numeric NOT NULL
);

CREATE TABLE users_movies (
  username text REFERENCES users ON DELETE CASCADE,
  movie_id integer NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  is_favorite boolean NOT NULL DEFAULT false,
  rating integer CHECK (rating>= 0 AND rating<=10),
  watched_on date,
  watchlist boolean NOT NULL DEFAULT false,
  PRIMARY KEY(username, movie_id)
);

CREATE TABLE watchlists (
  username text REFERENCES users ON DELETE CASCADE,
  movie_id integer NOT NULL REFERENCES movies (id) ON DELETE CASCADE,
  PRIMARY KEY(username, movie_id)
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  description text,
  username text REFERENCES users ON DELETE CASCADE,
  is_private boolean NOT NULL,
  created_at timestamp with time zone NOT NULL
);

CREATE TABLE lists_likes (
  list_id integer REFERENCES lists (id) ON DELETE CASCADE,
  username text REFERENCES users on DELETE CASCADE,
  PRIMARY KEY(list_id, username)
);

CREATE TABLE movies_lists (
  list_id integer REFERENCES lists (id) ON DELETE CASCADE,
  movie_id integer NOT NULL REFERENCES movies (id) ON DELETE CASCADE,
  PRIMARY KEY(list_id, movie_id)
);