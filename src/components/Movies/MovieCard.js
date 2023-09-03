import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import MovieButtons from '../buttons/MovieButtons';
import MoreOptions from '../buttons/MoreOptions';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w185';

export default function MovieCard ({ id, title, posterPath, voteAverage }) {
	const { data: session } = useSession();

	function loggedInButtonsView() {
		return <MovieButtons id={id} pageName={'movieCard'} />
	}

	function loggedOutButtonsView() {
		return <MoreOptions isClicked={false} />
	}

	return (
		<div key={id} className='card position-relative'>
			<Link href={`/movie/${id}`}>
				<img src={imageBaseUrl + posterPath} alt={title + ' movie poster'} />
			</Link>
			{session.username ? loggedInButtonsView() : loggedOutButtonsView()}
		</div>
	);
}
