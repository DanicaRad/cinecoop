import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserContext from "@/components/Auth/UserContext";
import { useRouter } from "next/router";
import CinecoopApi from "@/Api";
import MovieCard from "@/components/Movies/MovieCard";

export default function Favorites() {
  const { data: session } = useSession()
  const [username, setUsername] = useState();
  const { userMovies, setUserMovies } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState()
  const [favoriteLists, setFavoriteLists] = useState();
  const router = useRouter();

  useEffect(() => {
    async function getFavorites() {
      if (router.isReady) {
        const { username } = router.query;
        setUsername(username);
        const favorites = await CinecoopApi.getUsersFavorites(username);
        setFavoriteMovies(favorites.data);
        setIsLoading(false);
      }
    }
    getFavorites();
  }, [router.isReady]);

  if (isLoading) return (<div>Loading...</div>);

  return (
    <div className="w-75">
      <div className='display-6 pt-5 pb-4'>
        {username}&#39; likes
      </div>
      <div className='d-flex flex-row flex-md-wrap gap-3 justify-content-center pt-2'>
        {favoriteMovies.map((m) => (
          <MovieCard
            key={m.movieId}
            id={m.movieId}
            title={m.title}
            posterPath={!m.posterPath ? m.poster_path : m.posterPath}
            voteAverage={m.voteAverage}
          />
        ))}
      </div>
    </div>
  );
}