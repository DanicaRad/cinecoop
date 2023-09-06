import MovieCard from "../Movies/MovieCard";
import Link from "next/link";

export default function ListCard({ list }) {
  return (
    <div key={list.id}>
      {list.movies.length > 0 && (
        <a href={`/${list.username}/list/${list.id}`} className="stretched-link">
          <div className='w-25'>
            <div className='d-flex flex-row justify-content-center pt-2'>
              {list.movies.slice(0, 6).map((m) => (
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  posterPath={m.posterPath}
                  voteAverage={m.voteAverage}
                />
              ))}
            </div>
          </div>
        </a>
      )}
      <div className='pt-2'>
        <Link
          className='text-dark-emphasis lead, fs-7'
          href={`/${list.username}/list/${list.id}`}
        >
          {list.name}
        </Link>
      </div>
      <div className='text-body-tertiary fw-lighter '>
        <Link
          className='text-body-tertiary fw-lighter pe-2'
          href={`/${list.username}`}
        >
          {list.username}
        </Link>{" "}
        <small>
          <i className='bi bi-suit-heart-fill' /> {list.likes}
        </small>
      </div>
    </div>
  );
}
