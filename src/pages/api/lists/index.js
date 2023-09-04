import List from '@/models/List';

export default async function handler(req, res) {
  if (req.method === 'GET') return getHandler(req, res);
  if (req.method === 'POST') return postHandler(req, res);
  if (req.method === 'PATCH') return patchHandler(req, res);
  else res.status(400).send({ message: "forbidden method" });
}

async function getHandler(req, res) {
  try {
    const data = await List.getAllLists();
    return res.send({data})
  } catch (err) {
    console.log("Api err:", err);
    return res.status(500).send({err})
  }
}

async function postHandler(req, res) {
  try {
    const result = await List.createList(req.body);
    return res.send({ result });
  } catch (err) {
    console.error('API Error:', err);
		return res.status(500).send({ err });
  }
}

async function patchHandler(req, res) {
  console.log("patch list handler", req.body)
  try {
    const result = await List.updateList(req.body);
    return res.send({ result });
  } catch (err) {
    console.error('API Error:', err);
		return res.status(500).send({ err });
  }
}