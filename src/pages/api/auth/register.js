import User from '../../../models/User';

export default async function handler(req, res) {
  const result = await User.register(req.body);
  res.send({ result });
}