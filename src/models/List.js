import db from '../../db';
import sqlForPartialUpdate from '@/helpers/sql';

export default class List {
	/** 
   * getList: gets list by id
   * returns { id, username, name, isPrivate }
   */

	// static async getList (id) {
	// 	try {
	// 		const result = await db.query(
	// 			`SELECT
	// 				id, name, username, description, is_private AS "isPrivate", created_at AS "createdAt"
	//       FROM lists
	//       WHERE id = $1`,
	// 			[ id ]
	// 		);
	// 		const list = result.rows[0];
	// 		// if(!list) return {error: "list not found"}
	// 		return list;
	// 	} catch (err) {
	// 		return { err };
	// 	}
	// }

	static async getList (id) {
		try {
			const result = await db.query(
				`SELECT
					l.id AS "id", l.name AS "name", l.username AS "username", l.description AS "description", l.is_private AS "isPrivate", l.created_at AS "createdAt", COUNT(ll.list_id) AS "likes"
        FROM lists AS l
				LEFT JOIN lists_likes AS ll
					ON l.id = ll.list_id
        WHERE l.id = $1
				GROUP BY l.id, ll.list_id`,
				[ id ]
			);
			const list = result.rows[0];

			if (!list) return { error: 'list not found' };

			list.likes = +list.likes;
			return list;
		} catch (err) {
			return { err };
		}
	}

	/** getAllLists: shows all users public lists
	 *  returns { listId, name, username, description, created_at }
	 */

	static async getAllLists () {
		const result = await db.query(
			`SELECT 
				id, name, username, description, is_private AS "isPrivate", created_at AS "createdAt", 
			FROM lists
			WHERE is_private = $1`,
			[ false ]
		);
		return result.rows;
	}

	/** getListWithMovies: gets list data and movie data
	 * returns { ...list, movies: [...movies]}
	 */

	static async getListWithMovies (listId) {
		let list = await List.getList(listId);
		const { username } = list;

		const movies = await db.query(
			`SELECT 
					m.id AS "id",
					m.title AS "title",
					m.poster_path AS "posterPath",
					m.vote_average AS "voteAverage",
					um.watched_on AS "watchedOn",
					um.is_favorite AS "isFavorite",
					um.rating AS "rating"
				FROM movies_lists as ml
				JOIN movies as m
					ON ml.movie_id = m.id
				LEFT OUTER JOIN users_movies AS um
					ON ml.movie_id = um.movie_id AND um.username = $2
				WHERE ml.list_id = $1`,
			[ +listId, username ]
		);
		list.movies = movies.rows;

		return list;
	}

	/** getUsersPublicListsWithMovies: 
	 *  returns:
	 *  {id, name, description, username, movies: [... { id, title, posterPath, voteAverage }]}
	 */

	static async getUsersPublicLists (username) {
		const result = await db.query(
			`SELECT
					l.id AS "listId",
					l.name AS "listName",
					l.username AS "username",
					l.description AS "listDescription",
					m.title AS "title",
					m.id AS "id",
					m.poster_path AS "posterPath",
					m.vote_average AS "voteAverage",
					COUNT(ll.list_id) AS "likes"
				FROM movies_lists AS ml
				JOIN movies AS m
					ON ml.movie_id = m.id
				RIGHT JOIN lists AS l
					ON ml.list_id = l.id
				LEFT JOIN lists_likes AS ll
					ON ml.list_id = ll.list_id
				WHERE l.username = $1
				AND l.is_private = false
				GROUP BY l.id, m.id, m.title, ll.list_id`,
			[ username ]
		);

		return this.formatList(result.rows);
	}

	/** getUsersOwnLists: gets all user's lists, including private
	 *  returns:
	 * {id, name, description, username, movies: [... { id, title, posterPath, voteAverage }]}
	 */

