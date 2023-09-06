import { useEffect, useState } from "react";
import CinecoopApi from "@/Api";
import MovieCard from "@/components/Movies/MovieCard";

export default function Page() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
      setIsLoading(true);
      await getMoviesFromApi();
      setIsLoading(false);
    }
    getMovies();
  }, []);

  async function getMoviesFromApi() {
    const res = await CinecoopApi.getMovies("top_rated");
    setMovies(res.data);
  }

  if (!movies) return <div>Loading</div>;

  return (
    <div>
      <div className='border-bottom border-2 fw-light text-uppercase mb-3'>
        Top Rated
      </div>
      <div className='d-flex flex-row flex-md-wrap justify-content-center gap-3'>
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            id={m.id}
            title={m.title}
            posterPath={!m.posterPath ? m.poster_path : m.posterPath}
            voteAverage={m.vote_average}
            releaseDate={m.release_date}
          />
        ))}
      </div>
    </div>
  );
}
