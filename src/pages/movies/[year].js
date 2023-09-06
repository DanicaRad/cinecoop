import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CinecoopApi from "@/Api";
import MovieCard from "@/components/Movies/MovieCard";

export default function Page() {
  /**
   * doesn't work - need to write API route to check if +query typeof === number, write API class method to send request to '/movies/[endpoint]' with whole query string in req body
   */
  // const router = useRouter();
  // const [movies, setMovies] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const { year } = router.query;
  //   async function getMovies() {
  //     setIsLoading(true);
  //     await getMoviesFromApi(year);
  //     setIsLoading(false);
  //   }
  //   getMovies();
  // }, [router.isReady]);

  // async function getMoviesFromApi(year) {
  //   const res = await CinecoopApi.getMovies(`discover/movie?include_adult=false&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`);
  //   console.log("res", res);
  //   setMovies(res.data);
  // }

  // if (!movies) return <div>Loading</div>;

  // return (
  //   <div>
  //     <div className='display-6 text-uppercase'>
  //       <u>top rated</u>
  //     </div>
  //     <div className='d-flex flex-row flex-md-wrap gap-3 justify-content-center pt-2'>
  //       {movies.map((m) => (
  //         <MovieCard
  //           key={m.id}
  //           id={m.id}
  //           title={m.title}
  //           posterPath={!m.posterPath ? m.poster_path : m.posterPath}
  //           voteAverage={m.voteAverage}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className='border-bottom border-2 fw-light text-uppercase'>
      Movies by year page to go here
    </div>
  );
}
