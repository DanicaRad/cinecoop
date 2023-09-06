import React from "react";
import MovieCard from "./MovieCard";

export default function Movies({movies}) {
  return (
    <>
      {
      movies.map(m => (
        <MovieCard
          key={m.id}
          id={m.id}
          title={m.title}
          posterPath={m.posterPath}
          voteAverage={m.voteAverage}
          releaseDate={m.release_date}
        />
    ))}
    </>
  )
}