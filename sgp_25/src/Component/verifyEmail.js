import '../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Alert, Button, Col, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Amplify, { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function Registration(props) {
    const finalEmail = "";
    const location = useLocation();
    const numberRegex = new RegExp("^[0-9]+$");
    const [code, setCode] = useState('');
    const [errMsgCode, setErrMsgCode] = useState(false);
    const user = location.myCustomProps.data
    // const user="asldm@dc.dsc"
    const history = useHistory();

    const withdrawSubmit = (e) => {
        e.preventDefault();

        console.log('code', user)
        // ---------Login Page Verification--------------
        // Auth.confirmSignIn(
        //     user,   // Return object from Auth.signIn()
        //     code,   // Confirmation code  
        //     "SMS_MFA" // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
        // );

        // -----------Registration page verification-----------
        console.log("I am here")
        console.log("code", code)
        Auth.confirmSignUp(user, code, {
            forceAliasCreation: true
        }).then((response) => {
            if(response = 'SUCCESS'){
                history.push('/');
            }
            else{
                console.log('response', response)
            }
        });

        // then(data => console.log("comfirmcode", data)

    }

    return (
        <section class='bg-whole-page'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">HalifaxFoodie</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                        <Nav>
                            <Nav className="me-auto">
                                <NavDropdown title="SignIn" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">SignIn</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">SignUp</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br /><br /><br />
            <div class="container">
                <div class="row">
                    <br /><br />
                    <div class="col-6" style={{ marginLeft: "auto", marginRight: "auto", border: "1px solid black", padding: "2%" }}>
                        <div class="row justify-content-md-center">
                            <div class="col-lg-8" style={{ textAlign: 'center' }}>
                                <h2>EMAIL VERIFICATION</h2>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-12">
                                <Form.Label>Enter the verification code received on {user} email ID*</Form.Label>
                                <br />
                                <input type="password" className="textbox-design" id="code" name="code" placeholder="Enter verification code" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                    }}

                                />
                                <div><p>{errMsgCode}</p></div>
                            </div>
                        </div>
                        <br /><br />
                        <Button style={{ backgroundColor: "#ff632f", border: "none", marginLeft: "40%" }} type="submit"
                            onClick={(e) => {
                                withdrawSubmit(e);
                            }}
                        >Verify</Button>
                        <br /><br />

                        {/* <Alert id="alertNotSubmit" style={{ display: 'none' }} variant='danger'>
                            {alertMessage}
                        </Alert> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Registration