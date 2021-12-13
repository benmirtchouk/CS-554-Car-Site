import React, { useContext } from "react";
import { Nav, NavDropdown, Navbar, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";
import MiniVehicleSearchForm from "./find_cars/MiniVehicleSearchForm";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const handleLogOut = async () => {
    await doSignOut().catch((e) => {
      throw new Error(`${e}`);
    });
  };

  const showLogin = !currentUser;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Carigslist</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/sellers">
              <Nav.Link>Sellers</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Analytics">
              <LinkContainer to="/vin">
                <NavDropdown.Item> Vin </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/safety">
                <NavDropdown.Item> Safety</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            {!showLogin && (
              <NavDropdown title="Account">
                <LinkContainer to="/account">
                  <NavDropdown.Item> My Profile</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
          <MiniVehicleSearchForm />
          <div className="space-x-2 mx-2">
            {showLogin && (
              <LinkContainer to="/signup">
                <Button variant="primary" id="signup">
                  Signup
                </Button>
              </LinkContainer>
            )}
            {showLogin && (
              <LinkContainer to="/login">
                <Button variant="outline-secondary" id="login">
                  Login
                </Button>
              </LinkContainer>
            )}
            {!showLogin && (
              <LinkContainer to="/">
                <Button
                  onClick={handleLogOut}
                  variant="outline-secondary"
                  id="logout"
                >
                  LogOut
                </Button>
              </LinkContainer>
            )}
            {!showLogin && (
              <LinkContainer to="/account">
                <Button
                  variant="outline-primary"
                >
                  {currentUser.displayName}
                </Button>
              </LinkContainer>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
