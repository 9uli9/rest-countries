//geting bootstrap components to make a navbar
// getting navlink component from react router so the user can be sent to other pages on click

import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button, Row, Col } from "react-bootstrap";
import "../styles/Navbar.css";

const CustomNavbar = () => {
  return (
    <Navbar expanded="true" className="navbar-custom">
      <Container>
        <Row className="w-100">
          <Col
            xs={12}
            md={3}
            className="d-flex align-items-center justify-content-center justify-content-md-start"
          >
            <Navbar.Brand href="/">
              <h1>Country Cuisine</h1>
            </Navbar.Brand>
          </Col>
          <Col
            xs={12}
            md={9}
            className="d-flex justify-content-center justify-content-md-end"
          >
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto flex-wrap">
                <NavLink exact to="/" className="nav-link">
                  <Button variant="outline-light" className="nav-button">
                    Home
                  </Button>
                </NavLink>
                <NavLink to="/africa" className="nav-link">
                  <Button variant="outline-light" className="nav-button">
                    Africa
                  </Button>
                </NavLink>
                <NavLink to="/americas" className="nav-link">
                  <Button variant="outline-light" className="nav-button">
                    Americas
                  </Button>
                </NavLink>
                <NavLink to="/asia" className="nav-link">
                  <Button variant="outline-light" className="nav-button">
                    Asia
                  </Button>
                </NavLink>
                <NavLink to="/europe" className="nav-link">
                  <Button variant="outline-light" className="nav-button">
                    Europe
                  </Button>
                </NavLink>
                <NavLink to="/oceania" className="nav-link">
                  <Button variant="outline-light" className="nav-button">
                    Oceania
                  </Button>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

// export the component so it can be used in other parts of the app!
export default CustomNavbar;
