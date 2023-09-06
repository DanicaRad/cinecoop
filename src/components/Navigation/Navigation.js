import { useSession, signIn, signOut } from 'next-auth/react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LoggedInDropDown from './LoggedInDropDown';
import styles from './Navigation.module.css';

export default function Navigation() {
	const { data: session } = useSession();

	function signInSignOutBtn () {
		if (session) {
			return <LoggedInDropDown username={session.username} signOut={signOut} />;
		}
		return (
			<>
			<Nav.Item className={styles.link}>
				<button className='nav-link btn btn-sm' onClick={signIn}>
				SIGN IN
				</button>
			</Nav.Item>
			<Nav.Link className={styles.link} href='/join'>
				CREATE AN ACCOUNT
			</Nav.Link>
			</>
		);
	}

	return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand className='lead text-uppercase fw-light' href='/'>
          Cinecoop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {signInSignOutBtn()}
            <NavDropdown
              className={styles.link}
              href='/movies'
              id='nav-dropdown-dark-example'
              title='MOVIES'
              menuVariant='dark'
            >
              <NavDropdown.Item
                className={styles.link}
                href={`/movies/popular`}
              >
                Popular
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles.link}
                href={`/movies/now_playing`}
              >
                Now Playing
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles.link}
                href={`/movies/top_rated`}
              >
                Top Rated
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className={styles.link} href='/lists'>
              Lists
            </Nav.Link>
          </Nav>
          <form className='d-flex' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn-outline fw-lighter text-uppercase'
              type='submit'>
              <i className='bi bi-search'></i>
            </button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