	static async getUsersOwnLists (username) {
		const result = await db.query(
			`SELECT
					l.id AS "listId",
					l.name AS "listName",
					l.username AS "username",
					l.description AS "listDescription",
					m.title AS "title",
					m.id AS "id",
					m.poster_path AS "posterPath",
					m.vote_average AS "voteAverage"
				FROM movies_lists AS ml
				JOIN movies AS m
					ON ml.movie_id = m.id
				RIGHT JOIN lists AS l
					ON ml.list_id = l.id
				WHERE l.username = $1
				GROUP BY l.id, m.id, m.title`,
			[ username ]
		);

		return this.formatList(result.rows);
	}

	static formatList (data) {
		let lists = {};

		for (let l of data) {
			if (!lists[l.listId]) {
				lists[l.listId] = {
					id: l.listId,
					name: l.listName,
					description: l.description,
					username: l.username,
					likes: +l.likes,
					movies: l.id
						? [ { id: l.id, title: l.title, posterPath: l.posterPath, voteAverage: l.voteAverage } ]
						: []
				};
			} else if (l.id) {
				const { id, title, posterPath, voteAverage } = l;
				lists[l.listId].movies.push({ id, title, posterPath, voteAverage });
			} else return;
		}
		return Object.values(lists);
	}

	/** CreateList: create new list for user
   * 
   * returns { id, username, name, isPrivate }
   */

	static async createList (username, name, isPrivate, description) {
		try {
			console.log('username, name, isPrivate, description', username, name, isPrivate, description);
			const list = await db.query(
				`INSERT INTO lists (username, name, description, is_private, created_at)
        VALUES ($1, $2, $3, $4, current_timestamp)
        RETURNING
					id, username, name, description, is_private AS "isPrivate", created_at AS "createdAt"`,
				[ username, name, description, isPrivate ]
			);
			return list.rows[0];
		} catch (err) {
			return err;
		}
	}

	/**listList: adds like to list 
	 * 
	 * returns true or false
	 */

	static async likeList (listId, username) {
		const result = await db.query(
			`INSERT INTO lists_likes (list_id, username)
				VALUES $1, $2
			RETURNING list_id, username`,
			[ listId, username ]
		);
		if (!result.rows[0]) return false;
		return true;
	}

	static testPartialUpdate (data) {
		const jsToSql = { name: 'name', description: 'description', isPrivate: 'is_private' };
		const testSql = sqlForPartialUpdate(data, jsToSql);
		console.log('testSql', testSql);
	}

	/** updateList: updates name and/or isPrivate status of user's list
	 * can usr sqlForPartialUpdate helper
	 * 
	 * returns { id, name, username, isPrivate }
	 */

	static async updateList (id, data) {
		const jsToSql = { name: 'name', description: 'description', isPrivate: 'is_private' };
		const { setCols, values } = sqlForPartialUpdate(data, jsToSql);
		const idVarIdx = values.length + 1;

		const querySql = `UPDATE lists SET ${setCols}
										WHERE id=$${idVarIdx}
										RETURNING id, name, username, description, is_private as "isPrivate"`;

		const result = await db.query(querySql, [ ...values, id ]);
		const updatedList = result.rows[0];

		if (!updatedList) return { message: 'list not found' };
		return updatedList;
	}

	/** addToList: add movie to user's list 
	 * returns { list_id, movie_id }
	*/
	static async addToList (listId, movieId) {
		try {
			const added = await db.query(
				`INSERT INTO movies_lists (list_id, movie_id)
        VALUES ($1, $2)
        RETURNING list_id, movie_id`,
				[ listId, movieId ]
			);
			return added.rows[0];
		} catch (err) {
			return err;
		}
	}

	/** removeFromList: removes movie from list
	 * 
	 * returns { success: true } 
	 */
	static async removeFromList ({ listId, movieId }) {
		try {
			const deleted = await db.query(
				`DELETE FROM movies_lists
        WHERE list_id=$1
        AND movie_id=$2`,
				[ listId, movieId ]
			);
			return { success: true };
		} catch (err) {
			return { success: false, message: err.message };
		}
	}

	/** deleteList: deletes list
   * 
   * returns { name: listName }
   */

	static async deleteList (id) {
		try {
			const deleted = await db.query(
				`DELETE FROM lists
          WHERE id = $1
          RETURNING name`,
				[ id ]
			);
			return deleted.rows[0];
		} catch (err) {
			return err;
		}
	}
}
