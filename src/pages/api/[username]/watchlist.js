import User from '@/models/User';
import Watchlist from '@/models/Watchlist';

export default async function handler (req, res) {
	const { username } = req.query;
	if (req.method === 'GET') return getHandler(username, req, res);
	if (req.method === 'POST') return postHandler(username, req, res);
	if (req.method === 'DELETE') return deleteHandler(username, req, res);
	else return res.status(400).send({ message: 'forbidden method' });
}

async function getHandler (username, req, res) {
	try {
		// const data = await Watchlist.getWatchlist(username);
		const data = await User.getWatchlist(username);
		return res.send({ data });
	} catch (err) {
		console.error("API Error: ", err);
		return res.status(500).send({ Error: err.message });
	}
}

async function postHandler (username, req, res) {
	try {
		const { movieId } = req.body;
		const data = await Watchlist.addMovie(username, movieId);
		// const data = await User.addMovie(username, movieId);
		return res.send({ data });
	} catch (err) {
		console.error('API Error:', err.message);
		return res.status(200).send({ Error: err.message });
	}
}

async function deleteHandler(username, req, res) {
	try {
		const { movieId } = req.body;
		const response = await Watchlist.delete(username, movieId);
		return res.send({ response });
	} catch (err) {
		console.error("API Error: ", err);
		return res.status(500).send({ Error: err.message });
	}
}