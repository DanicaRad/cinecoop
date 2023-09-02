// show details about a single movie
import TmdbApi from '@/models/TmdbApi';
import Movie from '@/models/Movie';

export default async function handler (req, res) {
	if (req.method === 'GET') {
		return getHandler(req, res);
	} else {
		return res.status(400).send({ msg: 'forbidden method' });
	}
};

async function getHandler (req, res) {
  try {
    const { endpoint } = req.query;
		const data = await TmdbApi.getMoviesby(`movie/${endpoint}`);
		return res.send({ data });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}