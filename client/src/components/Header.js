import React from "react";
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

const Header = () => (
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
        </Nav>
        <Form className="d-flex">
          <InputGroup className="d-flex">
            <FormControl
              className="placeholder-gray-500"
              placeholder="Find a Car"
            />
            <DropdownButton
              variant="secondary"
              title="Find By"
              id="input-group-dropdown-2"
              align="end"
            >
              <Dropdown.Item href="#">Make</Dropdown.Item>
              <Dropdown.Item href="#">Model</Dropdown.Item>
              <Dropdown.Item href="#">Year</Dropdown.Item>
              <Dropdown.Item href="#">VIN</Dropdown.Item>
            </DropdownButton>
            <Button variant="primary" id="search">
              Search
            </Button>
          </InputGroup>
        </Form>
        <div className="space-x-2 mx-2">
          <LinkContainer to="/signup">
            <Button variant="primary" id="search">
              Signup
            </Button>
          </LinkContainer>
          <LinkContainer to="/login">
            <Button variant="outline-secondary" id="search">
              Login
            </Button>
          </LinkContainer>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default Header;
