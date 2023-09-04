import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'username' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize (credentials, req) {
				const user = await User.authenticate(credentials);
				if (user) {
					return user;
				} else {
					return null;
				}
			}
		})
	],
	callbacks: {
		async session (props) {
			const session = props.session;
			session.username = props.token.username;
			delete session.user;
			return session;
		},
		async jwt (props) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			// if (account) {
			// 	console.log('account', account);
			// 	console.log('profile', profile);
			// 	token.accessToken = account.access_token;
			// 	token.id = profile.id;
			// }
			const token = props.token;
			if (props.user) {
				token.username = props.user.username;
			}
			return token;
		}
	},
	pages: {
    signIn: '/auth/signin'
		// newUser: '/auth/new-user'
		// New users will be directed here on first sign in (leave the property out if not of interest)
  }
};
export default NextAuth(authOptions);
