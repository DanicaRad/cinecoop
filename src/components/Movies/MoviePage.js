import React from "react";
import Link from "next/link";
import MovieMenu from "./MovieMenu";
import MovieCast from "./MovieCast";
import styles from "./Movies.module.css";
import "./Movies.module.css";

export default function MovieDetail({
  movie,
  posterUrl,
  backdropUrl,
  director,
}) {
	const releaseDate = new Date(movie.release_date + "T00:00:00");
	return (
    <div
      className='card m-auto border-0'>
      <img src={backdropUrl} alt={`${movie.title} backdrop photo`} />
      <div className='card-body'>
        <div className='card m-auto border-0 bg-transparent'>
          <div className='row g-0'>
            <div className='col-sm-2 col-auto'>
              <img
                src={posterUrl}
                className='img-fluid'
                alt={`${movie.title} poster`}
              />
            </div>
            <div className='col-sm-auto col-md-9 ps-5'>
              <div className='card-body'>
                <div className='row g-0 justify-content-between'>
                  <div className='col-sm-8 col-auto me-auto'>
                    <div className='card-title'>
                      <span className='h4'>{movie.title}</span>{" "}
                      <small>
                        <Link
                          className={styles.link}
                          href={`/movies/${releaseDate.getFullYear()}`}
                        >
                          {releaseDate.getFullYear()}
                        </Link>{" "}
                        <span className='text-muted'>Directed By </span>
                        <Link
                          href={`/people/${director.id}`}
                          className={styles.link2}
                        >
                          {director.name}
                        </Link>
                      </small>
                    </div>
                    <p className='card-text'>
                      <small className='text-muted'>
                        {movie.tagline.toUpperCase()}
                      </small>
                    </p>
                    <p className='card-text'>{movie.overview}</p>
                    <div className='card-text'>
                      <small className='fw-light'>{movie.runtime} mins</small>
                      {movie.genres.map((g) => (
                        <button
                          key={g.id}
                          className='btn-sm btn fw-light bd-highlight'
                        >
                          {g.name}
                        </button>
                      ))}
                      <small className='text-muted ms-2'>
                        more at{" "}
                        <Link href={`imdb.com/title/${movie.imdb_id}`}>
                          IMDB
                        </Link>
                      </small>
                    </div>
                  </div>
                  <div className='col-auto'>
                    <MovieMenu
                      id={movie.id}
											title={movie.title}
											posterUrl={posterUrl}
                      component={"moviePage"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='card-header'>
          <ul className='nav nav-underline card-header-tabs'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='true' href='#'>
                Cast
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Crew
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Details
              </a>
            </li>
          </ul>
        </div>
        <div className='card-body'>
          <MovieCast cast={movie.credits.cast} />
        </div>
      </div>
    </div>
  );
  return (
    <div className='card m-auto border-0'>
      <img
        src={backdropUrl}
        alt={`${movie.title} backdrop photo`}
        className='img-fluid position-relative'
      />
      <div className={styles.movieDetails}>
        <div
          className='card m-auto border-0'
          style={{ backgroundColor: "rgba(255, 0, 0, opacity)" }}
        >
          <div className='card-body'>
            <div className='card mb-3 border-0 bg-transparent'>
              <div className='row g-0'>
                <div className='col-sm-2 col-auto'>
                  <img
                    src={posterUrl}
                    className='img-fluid'
                    alt={`${movie.title} poster`}
                  />
                </div>
                <div className='col-sm-auto col-md-9 ps-5'>
                  <div className='card-body'>
                    <div className='row g-0 justify-content-between'>
                      <div className='col-sm-8 col-auto me-auto'>
                        <div className='card-title'>
                          <span className='h4'>{movie.title}</span>{" "}
                          <small>
                            <Link
                              className={styles.link}
                              href={`/movies/${releaseDate.getFullYear()}`}
                            >
                              {releaseDate.getFullYear()}
                            </Link>{" "}
                            <span className='text-muted'>Directed By </span>
                            <Link
                              href={`/people/${director.id}`}
                              className={styles.link2}
                            >
                              {director.name}
                            </Link>
                          </small>
                        </div>
                        <p className='card-text'>
                          <small className='text-muted'>
                            {movie.tagline.toUpperCase()}
                          </small>
                        </p>
                        <p className='card-text'>{movie.overview}</p>
                        <div className='card-text'>
                          <small className='fw-light'>
                            {movie.runtime} mins
                          </small>
                          {movie.genres.map((g) => (
                            <button
                              key={g.id}
                              className='btn-sm btn fw-light bd-highlight'
                            >
                              {g.name}
                            </button>
                          ))}
                          <small className='text-muted ms-2'>
                            more at{" "}
                            <Link href={`imdb.com/title/${movie.imdb_id}`}>
                              IMDB
                            </Link>
                          </small>
                        </div>
                      </div>
                      <div className='col-auto'>
                        <MovieMenu
                          id={movie.id}
                          title={movie.title}
                          component={"moviePage"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='card-header'>
              <ul className='nav nav-underline card-header-tabs'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='true' href='#'>
                    Cast
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Crew
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Details
                  </a>
                </li>
              </ul>
            </div>
            <div className='card-body'>
              <MovieCast cast={movie.credits.cast} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div
  //     className='card m-auto border-0 w-100'
  //     style={{ backgroundColor: "#00002E" }}
  //   >
  //     <img src={backdropUrl} alt={`${movie.title} backdrop photo`} />
  //     <div
  //       className='card-img-overlay m-auto rounded-0'
  //       style={{ backgroundColor: "hsla(217, 11%, 15%, .5)" }}
  //     >
  //       <div className='card mb-3 border-0 bg-transparent'>
  //         <div className='row g-0'>
  //           <div className='col-sm-2 col-auto'>
  //             <img
  //               src={posterUrl}
  //               className='img-fluid'
  //               alt={`${movie.title} poster`}
  //             />
  //           </div>
  //           <div className='col-sm-auto col-md-9 ps-5'>
  //             <div className='card-body text-bg-dark'>
  //               <div className='row g-0 justify-content-between'>
  //                 <div className='col-sm-8 col-auto me-auto'>
  //                   <div className='card-title'>
  //                     <span className='h4'>{movie.title}</span>{" "}
  //                     <small>
  //                       <Link
  //                         className={styles.link}
  //                         href={`/movies/${releaseDate.getFullYear()}`}
  //                       >
  //                         {releaseDate.getFullYear()}
  //                       </Link>{" "}
  //                       <span className='text-muted'>Directed By </span>
  //                       <Link
  //                         href={`/people/${director.id}`}
  //                         className={styles.link2}
  //                       >
  //                         {director.name}
  //                       </Link>
  //                     </small>
  //                   </div>
  //                   <p className='card-text'>
  //                     <small className='text-muted'>
  //                       {movie.tagline.toUpperCase()}
  //                     </small>
  //                   </p>
  //                   <p className='card-text'>{movie.overview}</p>
  //                   <div className='card-text'>
  //                     <small className='fw-light'>{movie.runtime} mins</small>
  //                     {movie.genres.map((g) => (
  //                       <button
  //                         key={g.id}
  //                         className='btn-sm btn fw-light bd-highlight'
  //                       >
  //                         {g.name}
  //                       </button>
  //                     ))}
  //                     <small className='text-muted ms-2'>
  //                       more at{" "}
  //                       <Link href={`imdb.com/title/${movie.imdb_id}`}>
  //                         IMDB
  //                       </Link>
  //                     </small>
  //                   </div>
  //                 </div>
  //                 <div className='col-auto'>
  //                   <MovieMenu
  //                     id={movie.id}
  //                     title={movie.title}
  //                     component={"moviePage"}
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div className='card-header'>
  //         <ul className='nav nav-underline card-header-tabs'>
  //           <li className='nav-item'>
  //             <a className='nav-link active' aria-current='true' href='#'>
  //               Cast
  //             </a>
  //           </li>
  //           <li className='nav-item'>
  //             <a className='nav-link' href='#'>
  //               Crew
  //             </a>
  //           </li>
  //           <li className='nav-item'>
  //             <a className='nav-link' href='#'>
  //               Details
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //       <div className='card-body'>
  //         <MovieCast cast={movie.credits.cast} />
  //       </div>
  //     </div>
  //   </div>
  // );
}
