import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CinecoopApi from '@/Api';
import MovieCard from '@/components/MovieCard';

export default function Page () {
	const router = useRouter();
	const { endpoint } = router.query;
	const [movies, setMovies] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(
		() => {
			async function getMovies() {
				setIsLoading(true);
				await getMoviesFromApi();
				setIsLoading(false);
			}
			getMovies();
		},
		[]);

	async function getMoviesFromApi() {
		// const {endpoint} = router.query;
		console.log("endpoint", endpoint);
		const res = await CinecoopApi.getMovies(endpoint);
		console.log("res", res);
		const results = res.data.results;
		console.log("movies", results);
		setMovies(results);
	}

	if(isLoading) return <div>Loading</div>

	return (
		//  <>
    //   {movies.map(m => (
    //     <MovieCard
    //       id={m.id}
    //       title={m.title}
    //       posterPath={m.posterPath}
    //       voteAverage={m.voteAverage}
    //     />
    // ))}
    // </>
 (<h1>Movie Page!</h1>)

	);
}
