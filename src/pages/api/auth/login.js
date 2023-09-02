import User from '../../../models/User';

export default async function handler (req, res) {
	try {
		const user = await User.authenticate(req.body);
		console.log('user in login handler', user);
		return res.send({ user });
	} catch (err) {
		return res.send({ err });
	}
}
