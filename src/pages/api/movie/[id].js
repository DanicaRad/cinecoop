import TmdbApi from '@/models/TmdbApi';
import Movie from '@/models/Movie';

/** // Gets details on a single movie */

export default async function handler (req, res) {
	if (req.method === 'GET') {
		return getHandler(req, res);
	} else {
		return res.status(400).send({ message: 'forbidden method' });
	}
}

async function getHandler (req, res) {
	try {
		const { id } = req.query;
		let data = await TmdbApi.getMovie(id);
		Movie.addMovie(data);
		return res.send({ data });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}
