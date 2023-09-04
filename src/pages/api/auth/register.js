import User from '../../../models/User';
import { authOptions } from './[...nextauth]';

export default async function handler(req, res) {
  const data = await User.register(req.body);
  return res.send({ data });
}