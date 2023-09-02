import { useSession, signIn, signOut } from 'next-auth/react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LoggedInDropDown from './LoggedInDropDown';
import styles from './Navigation.module.css';

export default function Navigation () {
	function signInSignOutBtn () {
		const { data: session } = useSession();
		console.log('session', session);
		if (session) {
			return <LoggedInDropDown username={session.username} signOut={signOut} />;
		}
		return (
			<button className='nav-link btn btn-sm' onClick={signIn}>
				SIGN IN
			</button>
		);
	}

	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Navbar.Brand href='/'>Cinecoop</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Item className={styles.link}>{signInSignOutBtn()}</Nav.Item>
						<Nav.Link className={styles.link} href='/movies'>
							Movies
						</Nav.Link>
						<NavDropdown id='nav-dropdown-dark-example' title='MOVIES' menuVariant='dark'>
							<NavDropdown.Item href={`/movies/popular`}>Popular</NavDropdown.Item>
							<NavDropdown.Item href={`/movies/now_playing`}>Now Playing</NavDropdown.Item>
							<NavDropdown.Item href={`/movies/top_rated`}>Top Rated</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link className={styles.link} href='/lists'>
							Lists
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<a className='navbar-brand' href='/'>
					Cinecoop
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>{signInSignOutBtn()}</li>
						<li className='nav-item'>
							<a className='nav-link active' aria-current='page' href='/movies'>
								Movies
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link active' aria-current='page' href='/lists'>
								Lists
							</a>
						</li>
						<li className='nav-item dropdown'>
							<a
								className='nav-link dropdown-toggle'
								href='#'
								id='navbarDropdown'
								role='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								Dropdown
							</a>
							<ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
								<li>
									<a className='dropdown-item' href='#'>
										Action
									</a>
								</li>
								<li>
									<a className='dropdown-item' href='#'>
										Another action
									</a>
								</li>
								<li>
									<hr className='dropdown-divider' />
								</li>
								<li>
									<a className='dropdown-item' href='#'>
										Something else here
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
