import React from 'react';
import Link from 'next/link';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w185';

export default function MovieCard ({ id, title, posterPath, voteAverage }) {
  return (
    <div key={id} className='card'>
      <Link href={`/movie/${id}`} className='stretched-link'>
        <img src={imageBaseUrl + posterPath} alt={title + ' movie poster'} />
      </Link>
		</div>
	);
}
