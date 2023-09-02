import MovieCard from '../common/MovieCard';
import Link from 'next/link';

export default function ListDetail ({ list }) {
	return (
		<div key={list.id}>
			<h1>{list.name}</h1>
			<div>
				List by <Link href={`/${list.username}`}>{list.username}</Link>  <small>{list.likes} likes</small>
			</div>
			<p>{list.description}</p>
			{list.movies.length > 0 && (
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
			)}
		</div>
	);
}
