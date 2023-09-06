import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import UserMovie from '@/models/UserMovie';
import User from '@/models/User';

export default async function handler (req, res) {
	const { username } = req.query;
	const session = await getServerSession(req, res, authOptions);
	if (!session || username !== session.username) {
		return res.status(403).send({ message: 'unauthorized' });
	}
	if (req.method === 'GET') return getHandler(username, req, res);
	if (req.method === 'POST') return postHandler(username, req, res);
	if (req.method === 'PATCH') return patchHandler(username, req, res);
	if (req.method === 'DELETE') return deleteHandler(username, req, res);
	else return res.status(400).send({ message: 'forbidden method' });
}

async function getHandler (username, req, res) {
	try {
		const data = await UserMovie.getUsersMovies(username);
		return res.send({ data });
	} catch (err) {
		console.error('API Error: ', err);
		return res.status(500).send({ Error: err.message });
	}
}

async function postHandler (username, req, res) {
	try {
		const { movieId, favorite, rating, watched, watchlist } = req.body;
		const data = await User.addMovie(username, movieId, favorite, rating, watched, watchlist);
		return res.send({ data });
	} catch (err) {
		console.error('API Error:', err.message);
		return res.status(200).send({ Error: err.message });
	}
}

async function patchHandler (username, req, res) {
	try {
		const { movieId } = req.body;
		delete req.body.movieId;
		// const data = await UserMovie.update(username, movieId, req.body);
		const data = await User.updateUserMovie(username, movieId, req.body);
		return res.send({ data });
	} catch (err) {
		console.error('API Error: ', err);
		return res.status(500).send({ Error: err.message });
	}
}

async function deleteHandler (username, req, res) {
	try {
		const { movieId } = req.body;
		const response = await UserMovie.delete(username, movieId);
		return res.send({ response });
	} catch (err) {
		console.error('API Error: ', err);
		return res.status(500).send({ Error: err.message });
	}
}
