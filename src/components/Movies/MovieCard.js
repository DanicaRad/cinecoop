import React from "react";
import Link from "next/link";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSession } from "next-auth/react";
import MovieButtons from "../buttons/MovieButtons";
import styles from "./Movies.module.css";
const imageBaseUrl = "https://image.tmdb.org/t/p/w185";

export default function MovieCard({ id, title, posterPath, voteAverage, releaseDate, listView=false}) {
	const { data: session } = useSession();

  function loggedInButtonsView() {
    if (session) {
      return <MovieButtons id={id} component={"movieCard"} />;
    }
  }

  if (listView)
    return (
      <div key={id} className='card position-relative border-0'>
          <img
            className={styles.movieCard}
            src={
              !posterPath
                ? "/default_movie_poster.jpg"
                : imageBaseUrl + posterPath
            }
            alt={title + " movie poster"}
          />
      </div>
    );

	return (
    <OverlayTrigger
      key={id}
      overlay={
        <Tooltip id={id} className="lh-1">
          <small>{title}</small>
        </Tooltip>
      }
    >
      <div key={id} className='card position-relative border-0'>
        <Link href={`/movie/${id}`}>
          <img
            className={styles.movieCard}
            src={
              !posterPath
                ? "/default_movie_poster.jpg"
                : imageBaseUrl + posterPath
            }
            alt={title + " movie poster"}
          />
        </Link>
        {loggedInButtonsView()}
      </div>
    </OverlayTrigger>
  );
}
