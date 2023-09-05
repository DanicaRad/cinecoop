import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import UserMovie from "@/models/UserMovie";
import Watchlist from "@/models/Watchlist";
import User from "@/models/User";

export default function handler(req, res) {
  return res
    .status(418)
    .send({status: 418,
      statusText: `I'm a Teapot`, details:`The server refuses the attempt to brew coffee with a teapot.`,
    });
}