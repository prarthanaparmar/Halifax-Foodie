import '../../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../Header/Header.css";

import { Alert, Button, Col, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Amplify, { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import firebase from '../../services/firebase';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const history = useHistory();
    const [getUser, setGetUser] = useState({
        getEmail: "",
        getPassword: ""
    });
    const [securityQuestions, setSecurityQuestions] = useState({
        familyName: "",
        bornCountry: ""
    });

    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [result, setResult] = useState('');
    const [code, setCode] = useState(false);

    const [errMessage, setErrMessage] = useState({
        msgEmail: '',
        msgPassword: ''
    });

    const emailRegex = new RegExp("^[a-zA-Z0-9][-\\w\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    const passwordRegex = new RegExp("^.*(?=.{8,120})(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\@\\#\\$\\%\\&\\*]).*$");

    const handleChange = (key, value) => {
        setGetUser({ ...getUser, [key]: value });
    };
    const handleErrorMsg = (key, value) => {
        setErrMessage({ ...errMessage, [key]: value });
    };

    const checkValidEmail = (email) => {
        if (emailRegex.test(email)) {
            document.getElementById("email").style.border = "1px solid green"
            setValidEmail(true)
            handleChange("getEmail", email);
            handleErrorMsg("msgEmail", '')
        }
        else {
            document.getElementById("email").style.border = "1px solid red"
            setValidEmail(false)
            handleErrorMsg("msgEmail", 'Please enter valid email')
        }
    };

    const checkValidPassword = (pass) => {
        if (passwordRegex.test(pass)) {
            document.getElementById("password").style.border = "1px solid green"
            setValidPassword(true)
            handleChange("getPassword", pass);
            handleErrorMsg("msgPassword", '')
        }
        else {
            document.getElementById("password").style.border = "1px solid red"
            setValidPassword(false)
            handleErrorMsg("msgPassword", 'Password must contain must contain at least one digit, one capital, small character and one of the folowing chars- @, #, $,%,&,*')
        }
    };

    Amplify.configure({
        Auth: {
            identityPoolId: 'us-east-1:a9aee79e-036c-4ae8-9fb1-7fbb1d2da1ce',
            region: 'us-east-1',
            identityPoolRegion: 'us-east-1',
            userPoolId: 'us-east-1_oguJI8xBt',
            userPoolWebClientId: '1b7g5d2r64puehtq3tuf0h7c5m'
        }
    });

    const withdrawSubmit = (e) => {
        e.preventDefault();
        const db = firebase.firestore();
        var flag = 0;

        if (!validEmail && !validPassword) {
            document.getElementById("password").style.border = "1px solid red"
            document.getElementById("email").style.border = "1px solid red"
            document.getElementById("alertNotSubmit").style.display = "block"
            setAlertMessage('Please enter required fields')
        }
        else {
            if (validEmail) {
                if (validPassword) {
                    document.getElementById("alertNotSubmit").style.display = "none"
                    try {
                        console.log(getUser.getPassword)
                        Auth.signIn(getUser.getEmail, getUser.getPassword).then(
                            data => {
                                if (data != null) {
                                    console.log('success', data)
                                    if (data.username != null) {
                                        const response = db.collection('userDetails').get().then(
                                            result => {
                                                const firestoreData = []
                                                result.forEach(doc => {
                                                    const data = doc.data()
                                                    firestoreData.push(data)
                                                })
                                                for (var i = 0; i < firestoreData.length; i++) {
                                                    if (getUser.getEmail == firestoreData[i].email) {
                                                        if (getUser.getPassword == firestoreData[i].password) {
                                                            securityQuestions.familyName = firestoreData[i].familyName
                                                            securityQuestions.bornCountry = firestoreData[i].bornCountry
                                                            history.push({
                                                                pathname: '/qa',
                                                                myCustomProps: securityQuestions
                                                            })
                                                            break
                                                        }
                                                    }
                                                }
                                            }
                                        )
                                    }
                                    else {
                                        console.log('fail')
                                    }
                                }
                            }
                        ).catch(
                            (err) => {
                                console.log('fail', err.message)
                                document.getElementById("alertNotSubmit").style.display = "block"
                                setAlertMessage(err.message)
                            }
                        )

                    } catch (error) {
                        console.log('error signing up:', error);
                    }

                }
                else {
                    document.getElementById("password").style.border = "1px solid red"
                    document.getElementById("alertNotSubmit").style.display = "block"
                    setAlertMessage('Please enter required fields')
                }

            }
            else {
                document.getElementById("email").style.border = "1px solid red"
                document.getElementById("alertNotSubmit").style.display = "block"
                setAlertMessage('Please enter required fields')
            }
        }
    }

    return (
        <section class='bg-whole-page'>
            <div className="header">
                <br />
                <Navbar collapseOnSelect expand="lg">
                    <Container>
                        <Navbar.Brand href="/" style={{ color: "white" }}>HalifaxFoodie</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">

                            </Nav>
                            <Nav>
                                <Nav className="me-auto">
                                    <Nav.Link href="/register" style={{ color: "white" }}>Register</Nav.Link>
                                </Nav>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <div>
                <div class="container">
                    <div class="row">
                        <br /><br />
                        <div class="col-4" style={{ marginLeft: "auto", marginRight: "auto", border: "1px solid black", padding: "2%" }}>
                            <div class="row justify-content-md-center">
                                <div class="col-lg-8" style={{ textAlign: 'center' }}>
                                    <h2>LOGIN</h2>
                                </div>
                            </div>
                            <br />

                            <div class="row">
                                <div class="col-12">
                                    <Form.Label>Email ID*</Form.Label>
                                    <br />
                                    <input type="text" className="textbox-design" id="email" placeholder="Enter email ID" style={{ border: "1px solid green" }}
                                        onChange={(e) => {
                                            checkValidEmail(e.target.value);
                                        }}
                                    />
                                    <div><p>{errMessage.msgEmail}</p></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <Form.Label>Password*</Form.Label>
                                    <br />
                                    <input type="password" className="textbox-design" id="password" maxLength="20" placeholder="Enter Password" style={{ border: "1px solid green" }}
                                        onChange={(e) => {
                                            checkValidPassword(e.target.value);
                                        }}
                                    />
                                    <div><p>{errMessage.msgPassword}</p></div>
                                </div>
                            </div>
                            <br /><br />
                            <Button style={{ backgroundColor: "#ff632f", border: "none", marginLeft: "40%" }} type="submit"
                                onClick={(e) => {
                                    withdrawSubmit(e);
                                }}
                            >Submit</Button>
                            <br /><br />

                            <Alert id="alertNotSubmit" style={{ display: 'none' }} variant='danger'>
                                {alertMessage}
                            </Alert>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Login