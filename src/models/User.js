import db from "../../db";
import bcrypt from "bcrypt";
import sqlForPartialUpdate from "@/helpers/sql";
const BCRYPT_WORK_FACTOR = +process.env.BCRYPT_WORK_FACTOR;

export default class User {
  /** Registers new user -- returns { username, password, first_name, last_name, email, phone } */

  static async register({
    username,
    password,
    firstName,
    lastName,
    email,
    phone,
  }) {
    console.log(
      "form data-",
      username,
      password,
      firstName,
      lastName,
      email,
      phone
    );
    const duplicateCheck = await db.query(
      `SELECT username 
        FROM users 
        WHERE username = $1`,
      [username]
    );
    console.log("duplicateCheck", duplicateCheck.rows);
    if (!duplicateCheck.rows[0]) {
      const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      const result = await db.query(
        `INSERT INTO users (username, password, first_name, last_name, email, phone, join_at)
          VALUES ($1, $2, $3, $4, $5, $6, current_timestamp)
          RETURNING username, password, first_name, last_name, email, phone, join_at`,
        [username, hashedPwd, firstName, lastName, email, phone]
      );
      console.log("results", result.rows[0]);
      return result.rows[0];
    }
    return { msg: "user already exists" };
  }

  /** Authenticate: is this username/password valid?
	 * 
	 * Returns {username, firstName, lastName, email, phone, joinAt, lastLogin}. 
	 * /
	/** username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone */

  static async authenticate({ username, password }) {
    try {
      console.log("username, password in models", username, password);
      const result = await db.query(
        `SELECT 
					username,
					password,
					first_name AS "firstName",
					last_name AS "lastName", 
					email,
					phone, 
					join_at AS "joinAt",
					last_login_at AS "lastLogin"
        FROM users
        WHERE username = $1`,
        [username]
      );
      const user = result.rows[0];
      console.log("user in models", result.rows);
      if (user) {
        if ((await bcrypt.compare(password, user.password)) === true) {
          delete user.password;
          return user;
        }
        return null;
      }
    } catch (e) {
      return e;
    }
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          email
   *          phone } */

  static async get(username) {
    try {
      const user = await db.query(
        `SELECT
						username,
						first_name AS firstName,
						last_name AS lastName,
						email,
						phone,
						join_at AS joinAt
          FROM users
          WHERE username = $1`,
        [username]
      );
      return user.rows[0];
    } catch (e) {
      return;
    }
  }

  static async getAllMovies(username) {
    const watched = await db.query(
      `SELECT
				movie_id AS "movieId",
				is_favorite AS "isFavorite"
				rating
				FROM users
				WHERE username = $1`,
      [username]
    );
  }

  /** getWatchlist: gets user's watchlist
   *
   * returns { username, movieId }
   * favorites: {09234: true},
   * watched: {98345: {rating: 4, watchedOn: }}
   */

  static async getWatchlist(username) {
    try {
      const results = await db.query(
        `SELECT
					movie_id AS "movieId",
					is_favorite AS "isFavorite",
					rating, 	
					watched_on AS "watchedOn"
				FROM users_movies
				WHERE username = $1`,
        [username]
      );
      // if (!results.rows) {
      // 	return { message: 'User does not have any movies added to their watchlist' };
      // }

      return results.rows;
    } catch (err) {
      return err;
    }
  }

  /** addMovie: adds a movie to user's watchlist
   *
   * returns { username, movieId, isFavorite, rating, watchedAt }
   */

