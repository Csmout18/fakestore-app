import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar bg="info" variant="dark" expand="lg" className="p-3 mb-4">
      <Navbar.Brand href="/">Fake Store App </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={NavLink} to="/" activeclassname="active"> Home </Nav.Link>
          <NavDropdown title="Products" id="basic-nav-dropdown">
          <NavDropdown.Item as={NavLink} to="/ProductList" activeclassname="active"> Product List </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/add-product" activeclassname="active"> Add Product </NavDropdown.Item>  
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;