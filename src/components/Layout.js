import Navigation from './Navigation/Navigation';
import { useSession } from 'next-auth/react';
import UserContext from './Auth/UserContext';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CinecoopApi from '@/Api';

export default function Layout ({ children }) {
	const { data: session } = useSession();
	const [userMovies, setUserMovies] = useState(null);

	useEffect(
		() => {
			async function getCurrUser() {
				if (session) {
					const data = await CinecoopApi.getUserMovies(session.username);
					console.log('user watchlist data in layout useEffect', data);
					setUserMovies(data);
				}
			}
			getCurrUser();
		},
		[ session ]
	);

	return (
		<div>
			<UserContext.Provider value={{ userMovies, setUserMovies }}>
				<Navigation />
				<Container className='mt-4'>
					<main>{children}</main>
				</Container>
			</UserContext.Provider>
		</div>
	);
}
