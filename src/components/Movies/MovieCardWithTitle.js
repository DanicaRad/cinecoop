import MovieCard from "./MovieCard";
import Link from "next/link";
import styles from "./Movies.module.css";

export default function MovieCardWithTitle({
  id,
  title,
  posterPath,
  voteAverage,
  releaseDate,
}) {
  releaseDate = new Date(releaseDate + "T00:00:00");
  function formatVoteAverage(voteAverage) {
    if (Number.isInteger(voteAverage)) return voteAverage;
    return voteAverage.toPrecision(2);
  }

  return (
    <div className={styles.movieCard}>
      <MovieCard
        id={id}
        title={title}
        posterPath={posterPath}
        voteAverage={voteAverage}
      />
      <div className='pt-1'>
        <Link
          className='small text-dark-emphasis fw-lighter text-decoration-none lh-0'
          href={`movies/${id}`}
        >
          {title}
        </Link>
      </div>
      <div className='text-body-tertiary fw-lighter'>
        <Link
          href='#'
          className='small fw-lighter text-muted text-decoration-none'
        >
          {releaseDate.getFullYear()}
        </Link>{" "}
        <small>
          {formatVoteAverage(voteAverage)} <i className='bi bi-star-fill' />
        </small>
      </div>
    </div>
  );
}
