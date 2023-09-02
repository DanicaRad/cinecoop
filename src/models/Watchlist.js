import db from '../../db';

export default class Watchlist {
	/** getWatchlist: gets user's watchlist with movie metadata
   *  returns [{ movieId, title, posterPath, voteAverage }, ...]
   */

	static async getWatchlist (username) {
		const result = await db.query(
			`SELECT
        m.id AS "movieId",
        m.title AS "title",
        m.poster_path AS "posterPath",
        m.vote_average AS "voteAverage"
      FROM watchlists AS w
      JOIN movies AS m 
        ON w.movie_id = m.id
      WHERE w.username = $1`,
			[ username ]
		);
		return result.rows;
	}

	/** addMovie: adds movie to user's watchlist
   *  returns { movieId }
   */

	static async addMovie (username, movieId) {
		const isDuplicate = await this.getEntry(username, movieId);
		if (isDuplicate) throw new Error(`Movie already in your watchlist`);

		const result = await db.query(
			`INSERT INTO watchlists (username, movie_id)
        VALUES ($1, $2)
        RETURNING username, movie_id AS "movieId"`,
			[ username, movieId ]
		);
		return result.rows[0];
	}

	/** getEntry: gets a single entry from user's watchlist
   *  returns { username, movieId }
   */

	static async getEntry (username, movieId) {
		const result = await db.query(
			`SELECT username, movie_id AS "movieId"
        FROM watchlists
        WHERE username = $1 
        AND movie_id = $2`,
			[ username, movieId ]
		);
		const entry = result.rows[0];
		if (!entry) return false;
		return entry;
	}

	/** delete: deletes movie from watchlist
   *  returns { username, movieId }
   */

	static async delete (username, movieId) {
    try {
      const result = await db.query(
			`DELETE FROM watchlists
        WHERE username = $1
        AND movie_id = $2`,
			[ username, movieId ]
		);
      if (result.rows[0]) return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
	}
}
