import "./Header.css";

import { Container, Form, Nav, Navbar } from "react-bootstrap";

import NavDropdown from "react-bootstrap/NavDropdown";
// import Navbar from "react-bootstrap/Navbar";
// import axios from 'axios'
import logo from "../../images/chef.jpeg";

function Header() {
    return(
        <div className="header">
            <br />
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="/" style={{ marginTop: '0%', color: "white", fontSize: 35, fontStyle: 'italic', fontWeight: 'bold' }}>HalifaxFoodie</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav className="me-auto">
                                <Nav.Link href="#home" style={{ color: "white" , fontSize: 23, fontStyle: 'italic' }}>Signout</Nav.Link>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;