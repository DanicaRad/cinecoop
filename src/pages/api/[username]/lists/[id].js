import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import List from '@/models/List';

export default async function handler (req, res) {
	const { username, id } = req.query;
	const session = await getServerSession(req, res, authOptions);
	if (req.method === 'GET') return getHandler();
	if (!session || session.username !== username) {
		return res.status(403).send({ message: "unathorized" });
	}
	if (req.method === 'POST') return postHandler();
	if (req.method === 'PATCH') return patchHandler();
	if (req.method === 'PUT') return putHandler();
	if (req.method === 'DELETE') return deleteHandler();
	else return res.status(400).send({ message: 'forbidden method' });

	async function getHandler () {
		try {
			const data = await List.getListWithMovies(+id, username);
			if (data.isPrivate && (!session || session.username !== username)) {
				return res.status(403).send({ messasge: 'unauthorized' });
			}
			return res.send({ data });
		} catch (err) {
			console.error('API Error:', err);
			return res.status(500).send({ err });
		}
	}

	async function postHandler () {
		// works!
		try {
			const { movieId } = req.body;
			const result = await List.addToList(id, movieId);
			return res.send({ result });
		} catch (err) {
			console.error('API Error:', err);
			return res.status(500).send({ err });
		}
	}

	async function patchHandler () {
		// works!
		try {
			const result = await List.updateList(id, req.body);
			return res.send({ result });
		} catch (err) {
			console.error('API Error:', err);
			return res.status(500).send({ err });
		}
	}

	async function putHandler () {
		// works!
		try {
			const { movieId, action } = req.body;
			const response =
				action === 'remove' ? await List.removeFromList(id, movieId) : await List.addToList(id, movieId);
			return res.send({ response });
		} catch (err) {
			console.error('API Error: ', err);
			return res.status(500).send({ Error: err.message });
		}
	}

	async function deleteHandler () {
		try {
			const response = await List.deleteList(id);
			return res.send({ response });
		} catch (err) {
			console.error('API Error:', err);
			return res.status(500).send({ err });
		}
	}
}

// async function getHandler (id, username, req, res) {
// 	// works!
// 	try {
// 		console.log('id, username', id, username);
// 		const data = await List.getListWithMovies(+id, username);
// 		if (data.isPrivate && (!session || session.username !== username)) {
// 			return res.status(403).send({ messasge: 'unauthorized' });
// 		}
// 		return res.send({ data });
// 	} catch (err) {
// 		console.error('API Error:', err);
// 		return res.status(500).send({ err });
// 	}
// }

// async function postHandler (id, req, res) {
// 	// works!
// 	try {
// 		const { movieId } = req.body;
// 		const result = await List.addToList(id, movieId);
// 		return res.send({ result });
// 	} catch (err) {
// 		console.error('API Error:', err);
// 		return res.status(500).send({ err });
// 	}
// }

// async function patchHandler (id, req, res) {
// 	// works!
// 	try {
// 		const result = await List.updateList(id, req.body);
// 		return res.send({ result });
// 	} catch (err) {
// 		console.error('API Error:', err);
// 		return res.status(500).send({ err });
// 	}
// }

// async function putHandler (id, req, res) {
// 	// works!
// 	try {
// 		const { movieId, action } = req.body;
// 		const response =
// 			action === 'remove' ? await List.removeFromList(id, movieId) : await List.addToList(id, movieId);
// 		return res.send({ response });
// 	} catch (err) {
// 		console.error('API Error: ', err);
// 		return res.status(500).send({ Error: err.message });
// 	}
// }

// async function deleteHandler (id, req, res) {
// 	try {
// 		const response = await List.deleteList(id);
// 		return res.send({ response });
// 	} catch (err) {
// 		console.error('API Error:', err);
// 		return res.status(500).send({ err });
// 	}
// }
