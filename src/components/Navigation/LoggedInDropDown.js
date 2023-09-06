import { NavItem } from 'react-bootstrap';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styles from './Navigation.module.css'

export default function LoggedInDropDown ({ username, signOut }) {
	return (
			<Nav.Item className={styles.link}>
			<Navbar.Toggle aria-controls='navbar-dark-example' />
			<Navbar.Collapse id='navbar-dark-example'>
				<Nav>
					<NavDropdown id='nav-dropdown-dark-example' title={username} menuVariant='dark'>
						<NavDropdown.Item className={styles.link} href={`/${username}`}>Profile</NavDropdown.Item>
						<NavDropdown.Item className={styles.link} href={`/${username}/favorites`}>Favorites</NavDropdown.Item>
						<NavDropdown.Item className={styles.link} href={`/${username}/lists`}>Lists</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className={styles.link} as='button' onClick={signOut}>
							Sign Out
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				</Navbar.Collapse>
				</Nav.Item>
	);
}