  static async addMovie(
    username,
    movieId,
    favorite = false,
    rating = null,
    watched = false,
    watchlist = false
  ) {
    // const duplicate = await this.getSingleEntry(username, movieId);
    // if (duplicate) return { Message: `Movie is already in your watched movies` };

    try {
      let cols = "username, movie_id, is_favorite, watchlist, ";
      let vars = "$1, $2, $3, $4, ";
      let values = [username, movieId, favorite, watchlist];
      if (rating) {
        cols += "rating, ";
        vars += "$5, ";
        values.push(rating);
      }
      cols += "watched_on";
      watched ? (vars += "current_date") : (vars += "null");
      const added = await db.query(
        `INSERT INTO users_movies (${cols})
        VALUES (${vars})
        RETURNING
          username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on AS "watchedOn", watchlist`,
        values
      );
      return added.rows[0];
    } catch (err) {
      console.log("error in user model", err);
      return err;
    }
  }

  /** updateUserMovie: updates any/all favorite, rating, watchedOn
   *
   * returns { username, movieId, isFavorite, rating, watchedOn }
   */

  static async updateUserMovie(username, movieId, data) {
    try {
      console.log("data in updateUserMovie", data);
      if (data.favorite !== undefined)
        return await User.addOrRemoveFromFavorites(
          data.favorite,
          username,
          movieId
        );
      if (data.watched) return await User.markAsWatched(username, movieId);
      if (data.watched === false)
        return await User.markAsUnwatched(username, movieId);

      const jsToSql = {
        favorite: "is_favorite",
        rating: "rating",
        watched: "watched_on",
        watchlist: "watchlist",
      };
      const { setCols, values } = sqlForPartialUpdate(data, jsToSql);
      const usernameVarIdx = values.length + 1;
      const movieIdVarIdx = values.length + 2;

      const querySql = `UPDATE users_movies SET ${setCols}
                        WHERE username=$${usernameVarIdx}
                        AND movie_id = $${movieIdVarIdx}
                      RETURNING
                        username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on AS "watchedOn", watchlist`;

      const result = await db.query(querySql, [...values, username, movieId]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  /** addOrRemoveFromFavorites: adds movie to user's favorites
   *
   * returns { username, movieId, isFavoriter, rating, watchedOn, watchlist }
   */

  static async addOrRemoveFromFavorites(favorite, username, movieId) {
    try {
      console.log("addOrRemoveFromFavorites", favorite);
      const added = await db.query(
        `UPDATE users_movies SET is_favorite = $1
					WHERE username = $2
					AND movie_id = $3
        	RETURNING username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on as "watchedOn", watchlist`,
        [favorite, username, movieId]
      );
      return added.rows[0];
    } catch (err) {
      return err;
    }
  }

  /** markAsWatched: marks movie on user's watchlist as watched
   * defaults watched_at set to current_timestamp
   *
   * BONUS TBD UPDATE: watched_at can be set by user
   *
   * returns { username, movieId, watched }
   */

  static async markAsWatched(username, movieId) {
    try {
      const added = await db.query(
        `UPDATE users_movies SET watched_on = current_timestamp, watchlist = false
					WHERE username = $1
					AND movie_id = $2
        	RETURNING username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on as "watchedOn", watchlist`,
        [username, movieId]
      );
      return added.rows[0];
    } catch (err) {
      return err;
    }
  }

  static async markAsUnwatched(username, movieId) {
    try {
      const added = await db.query(
        `UPDATE users_movies SET watched_on = null
					WHERE username = $1
					AND movie_id = $2
        	RETURNING username, movie_id AS "movieId", is_favorite AS "isFavorite", rating, watched_on as "watchedOn", watchlist`,
        [username, movieId]
      );
      return added.rows[0];
    } catch (err) {
      return err;
    }
  }

  /** getAllLists: get all user's lists without movie data
   *  returns { listId, name, username, description, created_at }
   */

  static async getAllLists(username) {
    const result = await db.query(
      `SELECT 
				l.id, l.name, l.description, l.is_private AS "isPrivate", l.created_at AS "createdAt", COUNT(ml.list_id) AS "movieCount"
			FROM lists
			JOIN movies_lists AS ml
			ON lists.id = ml.list_id
			GROUP BY l.id, ml.list_id
			ORDER BY l.created_at
			WHERE username = $1`,
      [username]
    );
    return result.rows;
  }
}
