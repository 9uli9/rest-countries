import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../styles/Navbar.css'; 
import logo from '../images/rectlogo.png'; 

const CustomNavbar = () => {
    return (
        <Navbar expand="lg" className="navbar-custom  ">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        alt="Country App Logo"
                        height="40" 
                        className="d-inline-block align-top" 
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ">
                        <NavLink exact to="/" className="nav-link">
                            <Button variant="outline-light" className="nav-button">Home</Button>
                        </NavLink>
                        <NavLink to="/africa" className="nav-link">
                            <Button variant="outline-light" className="nav-button">Africa</Button>
                        </NavLink>
                        <NavLink to="/americas" className="nav-link">
                            <Button variant="outline-light" className="nav-button">Americas</Button>
                        </NavLink>
                        <NavLink to="/asia" className="nav-link">
                            <Button variant="outline-light" className="nav-button">Asia</Button>
                        </NavLink>
                        <NavLink to="/europe" className="nav-link">
                            <Button variant="outline-light" className="nav-button">Europe</Button>
                        </NavLink>
                        <NavLink to="/oceania" className="nav-link">
                            <Button variant="outline-light" className="nav-button">Oceania</Button>
                        </NavLink>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
