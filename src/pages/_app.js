// import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.esm.js';

// "module": "dist/js/bootstrap.esm.js",

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}
