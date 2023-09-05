import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import MovieButtons from '../buttons/MovieButtons';
import styles from './Movies.module.css'
const imageBaseUrl = 'https://image.tmdb.org/t/p/w185';

export default function MovieCard ({ id, title, posterPath, voteAverage }) {
	const { data: session } = useSession();

	function loggedInButtonsView() {
		if(session) {
			return <MovieButtons id={id} component={'movieCard'} />
		};
	}

	return (
		<div key={id} className='card position-relative'>
			<Link href={`/movie/${id}`}>
				<Image className={styles.movieCard} src={imageBaseUrl + posterPath} alt={title + ' movie poster'} />
			</Link>
			{loggedInButtonsView()}
		</div>
	);
}
