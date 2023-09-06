import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CinecoopApi from "@/Api";
import MovieCardWithTitle from "@/components/Movies/MovieCardWithTitle";

export default function Page() {
  const router = useRouter();
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
      if (!router.isReady) return;
      const { query } = router.query;
      setQuery(query);
      console.log("query term", query)
      await getMoviesFromApi(query);
    }
    getMovies();
  }, [router.isReady]);

  async function getMoviesFromApi(query) {
    setIsLoading(true);
    const res = await CinecoopApi.searchMovies(query);
    console.log("res", res);
    setMovies(res.data.results);
    setIsLoading(false);
  }

  if (!movies) return <div>Loading</div>;

  return (
    <div>
      <div className='border-bottom border-2 fw-light text-uppercase mb-3'>
        Results for {query}
      </div>
      <div className='d-flex flex-row flex-md-wrap gap-3 justify-content-center pt-2'>
        {movies.map((m) => (
          <MovieCardWithTitle
            key={m.id}
            id={m.id}
            title={m.title}
            posterPath={!m.posterPath ? m.poster_path : m.posterPath}
            voteAverage={m.voteAverage}
            releaseDate={m.release_date}
          />
        ))}
      </div>
    </div>
  );
}
