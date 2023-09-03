import React from 'react';
import Link from 'next/link';
import MovieButtons from '../buttons/MovieButtons';
import MovieMenu from './MovieMenu';
import MovieCast from './MovieCast';

export default function MovieDetail ({ movie, posterUrl, backdropUrl, director }) {
	const releaseDate = new Date(movie.release_date + 'T00:00:00');
	return (
		<div className='card m-auto'>
			<img src={backdropUrl} alt={`${movie.title} backdrop photo`} />
			<div className='card-body'>
				<div className='card mb-3 border-0 bg-transparent'>
					<div className='row g-0'>
						<div className='col-sm-3'>
							<img src={posterUrl} className='img-fluid' alt='...' />
							<MovieButtons id={movie.id} />
						</div>
						<div className='col-sm-auto col-md-9'>
							<div className='card-body'>
								<div className='row g-0 justify-content-between'>
									<div className='col-sm-8 me-auto'>
										<div className='card-title'>
											<span className='h4'>{movie.title}</span>{' '}
											<small>
												<Link href={`/movies/${releaseDate.getFullYear()}`}>
													{releaseDate.getFullYear()}
												</Link>{' '}
												<span className='text-muted'>Directed By </span>
												<Link href={`/people/${director.id}`}>{director.name}</Link>
											</small>
										</div>
										<p className='card-text'>
											<small className='text-muted'>{movie.tagline.toUpperCase()}</small>
										</p>
										<p className='card-text'>{movie.overview}</p>
										<div className='card-text'>
											<small className='fw-light'>{movie.runtime} mins</small>
											{movie.genres.map((g) => (
												<button key={g.id} className='btn-sm btn fw-light bd-highlight'>
													{g.name}
												</button>
											))}
											<small className='text-muted ms-2'>
												more at <Link href={`imdb.com/title/${movie.imdb_id}`}>IMDB</Link>
											</small>
										</div>
									</div>
									<div className='col-auto'>
										<MovieMenu id={movie.id} title={ movie.title} component={'moviePage'} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='card-header'>
					<ul className='nav nav-tabs card-header-tabs'>
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
}
