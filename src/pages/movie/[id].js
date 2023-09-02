import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CinecoopApi from '@/Api';
import MovieDetail from '@/components/Movies/MoviePage';

export async function GetStaticProps () {
	console.log('GetStaticProps in Movie/[id]');
	const res = await CinecoopApi.getImageConfiguratrions();
	console.log('res.images', res.images);
	return {
		props: {
			imageBaseUrl: res.images.base_url,
			secureImageBaseUrl: res.images.secure_base_url
		}
	};
}

export default function Page () {
	const router = useRouter();
	const [ movie, setMovie ] = useState(null);
	const [ imageBaseUrl, setImageBaseUrl ] = useState(null);

	useEffect(
		() => {
			if (!router.isReady) return;
			const { id } = router.query;
			async function getMovies () {
				const res = await CinecoopApi.getMovie(id);
				setMovie(res.data);
				console.log('res.data', res.data);
				setImageBaseUrl(`${CinecoopApi.imageConfigurations}/`);
			}
			getMovies();
		},
		[ router.isReady ]
	);

	function getDirector() {
    const director = movie.credits.crew.find(c => c.job.toLowerCase() === "director");
    return director;
	}

	if (!movie) return <div>Loading</div>;

	return (
		<MovieDetail
			key={movie.id}
			movie={movie}
			backdropUrl={imageBaseUrl + 'original' + movie.backdrop_path}
      posterUrl={imageBaseUrl + 'original' + movie.poster_path}
      director={getDirector()}
		/>
	);
}
