import sqlForPartialUpdate from "@/helpers/sql";
import db from "../../db";

/** users watched movies */

// CREATE TABLE users_movies (
//   username text REFERENCES users ON DELETE CASCADE,
//   movie_id integer NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
//   is_favorite boolean NOT NULL DEFAULT false,
//   rating numeric CHECK (rating>= 0 AND rating<=0),
//   watched_at timestamp with time zone,
//   PRIMARY KEY(username, movie_id)
// );

export default class UserMovie {
  /** getUsersMovies: gets user's movies with data
   *
   * returns { movieId, title, posterPath, voteAverge, isFavorite, rating, watchedOn, watchlist }
   */
  static async getUsersMovies(username) {
    try {
      const results = await db.query(
        `SELECT
          um.movie_id AS "movieId",
          m.title AS "title",
          m.poster_path AS "posterPath",
          m.vote_average AS "voteAverage",
          um.is_favorite AS "isFavorite",
          um.rating,
					um.watched_on AS "watchedOn", 
					um.watchlist
				FROM users_movies AS um
        JOIN movies AS m
          ON um.movie_id = m.id
				WHERE username = $1`,
        [username]
      );
      if (!results.rows) {
        return { message: `${username} has not marked any films as watched.` };
      }
      return results.rows;
    } catch (err) {
      return err;
    }
  }

  /** getUsersFavorites: gets user's favorite movies
   *
   * returns { movieId, title, posterPath, voteAverge, isFavorite, rating, watchedOn, watchlist }
   */
  static async getUsersFavorites(username) {
    try {
      const results = await db.query(
        `SELECT
          um.movie_id AS "movieId",
          m.title AS "title",
          m.poster_path AS "posterPath",
          m.vote_average AS "voteAverage",
          um.is_favorite AS "isFavorite",
          um.rating,
					um.watched_on AS "watchedOn", 
					um.watchlist
				FROM users_movies AS um
        JOIN movies AS m
          ON um.movie_id = m.id
				WHERE um.username = $1
				GROUP BY um.movie_id, um.username, m.id`,
        [username]
      );

      return results.rows;
    } catch (err) {
      return err;
    }
  }

  /** gtSingleEntry: checks if movie is in user's movies
   *  returns { username, movieId, isFavorite, rating, watchedOn }
   */

  static async getSingleEntry(username, movieId) {
    const result = await db.query(
      `SELECT
        username,
        movie_id AS "movieId",
        is_favorite AS "isFavorite",
        rating,
        watched_on AS "watchedOn"
      FROM users_movies
        WHERE username = $1
        AND movie_id = $2`,
      [username, movieId]
    );
    let entry = result.rows[0];
    if (!entry) return false;
    // const isDate = Date(entry.watchedOn);
    // console.log('typeof isDate', isDate);
    return entry;
  }

  /** addMovie: adds a movie to user's watchlist
   *
   * returns { username, movieId, isFavorite, rating, watchedAt }
   */

  static async addMovie(
    username,
    movieId,
    isFavorite = false,
    rating = null,
    watchedOn = null
  ) {
    const duplicate = await this.getSingleEntry(username, movieId);
    if (duplicate)
      return { Message: `Movie is already in your watched movies` };

    try {
      let cols = "username, movie_id, is_favorite, ";
      let vars = "$1, $2, $3, ";
      let values = [username, movieId, isFavorite];
      if (rating) {
        cols += "rating, ";
        vars += "$4, ";
        values.push(rating);
      }
      if (watchedOn) {
        cols += "watched_on";
        rating ? (vars += "$5") : (vars += "$4");
        values.push(watchedOn);
      } else {
        cols += "watched_on";
        vars += "current_date";
      }
      const added = await db.query(
        `INSERT INTO users_movies (${cols})
        VALUES (${vars})
        RETURNING
          username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on AS "watchedOn"`,
        values
      );
      return added.rows[0];
    } catch (err) {
      return err;
    }
  }

  /** update: updates any/all favorite, rating, watchedAt
   *
   * returns { username, movieId, isFavorite, rating, watchedAt }
   */

  static async update(username, movieId, data) {
    try {
      const jsToSql = {
        isFavorite: "is_favorite",
        rating: "rating",
        watchedAt: "watched_at",
      };
      const { setCols, values } = sqlForPartialUpdate(data, jsToSql);
      const usernameVarIdx = values.length + 1;
      const movieIdVarIdx = values.length + 2;

      const querySql = `UPDATE users_movies SET ${setCols}
                        WHERE username=$${usernameVarIdx}
                        AND movie_id = $${movieIdVarIdx}
                      RETURNING
                        username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on AS "watchedOn"`;

      const result = await db.query(querySql, [...values, username, movieId]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  /** updateFavorite: adds/ removes movie from user's favorites
   * returns { username, movieId, isFavorite, rating, watchedAt }
   */

  static async updateFavorite(username, movieId, isFavorite) {
    const result = await db.query(
      `UPDATE users_movies SET is_favorite = $1
        WHERE username = $2
        AND movie_id = $3
        RETURNING
          username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on AS "watchedOn"`,
      [isFavorite, username, movieId]
    );
    return result.rows[0];
  }

  /** updateRating: adds/updates user's movie rating
   *
   * returns { username, movieId, isFavorite, rating, watchedAt }
   */

  static async updateRating(username, movieId, rating) {
    const result = await db.query(
      `UPDATE users_movies SET rating = $1
        WHERE username = $2
        AND movie_id = $3
        RETURNING 
          username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on AS "watchedOn"`,
      [rating, username, movieId]
    );
    return result.rows[0];
  }

  /** updateWatchedOn: adds/updates movies's watched_on date
   *
   * returns { username, movieId, isFavorite, rating, watchedAt }
   */

  static async updateWatchedOn(username, movieId, watchedOn) {
    const result = await db.query(
      `UPDATE users_movies SET watched_on = $1
        WHERE username = $2
        AND movie_id = $3
        RETURNING 
          username, movie_id AS movieId, is_favorite AS isFavorite, rating, watched_on AS watchedOn`,
      [watchedOn, username, movieId]
    );
    return result.rows[0];
  }

  /** delete: deletes movie from user's movies
   *  returns {success: true}
   */

  static async delete(username, movieId) {
    try {
      const result = await db.query(
        `DELETE FROM users_movies
        WHERE username = $1
        AND movie_id = $2`,
        [username, movieId]
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  /** markAsUnwatched: removes movie from user's movies, adds to  */

  static async markAsUnwatched(username, movieId) {
    try {
      const added = await db.query(
        `UPDATE users_movies SET watched_at = null
					WHERE username = $1
					AND movie_id = $2
        	RETURNING username, movie_id AS movieId, watched_at as watched`,
        [username, movieId]
      );
      return added.rows[0];
    } catch (err) {
      return err;
    }
  }
}
