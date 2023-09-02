import List from '@/models/List';

export default async function handler (req, res) {
  const { username, id } = req.query;
  if (req.method === 'GET') return getHandler(id, username, req, res);
	if (req.method === 'POST') return postHandler(id, req, res);
  if (req.method === 'PATCH') return patchHandler(id, req, res);
  if (req.method === 'PUT') return putHandler(id, req, res);
	if (req.method === 'DELETE') return deleteHandler(id, req, res);
	else return res.status(400).send({ message: 'forbidden method' });
}

async function postHandler (id, req, res) {
	try {
		const { movieId } = req.body;
		const result = await List.addToList(id, movieId);
		return res.send({ result });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}

async function patchHandler (id, req, res) {
	try {
		const result = await List.updateList(id, req.body);
		return res.send({ result });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}

async function putHandler(id, req, res) {
  try {
    const { movieId } = req.body;
    const response = await List.removeFromList(id, movieId);
    return res.send({ response });
  } catch (err) {
    console.error("API Error: ", err);
    return res.status(500).send({ Error: err.message });
  }
}

async function deleteHandler (id, req, res) {
	try {
		const response = await List.deleteList(id);
		return res.send({ response });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}

async function getHandler (id, username, req, res) {
  try {
    console.log("id, username", id, username);
		const data = await List.getListWithMovies(+id, username);
		return res.send({ data });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}
