import React, { useContext, useState, useEffect } from "react";
import CinecoopApi from "@/Api";
import MovieContext from "../Movies/MovieContext";

export default function ListMovieCard({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [posterUrl, setPosterUrl] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const { imageBaseUrl } = useContext(MovieContext);

  if (!movieId) return <div>No movies selected for list</div>;

  useEffect(() => {
    async function getMovie() {
      const res = await CinecoopApi.getMovie(movieId);
      const movie = await res.data;
      movie.releaseDate = new Date(movie.release_date + "T00:00:00");
      movie.posterUrl = imageBaseUrl + "w185" + movie.poster_path;
      setMovie(movie);
      setPosterUrl(imageBaseUrl + "w185" + movie.poster_path);
    }
    getMovie();
  }, [movieId]);

  if (!movie) return <div>Loading</div>;


  return (
    <div className='card my-3 text-start'>
      <div className='row g-0 align-items-center'>
        <div className='col-sm-1'>
          <img
            src={posterUrl}
            className='img-fluid p-2'
            style={{ width: "3.5rem" }}
            alt={`${movie.title} poster image`}
          />
        </div>
        <div className='col-sm-8'>
          <div className='card-body ps-0'>
            <div className='card-title'>
              {movie.title}{" "}
              <a
                href='#'
                className='small fw-lighter text-muted text-decoration-none'
              >
                {movie.releaseDate.getFullYear()}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
