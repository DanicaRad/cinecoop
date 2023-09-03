import Navigation from './Navigation/Navigation';
import { useSession } from 'next-auth/react';
import UserContext from './Auth/UserContext';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CinecoopApi from '@/Api';

export default function Layout ({ children }) {
	const { data: session } = useSession();
	const [userMovies, setUserMovies] = useState(null);
	const [userLists, setUserLists] = useState(null);

	useEffect(
		() => {
			async function getCurrUser() {
				if (session) {
					const movies = await CinecoopApi.getUserMovies(session.username);
					console.log('user watchlist data in layout useEffect', movies);
					const lists = await CinecoopApi.getUsersLists(session.username);
					console.log("users lists", lists.data);
					setUserMovies(movies);
					setUserLists(lists.data);
				}
			}
			getCurrUser();
		},
		[ session ]
	);

	return (
		<div>
			<UserContext.Provider value={{ userMovies, setUserMovies, userLists, setUserLists }}>
				<Navigation />
				<Container className='mt-4'>
					<main>{children}</main>
				</Container>
			</UserContext.Provider>
		</div>
	);
}
