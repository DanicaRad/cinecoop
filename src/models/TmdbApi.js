import fetch from 'node-fetch';

/** API Class.
 *
 * Static class tying together methods used to get/send to external TMDB API.
 *
 */

export default class TmdbApi {
	/** request: general request method, takes a TMDB API endpoint */

	static async request (endpoint, method = 'GET', settings = { language: 'en-US', page: null }, data = null) {
		// If page number was provided, set it in request url
		let params = settings.page
			? `?language=${settings.language}&page=${settings.page}`
			: `?language=${settings.language}`;
		// const url = `https://api.themoviedb.org/3/${endpoint}${params}`;
		const url = `https://api.themoviedb.org/3/${endpoint}`;
		let options = {
			method: method,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`
			}
		};
		// if data was provided, set request body to data
		if (data) options.body = JSON.stringify(data);
		try {
			return await fetch(url, options);
		} catch (err) {
			console.error('API Error', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	static async getImageConfigs () {
		const res = await this.request('configuration');
		return await res.json();
	}

	static async getMoviesby (endpoint) {
		const res = await this.request(endpoint, 'get');
		return await res.json();
	}

	static async getMovie (id) {
		const res = await this.request(`movie/${id}?&append_to_response=credits`);
		return await res.json();
	}
}
