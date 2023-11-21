import List from "@/models/List";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  const { username } = req.query;
  const session = await getServerSession(req, res, authOptions);
  try {
    if (req.method === "GET") return getHandler();
    if (req.method === "POST") return postHandler();
    else res.status(400).send({ message: "forbidden method" });
  } catch (err) {
    console.log("Api error:", err);
    return res.status(500).send({ err });
  }

  async function getHandler() {
    console.log("in [username]/lists get handler");
    const data =
      !session || username !== session.username
        ? await List.getUsersPublicLists(username)
        : await List.getUsersOwnLists(username);
    return res.send({ data });
  }

  async function postHandler() {
    if (!session || username !== session.username)
      return res.status(403).send({ message: "unauthorized method" });
		const { name, description, isPrivate, movieId } = req.body;
		if (movieId) console.log("movieId", movieId);
    let data = await List.createList(
      username,
      name,
      isPrivate,
      description
		);
		console.log("data before movieId", data);
		if (movieId) {
			const movie = await List.addToList(data.id, movieId);
			if (movie) data.movies = movieId;
		}
    return res.send({ data });
  }
}
