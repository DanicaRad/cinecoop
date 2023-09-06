// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";
import UserMovie from "@/models/UserMovie";

export default async function handler(req, res) {
  try {
    const { username } = req.query;
    // const session = await getServerSession(req, res, authOptions);
    // if (!session || username !== session.username) {
    //   return res.status(403).send({ message: "unauthorized" });
    // }
    if (req.method === "GET") {
      const data = await UserMovie.getUsersFavorites(username);
      return res.send({ data });
    }
    // if (req.method === "POST") return postHandler(username, req, res);
    // if (req.method === "PATCH") return patchHandler(username, req, res);
    // if (req.method === "DELETE") return deleteHandler(username, req, res);
    else return res.status(400).send({ message: "forbidden method" });
  } catch (err) {
    console.log("Api error:", err);
    return res.status(500).send({ message: "server error" });
  }
}
