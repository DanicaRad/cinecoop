import MovieCard from '../Movies/MovieCard';
import Link from 'next/link';

export default function ListCard ({ list }) {
	return (
		<div key={list.id}>
			{list.movies.length > 0 && (
				<div>
					<div className='d-flex'>
						{list.movies
							.slice(0, 4)
							.map((m) => (
								<MovieCard
									key={m.id}
									id={m.id}
									title={m.title}
									posterPath={m.posterPath}
									voteAverage={m.voteAverage}
								/>
							))}
					</div>
				</div>
			)}
			<div>
				<div className='h5'>
					<Link href={`/${list.username}/list/${list.id}`}>{list.name}</Link>
				</div>
				<Link href={`/${list.username}`}> By: {list.username}</Link>{' '}
				<small>
					<i className='bi bi-suit-heart-fill' /> {list.likes}
				</small>
			</div>
		</div>
	);
}
