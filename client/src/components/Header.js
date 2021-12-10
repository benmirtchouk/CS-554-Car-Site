import React, { useContext, useState } from "react";
import {
  Nav,
  NavDropdown,
  Navbar,
  Button,
  Container,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const handleLogOut = async () => {
    await doSignOut().catch((e) => {
      throw new Error(`${e}`);
    });
  };

  let showLogin = true;
  if (currentUser) showLogin = false;

  const [searchKey, setSearchKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  const carSearchHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.elements[0].value;

    const query = {};
    if (searchText.length === 0) {
      return;
      // eslint-disable-next-line no-else-return
    } else if (typeof searchKey !== "string") {
      /// Not implemented yet, treat as empty case
      return;
    } else {
      query.searchKey = searchKey;
    }

    query.query = searchText;

    setSearchQuery(query);
  };

  if (searchQuery !== null) {
    return (
      <Redirect to={{ pathname: "/search_results", state: searchQuery }} />
    );
  }

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
            <NavDropdown title="Analytics" id="basic-nav-dropdown">
              <NavDropdown.Item href="/vin">Vin</NavDropdown.Item>
              <NavDropdown.Item href="/safety">Safety</NavDropdown.Item>
            </NavDropdown>
            {!showLogin && (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/account">My Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Form className="d-flex" onSubmit={carSearchHandler}>
            <InputGroup className="d-flex">
              <FormControl
                className="placeholder-gray-500"
                placeholder="Find a Car"
              />
              <DropdownButton
                variant="secondary"
                className="capitalize"
                title={typeof searchKey === "string" ? searchKey : "Find By"}
                id="input-group-dropdown-2"
                align="end"
                onSelect={(e) => setSearchKey(e)}
              >
                <Dropdown.Item href="#" eventKey="make">
                  Make
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="model">
                  Model
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="year">
                  Year
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="vin">
                  VIN
                </Dropdown.Item>
              </DropdownButton>
              <Button type="submit" variant="primary" id="search">
                Search
              </Button>
            </InputGroup>
          </Form>
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
