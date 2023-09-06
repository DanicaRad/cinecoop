import MovieCard from "./MovieCard";
import Link from "next/link";
import styles from "./Movies.module.css";

export default function MovieCardWithTitle({
  id,
  title,
  posterPath,
  voteAverage,
  releaseDate
}) {
  
  releaseDate = new Date(releaseDate + "T00:00:00");
  console.log("releaseDate", releaseDate);

  return (
    <div className={styles.movieCard}>
      <MovieCard
        id={id}
        title={title}
        posterPath={posterPath}
        voteAverage={voteAverage}
      />
      <div className='pt-2'>
        <Link
          className='text-dark-emphasis fw-lighter text-decoration-none lh-1'
          href={`movies/${id}`}
        >
          {title}
        </Link>
      </div>
      <div className='text-body-tertiary fw-lighter'>
        <Link
          href='#'
          className='fs-6 text-muted'
        >
          {releaseDate.getFullYear()}
        </Link>
        <small>
          <i className='bi bi-suit-heart-fill' />
        </small>
      </div>
    </div>
  );
}
