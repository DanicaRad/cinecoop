import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function LoggedInDropDown ({ username, signOut }) {
	return (
		<div>
			<Navbar.Toggle aria-controls='navbar-dark-example' />
			<Navbar.Collapse id='navbar-dark-example'>
				<Nav>
					<NavDropdown id='nav-dropdown-dark-example' title={username} menuVariant='dark'>
						<NavDropdown.Item href={`/${username}`}>Profile</NavDropdown.Item>
						<NavDropdown.Item href={`/${username}/watchlist`}>Watchlist</NavDropdown.Item>
						<NavDropdown.Item href={`/${username}/lists`}>Lists</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as='button' onClick={signOut}>
							Sign Out
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</div>
	);
}
