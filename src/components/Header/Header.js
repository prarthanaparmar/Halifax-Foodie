
import "./Header.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
// import axios from 'axios'
import logo from "../../images/chef.jpeg";

function Header() {
    return(
        <div className="header">
            <Navbar>
                <Navbar.Brand>
                    <img src={logo} width="500px" height="250px" className="d-inline-block align-top" alt="React Bootstrap logo"/>
                </Navbar.Brand>
                {/* <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title="Click here!" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/header">Profile</NavDropdown.Item>
                        <NavDropdown.Item>Account</NavDropdown.Item>
                        <NavDropdown.Item href="/header">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse> */}
            </Navbar>
        </div>
    );
}

export default Header;