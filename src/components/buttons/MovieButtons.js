import React, { useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CinecoopApi from '@/Api';
import WatchedButton from './WatchedButton';
import FavoriteButton from './FavoriteButton';
import WatchlistButton from './WatchlistButton';
import styles from './Buttons.module.css';
import UserContext from '../Auth/UserContext';
import MoreOptions from './MoreOptions';

export default function MovieButtons({ id, component }) {
	const { data: session } = useSession();
	const { userMovies, setUserMovies } = useContext(UserContext);
	const [ userMovie, setUserMovie ] = useState({});
	const [ isFavorite, setIsFavorite ] = useState();
	const [ isWatched, setIsWatched ] = useState();
	const [ onWatchlist, setOnWatchlist ] = useState();
	const [isClicked, setIsClicked] = useState();
	const [stylesClass, setStylesClass] = useState(component === 'movieCard' ? styles.movieCard : styles.moviePage);

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
		const key = evt.target.dataset.key;
		const data = await sendDataToApi(key);
		updateUserMovie(data);
	}

	async function sendDataToApi (key) {
		let data = { movieId: id };
		if (key === 'watched' && !userMovie.watched) {
			userMovie.watched = true;
			userMovie.watchlist = false;
			data = { ...data, watched: userMovie.watched, watchlist: userMovie.watchlist };
		} else {
			data = { ...data, [key]: !userMovie[key] };
		}
		const res = !Object.hasOwn(userMovies, id)
			? await CinecoopApi.addToUsersMovies(session.username, data)
			: await CinecoopApi.updateUserMovie(session.username, data);
		return res.data;
	}

	function updateUserMovie (data) {
		const movie = {
			favorite: data.isFavorite,
			watched: data.watchedOn,
			watchlist: data.watchlist
		};
		setUserMovies((m) => ({ ...m, [data.movieId]: movie }));
	}

	if (!userMovie) return;
	if (!session) return <MoreOptions isClicked={isClicked} />;

	return (
		<div className={stylesClass} onClick={handleClick}>
			<WatchedButton watched={isWatched} />
			<FavoriteButton isFavorite={isFavorite} />
			<WatchlistButton watchlist={onWatchlist} />
		</div>
	);
}
