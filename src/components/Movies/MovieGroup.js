import React from "react";
import MovieCard from "./MovieCard";
import styles from "./Movies.module.css";

export default function MovieGroup({ endpoint, movies }) {
  return (
    <div className='container mt-3'>
      <div className='border-bottom border-2 fw-light text-uppercase w-75 mx-auto'>
        {endpoint}
      </div>
      <div className='d-flex flex-row flex-wrap flex-md-nowrap gap-3 justify-content-center pt-2'>
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            id={m.id}
            title={m.title}
            posterPath={!m.posterPath ? m.poster_path : m.posterPath}
            voteAverage={m.voteAverage ? m.voteAverage : m.vote_average}
            releaseDate={m.release_date}
          />
        ))}
      </div>
    </div>
  );
}
