import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CinecoopApi from '@/Api';
import MovieCard from '@/components/Movies/MovieCard';

export default function Page () {
	const router = useRouter();
	const [movies, setMovies] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(
		() => {
			if (!router.isReady) return;
			const { endpoint } = router.query;
			async function getMovies () {
				setIsLoading(true);
				await getMoviesFromApi(endpoint);
				setIsLoading(false);
			}
			getMovies();
		},
		[ router.isReady ]
	);

	async function getMoviesFromApi (endpoint) {
		const res = await CinecoopApi.getMovies(endpoint);
		// setMovies(mapMovies(res.data));
		setMovies(res.data);
	}

	function mapMovies (data) {
		return data.map((m) => (
			<MovieCard key={m.id} id={m.id} title={m.title} posterPath={m.poster_path} voteAverage={m.vote_average} />
		));
	}

	if (!movies) return <div>Loading</div>;

	return (
		<div>
			<div className='display-6 text-uppercase'><u>top rated</u></div>
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
