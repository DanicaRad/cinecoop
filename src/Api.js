
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

	static async signIn(data) {
		const res = await this.request('auth/signIn', 'post', data);
		return await res.json();
	}

	static async getUsersLists (username) {
		const res = await this.request(`${username}/lists`, 'get');
		return await res.json();
	}

	/**
	 * getUsersListsOnInitialLoad: returns all lists for user and formats movies as object for faster indexing in components
	 * 
	 * returns [{id, name, isPrivate, description, movies: {id: true...}}]
	 */

	static async getUsersListsOnInitialLoad(username) {
		const res = await CinecoopApi.getUsersLists(username);
		const lists = res.data.map(l => {
			let movieObj = {}
				l.movies.map(m => {
				movieObj[m.id] = true
				})
			return {...l, movies: movieObj}
		});
		return lists;
	}

	static async getAllLists() {
		const res = await this.request(`lists`, 'get');
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

	static async getUserMovies (username) {
		const res = await this.request(`/${username}/movies`, "get");
		const movies = await res.json();
		return CinecoopApi.formatUsersMovies(movies.data);
	}

	static async getUsersFavorites(username) {
		const res = await this.request(`${username}/favorites`, 'get');
		return await res.json();
	}

	static formatUsersMovies(data) {
		const movies = {};
		for (let d of data) {
			movies[d.movieId] = {};
			movies[d.movieId].favorite = d.isFavorite ? true : false;
			movies[d.movieId].watched = d.watchedOn ? d.watchedOn : false;
			movies[d.movieId].rating = d.rating;
			movies[d.movieId].watchlist = d.watchlist;
		}
		return movies;
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
		const res = await this.request(`movies/${endpoint}`, 'get');
		return await res.json();
	}

	static async getMoviesByYear() {
		
	}

	static async searchMovies (query) {
		const res = await this.request(`movies?title=${query}`, 'get');
		return await res.json();
	}

	static async getMovie (id) {
		const res = await this.request(`movie/${id}`);
		return await res.json();
	}

	static async coffee() {
		const res = await this.request(`getcoffee`, 'get');
		return await res.json();
	}
}
