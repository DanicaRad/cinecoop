import User from "@/models/User";
import { authOptions } from "./[...nextauth]";

export default async function handler(req, res) {
  console.log("before call");
  const data = await User.register(req.body);
  console.log("after call", data);
  return res.send({ data });
}
