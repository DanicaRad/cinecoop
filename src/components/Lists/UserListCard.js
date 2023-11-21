import MovieCard from "../Movies/MovieCard";
import Link from "next/link";

export default function UserListCard({ list }) {

  function isPrivate() {
    if (list.isPrivate)
      return (
        <span className='ps-2'>
          <i className='bi bi-lock-fill'></i>
        </span>
      );
  }

  return (
    <div key={list.id}>
      {list.movies.length > 0 && (
        <Link href={`/${list.username}/list/${list.id}`}>
          <div className='w-25'>
            <div className='d-flex flex-row justify-content-center pt-2'>
              {list.movies.slice(0, 6).map((m) => (
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  posterPath={m.posterPath}
                  voteAverage={m.voteAverage}
                  listView={true}
                />
              ))}
            </div>
          </div>
        </Link>
      )}
      <div className='pt-2'>
        <Link
          className='text-dark-emphasis lead fs-7 text-decoration-none'
          href={`/${list.username}/list/${list.id}`}
        >
          {list.name}
        </Link>
        {isPrivate()}
      </div>
      <div className='text-body-tertiary fw-lighter'>
        <small className='pe-2'>{list.movies.length} films</small>
        <Link href={`/${list.username}/list/${list.id}/edit`}>
          <i className='bi bi-pencil-fill'></i>
        </Link>
      </div>
    </div>
  );
}
