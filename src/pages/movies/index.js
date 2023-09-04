import { useEffect, useState } from 'react';
import CinecoopApi from '@/Api';
import MovieGroup from '@/components/Movies/MovieGroup';

export default function Page () {
	const [ nowPlaying, setNowPlaying ] = useState(null);
	const [ popular, setPopular ] = useState(null);
	const [ topRated, setTopRated ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		async function getMovies () {
			setIsLoading(true);
			setNowPlaying(await getMoviesFromApi('now_playing'));
			setPopular(await getMoviesFromApi('popular'));
			setTopRated(await getMoviesFromApi('top_rated'));

			setIsLoading(false);
		}
		getMovies();
	}, []);

	async function getMoviesFromApi (endpoint) {
		const res = await CinecoopApi.getMovies(endpoint);
		return res.data;
	}



	if (isLoading) return (<div>Loading</div>);

	return (
		<div>
			<MovieGroup endpoint={'Now Playing'} movies={nowPlaying.slice(0, 6)} />
			<MovieGroup endpoint={'Top Rated'} movies={topRated.slice(0, 6)} />
			<MovieGroup endpoint={'Popular'} movies={popular.slice(0, 6)} />
		</div>
	);
}
