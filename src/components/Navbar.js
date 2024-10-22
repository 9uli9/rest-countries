import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const CustomNavbar = () => {
    return (
        <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
            <Container>
                {/* Brand Name */}
                <Navbar.Brand href="/">Country Explorer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink exact to="/" className="nav-link" activeClassName="active">
                            Home
                        </NavLink>
                        <NavLink to="/africa" className="nav-link" activeClassName="active">
                            Africa
                        </NavLink>
                        <NavLink to="/americas" className="nav-link" activeClassName="active">
                            Americas
                        </NavLink>
                        <NavLink to="/asia" className="nav-link" activeClassName="active">
                            Asia
                        </NavLink>
                        <NavLink to="/europe" className="nav-link" activeClassName="active">
                            Europe
                        </NavLink>
                        <NavLink to="/oceania" className="nav-link" activeClassName="active">
                            Oceania
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
