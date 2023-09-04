import { useEffect, useState } from 'react';
import CinecoopApi from '@/Api';
import MovieCard from '@/components/Movies/MovieCard';
import MovieGroup from '@/components/Movies/MovieGroup';

export default function Page () {
	const [ movies, setMovies ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		async function getMovies () {
			await getMoviesFromApi();
		}
		getMovies();
	}, []);

	async function getMoviesFromApi () {
		setIsLoading(true);
		const res = await CinecoopApi.getMovies('now_playing');
		setMovies(res.data)
		// setMovies(mapMovies(res.data));

		setIsLoading(false);
	}

	function mapMovies (data) {
		return data.map((m) => (
			<MovieCard key={m.id} id={m.id} title={m.title} posterPath={m.poster_path} voteAverage={m.vote_average} />
		));
	}

	if (!movies) return <div>Loading</div>;

	return (
		<div>
			<div className='display-6'><u>NOW PLAYING</u></div>
			<div className='d-flex flex-row flex-md-wrap gap-3 justify-content-center pt-2'>
				{movies.map((m) => (
						<MovieCard
							key={m.id}
							id={m.id}
							title={m.title}
							posterPath={!m.posterPath ? m.poster_path : m.posterPath}
							voteAverage={m.voteAverage}
						/>
					))}
			</div>
		</div>
	);
}
