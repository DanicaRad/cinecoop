import React, { useContext, useState, useEffect } from 'react';
import CinecoopApi from '@/Api';
import WatchedButton from './WatchedButton';
import FavoriteButton from './FavoriteButton';
import WatchlistButton from './WatchlistButton';
import styles from './Buttons.module.css';
import UserContext from '../Auth/UserContext';
import MoreOptions from './MoreOptions';

export default function MovieButtons({ id }) {
	const { userMovies, currUser, setUserMovies } = useContext(UserContext);
	const [ userMovie, setUserMovie ] = useState({});
	const [ isFavorite, setIsFavorite ] = useState();
	const [ isWatched, setIsWatched ] = useState();
	const [ onWatchlist, setOnWatchlist ] = useState();
	const [ isClicked, setIsClicked ] = useState();

	useEffect(
		() => {
			if (!userMovies) {
				setUserMovie(null);
				return;
			}
			const { watched, watchlist, favorite } = !Object.hasOwn(userMovies, id) ? {} : userMovies[id];
			setUserMovie({ watched, watchlist, favorite });
			setIsFavorite(favorite);
			setIsWatched(watched);
			setOnWatchlist(watchlist);
		},
		[ userMovies, id ]
	);

	async function handleClick (evt) {
		evt.preventDefault();
		console.log("userMovies", userMovies);
		console.log('evt.target', evt.target.dataset.key);
		const key = evt.target.dataset.key;
		const data = await sendDataToApi(key);
		updateUserMovie(data);
		// let data = { movieId: id };
		// if (key === 'favorite') {
		// 	await updateFavorite();
		// 	return;
		// }
		// if (key === 'watched' && !userMovie.watched) {
		// 	userMovie.watched = true;
		// 	userMovie.watchlist = false;
		// 	data = { ...data, watched: userMovie.watched, watchlist: userMovie.watchlist };
		// 	console.log('usermovie after clicks', userMovie);
		// }
		// else if (key === 'watchlist' && !userMovie.watchlist) {
		// 	userMovie.watchlist = true;
		// 	data = {...data, watchlist: userMovie.watchlist}
		// }
		// else {
		// 	data = {...data, [key]: !userMovie[key]}
		// }
		// const res = !Object.hasOwn(userMovies, id)
		// 	? await CinecoopApi.addToUsersMovies(currUser, data)
		// 	: await CinecoopApi.updateUserMovie(currUser, data);
		// console.log('res.data in movieButtons', res.data);
		// const movie = {
		// 	favorite: res.data.isFavorite,
		// 	watched: res.data.watchedOn,
		// 	watchlist: res.data.watchlist
		// };
		// setUserMovies((m) => ({ ...m, [res.data.movieId]: movie }));
	}

	async function sendDataToApi(key) {
		let data = { movieId: id };
		if (key === 'watched' && !userMovie.watched) {
			userMovie.watched = true;
			userMovie.watchlist = false;
			data = { ...data, watched: userMovie.watched, watchlist: userMovie.watchlist };
		}
		else {
			data = {...data, [key]: !userMovie[key]}
		}
		const res = !Object.hasOwn(userMovies, id)
			? await CinecoopApi.addToUsersMovies(currUser, data)
			: await CinecoopApi.updateUserMovie(currUser, data);
		return res.data;
	}

	function updateUserMovie(data) {
		const movie = {
			favorite: data.isFavorite,
			watched: data.watchedOn,
			watchlist: data.watchlist
		};
		setUserMovies((m) => ({...m, [data.movieId]: movie}))
	}

	async function updateFavorite () {
		const res = !Object.hasOwn(userMovies, id)
			? await CinecoopApi.addToUsersMovies(currUser, { movieId: id, favorite: !userMovie.favorite })
			: await CinecoopApi.updateUserMovie(currUser, { movieId: id, favorite: !userMovie.favorite });
		console.log('res.data in movieButtons', res.data);
		const movie = {
			favorite: res.data.isFavorite,
			watched: res.data.watchedOn,
			watchlist: res.data.watchlist
		};
		console.log("movie", movie);
		// setIsFavorite(!isFavorite);
		setUserMovies((m) => ({ ...m, [res.data.movieId]: movie }));
		// userMovies[id] = movie;
	}

	if (!userMovie) return;
	if(!currUser) return (<MoreOptions isClicked={isClicked} />)

	return (
		<div className={styles.movieMenu} onClick={handleClick}>
			<WatchedButton watched={isWatched} />
			<FavoriteButton isFavorite={isFavorite} />
			<WatchlistButton watchlist={onWatchlist} />
		</div>
	);
}
