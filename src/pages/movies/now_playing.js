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
		const res = await CinecoopApi.getMovies('now_playing');
		const data = await res.json();
		console.log('data', data);
		// const results = res.data.results;
		// console.log("movies", results);
		setMovies(mapMovies(data.data.results));
		setIsLoading(false);
	}

	function mapMovies (data) {
		return data.map((m) => (
      <MovieCard key={m.id} id={m.id} title={m.title} posterPath={m.poster_path} voteAverage={m.vote_average} />
		));
	}

	if (!movies) return <div>Loading</div>;

	return (
		<div className='d-flex flex-row flex-wrap'>{movies}</div>
		//  (<h1>Movie Page!</h1>)
	);
}
