/** Movie class
 * stores metadata: TMDB id, title, poster_path, background_path
 */
import db from '../../db';

export default class Movie {
	/** checkEntryExists: check if movie is already in db
   * returns true if in db, false if not */

	static async get (id) {
		const result = await db.query(
			`SELECT
        id,
        title,
        poster_path AS "posterPath",
        vote_average AS "voteAverage"
        FROM movies
        WHERE id = $1`,
			[ id ]
		);
		if (!result.rows[0]) return null;
		return result.rows[0];
	}

	/** getMoves: gets all movie data from array of ids
   * returns [ { ...movie }, { ...movie2 } ]
   */

	static async getMovies (ids) {
		const result = await db.query(
			`SELECT id, title, poster_path AS posterPath, vote_average AS voteAverage
      FROM movies 
      WHERE (id) IN ($1)`,
			[ ids ]
		);
	}

	/** addMove: adds movie to db
   * returns { id, title, poster_path, backdrop_path, vote_average }
   */

	static async addMovie (data) {
		if (await Movie.get(data.id)) return;
		const { id, title, poster_path, vote_average } = data;
		const result = await db.query(
			`INSERT INTO movies (id, title, poster_path, vote_average)
        VALUES ($1, $2, $3, $4)
        RETURNING  
          id,
          title,
          poster_path AS posterPath,
          vote_average AS voteAverage`,
			[ id, title, poster_path, vote_average ]
		);
		return result.rows[0];
	}

	static async bulkAddMovies (data) {
		const movies = data.results;
    console.log("movies in model", movies);
		for (let m of movies) {
			console.log('movieId', m.id);
			await this.addMovie(m);
		}
		return;
	}

	/** updateVoteAverage: updates vote average
   * returns { id, title, posterPath, voteAverage }
   */

	static async updateVoteAverage ({ id, vote_average }) {
		const result = await db.query(
			`UPDATE movies SET vote_average = $1
        WHERE id = $2
        RETURNING
          id,
          title,
          poster_path AS posterPath
          vote_average AS voteAverage`,
			[ vote_average, id ]
		);
		return result.rows[0];
	}
}
