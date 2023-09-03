export default class CinecoopApi {
	static async request (endpoint, method = 'GET', data = null) {
		const url = `/api/${endpoint}`;
		const params = {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		if (data) params.body = JSON.stringify(data);
		try {
			console.log("url and params in Api", url, params);
			return await fetch(url, params);
		} catch (err) {
			console.error('API Error', err);
		}
	}

	static imageConfigurations = 'https://image.tmdb.org/t/p/';

	static async getImageConfgs () {
		const res = await this.request('configuration');
		const configs = await res.json();
		this.imageConfigurations = configs.data.images;
	}
	static async register (data) {
		const res = await this.request('auth/register', 'post', data);
		return await res.json();
	}

	static async login (data) {
		const res = await this.request('auth/signIn', 'post', data);
		return await res.json();
	}

	static async getUsersLists (username) {
		const res = await this.request(`${username}/lists`, 'get');
		return await res.json();
	}

	static async createList (username, data) {
		const res = await this.request(`${username}/lists`, 'post', data);
		return await res.json();
	}

	static async getList (id) {
		const res = await this.request(`lists/${id}`, 'get');
		return await res.json();
	}

	static async likeList (id, data) {
		const res = await this.request(`/lists/${id}`, 'post', data);
		return await res.json();
	}

	static async updateList (id, data) {
		const res = await this.request(`lists/${id}`, 'put', data);
		return await res.json();
	}

	static async addToList (username, listId, data) {
		const res = await this.request(`/${username}/lists/${listId}`, 'post', data);
		return await res.json();
	}

	static async deleteList (id) {
		const res = await this.request(`lists/${id}`, 'delete');
		return await res.json();
	}

	static async markAsWatched (username, data) {
		const res = await this.request(`/${username}/movies`, 'post', data);
		return await res.json();
	}

	static async getWatchlist (username) {
		const res = await this.request(`/${username}/movies`, 'get');
		return await res.json();
	}

	static async getUserMovies (username) {
		const movies = await CinecoopApi.getWatchlist(username);
		console.log('users movies in Cinecoop API', movies);
		const usersMovies = {};
		for (let m of movies.data) {
			usersMovies[m.movieId] = {};
			usersMovies[m.movieId].favorite = m.isFavorite ? true : false;
			usersMovies[m.movieId].watched = m.watchedOn ? m.watchedOn : false;
			usersMovies[m.movieId].rating = m.rating;
			usersMovies[m.movieId].watchlist = m.watchlist;
		}
		return usersMovies;
	}

	static async addToUsersMovies(username, data) {
		const res = await this.request(`${username}/movies`, 'post', data);
		return await res.json();
	}

	static async updateUserMovie(username, data) {
		const res = await this.request(`${username}/movies`, 'PATCH', data);
		return await res.json();
	}

	static async getMovies (endpoint) {
		return await this.request(`movies/${endpoint}`, 'get');
		// return await res.json();
	}

	static async searchMovies (query) {
		const res = await this.request(`movies?title=${query}`, 'get');
		return await res.json();
	}

	static async getMovie (id) {
		const res = await this.request(`movie/${id}`);
		return await res.json();
	}
}
