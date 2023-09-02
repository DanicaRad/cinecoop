import { useEffect } from 'react';
import CinecoopApi from '@/Api';

export default function Page () {
	useEffect(() => {
	  async function getMovies() {
			const movies = await CinecoopApi.getMovies('now_playing');
			const searchRes = await CinecoopApi.searchMovies("avatar");
			console.log("search results!", searchRes)
	    console.log("movies", movies);
	  }
	  getMovies();
	}, []);

	return <h1>Movies Page!</h1>;
}
