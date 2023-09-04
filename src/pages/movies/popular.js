import { useEffect, useState } from 'react';
import CinecoopApi from '@/Api';
import MovieCard from '@/components/Movies/MovieCard';

export default function Page () {
	const [ movies, setMovies ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		async function getMovies () {
			console.log('in useEffect');
			await getMoviesFromApi();
		}
		getMovies();
	}, []);

	async function getMoviesFromApi () {
		setIsLoading(true);
		const res = await CinecoopApi.getMovies('popular');
    console.log("data", res.data);
		setMovies(res.data);
		setIsLoading(false);
	}

	if (!movies) return <div>Loading</div>;

	return (
		<div>
			<div className='display-6'><u>POPULAR</u></div>
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
