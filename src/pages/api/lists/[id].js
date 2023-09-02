import List from '@/models/List';

export default async function handler (req, res) {
	const { id } = req.query;
	if (req.method === 'POST') return postHandler(id, req, res);
	if (req.method === 'PUT') return putHandler(id, req, res);
	if (req.method === 'DELETE') return deleteHandler(id, req, res);
	if (req.method === 'GET') return getHandler(id, req, res);
	else return res.status(400).send({ message: 'forbidden method' });
}

async function postHandler (id, req, res) {
	try {
		const { username } = req.body;
		const result = await List.likeList(id, username);
		return res.send({ result });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}

async function putHandler (id, req, res) {
	try {
		const { name, isPrivate } = req.body;
		const result = await List.updateList(id, name, isPrivate);
		return res.send({ result });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}

async function deleteHandler (id, req, res) {
	try {
		const deleted = await List.deleteList(id);
		return res.send({ deleted });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}

async function getHandler (id, req, res) {
	try {
		const data = await List.getListWithMovies(id);
		return res.send({ data });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}
