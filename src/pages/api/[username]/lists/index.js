import List from '@/models/List';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

// export default async function handler(req, res) {
// 	const { username } = req.query;
// 	const session = await getServerSession(req, res, authOptions);
// 	console.log('session', session);
// 	if (req.method === 'GET') return getHandler(username, req, res);
// 	if (req.method === 'POST') return postHandler(username, req, res);
// 	else
// 		// if (req.method === 'PATCH') return patchHandler(username, req, res);
// 		res.send({ message: 'forbidden method' });
// }

// async function getHandler (username, req, res) {
// 	try {
// 		const data = await List.getUsersPublicLists(username);
// 		await List.getUsersOwnLists(username)
// 		return res.send({ data });
// 	} catch (err) {
// 		console.error('API Error: ', err);
// 		return res.status(500).send({ Error: err.message });
// 	}
// }

// async function postHandler (username, req, res) {
// 	try {
// 		const { name, description, isPrivate } = req.body;
// 		const result = await List.createList(username, name, isPrivate, description);
// 		return res.send({ result });
// 	} catch (err) {
// 		console.error('API Error:', err);
// 		return res.status(500).send({ err });
// 	}
// }

export default async function handler (req, res) {
	const { username } = req.query;
	const session = await getServerSession(req, res, authOptions);
	console.log('session', session);
	if (req.method === 'GET') return getHandler();
	if (req.method === 'POST') return postHandler();
	else
		// if (req.method === 'PATCH') return patchHandler(username, req, res);
		res.send({ message: 'forbidden method' });

	async function getHandler () {
		const data =
			!session || username !== session.username
				? await List.getUsersPublicLists(username)
				: await List.getUsersOwnLists(username);
		return res.send({ data });
	};

	async function postHandler() {
		if (!session || username !== session.username) return res.status(403).send({ message: 'unauthorized method' });
		const { name, description, isPrivate } = req.body;
		const result = await List.createList(username, name, isPrivate, description);
		return res.send({ result });
	};
}

async function postHandler (username, req, res) {
	try {
		const { name, description, isPrivate } = req.body;
		const result = await List.createList(username, name, isPrivate, description);
		return res.send({ result });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}

// async function patchHandler (username, req, res) {
// 	console.log('patch list handler', req.body);
// 	try {
// 		const result = await List.updateList(req.body);
// 		return res.send({ result });
// 	} catch (err) {
// 		console.error('API Error:', err);
// 		return res.status(500).send({ err });
// 	}
// }
