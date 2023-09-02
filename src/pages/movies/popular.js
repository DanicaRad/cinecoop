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
    const data = await res.json();
    console.log("data", data.data.results);
		setMovies(data.data.results);
		setIsLoading(false);
	}

	if (!movies) return <div>Loading</div>;

	return (
		<div className='d-flex flex-row flex-wrap'>
			{
      movies.map(m => (
        <MovieCard
          key={m.id}
          id={m.id}
          title={m.title}
          posterPath={m.poster_path}
          voteAverage={m.vote_average}
        />
    ))}
		</div>
		//  <h1>Movie Page!</h1>
	);
}
