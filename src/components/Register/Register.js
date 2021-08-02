import '../../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'firebase/firestore';
import 'firebase/auth';
import "../Header/Header.css";

import { Alert, Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import Amplify, { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';
import firebase from '../../services/firebase';
import { useHistory } from 'react-router-dom';

function Registration(props) {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        gender: "male",
        location: "",
        role: "Customer",
        familyName: "",
        bornCountry: ""
    });
    const [validName, setValidName] = useState(false);
    const [validNumber, setValidNumber] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validLocation, setValidLocation] = useState(false);
    const [validFamilyName, setValidFamilyName] = useState(false);
    const [validBornCountry, setValidBornCountry] = useState(false);
    const [validRegistration, setValidRegistration] = useState(true);

    const [alertMessage, setAlertMessage] = useState('');
    const [result, setResult] = useState('');
    const [getEmail, setGetEmail] = useState([]);

    const [errMessage, setErrMessage] = useState({
        msgName: '',
        msgNumber: '',
        msgEmail: '',
        msgPassword: '',
        msgLocation: '',
        msgRole: "",
        msgFamilyName: "",
        msgBornCountry: ""
    });

    const numberRegex = new RegExp("^[0-9]{10}$");
    const nameRegex = new RegExp("^[a-zA-Z]+$");
    const emailRegex = new RegExp("^[a-zA-Z0-9][-\\w\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    const passwordRegex = new RegExp("^.*(?=.{8,120})(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\@\\#\\$\\%\\&\\*]).*$");

    const handleChange = (key, value) => {
        setUser({ ...user, [key]: value });
    };
    const handleErrorMsg = (key, value) => {
        setErrMessage({ ...user, [key]: value });
    };

    const checkValidName = (name) => {
        if (nameRegex.test(name)) {
            document.getElementById("name").style.border = "1px solid green"
            handleChange("name", name);
            setValidName(true)
            handleErrorMsg("msgName", '')
        }
        else {
            document.getElementById("name").style.border = "1px solid red"
            setValidName(false)
            handleErrorMsg("msgName", 'Please enter valid name')
        }
    };

    const checkValidNumber = (number) => {
        // if (numberRegex.test(number)) {
        //     document.getElementById("number").style.border = "1px solid green"
        handleChange("number", number);
        setValidNumber(true)
            // handleErrorMsg("msgNumber", '')
        // }
        // else {
        //     document.getElementById("number").style.border = "1px solid red"
        //     setValidNumber(false)
        //     handleErrorMsg("msgNumber", 'Please enter valid number')
        // }
    };

    const checkValidEmail = (email) => {
        if (emailRegex.test(email)) {
            document.getElementById("email").style.border = "1px solid green"
            setValidEmail(true)
            handleChange("email", email);
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
            handleChange("password", pass);
            handleErrorMsg("msgPassword", '')
        }
        else {
            document.getElementById("password").style.border = "1px solid red"
            setValidPassword(false)
            handleErrorMsg("msgPassword", 'Password must contain must contain at least one digit, one capital, small character and one of the folowing chars- @, #, $,%,&,*')
        }
    };
    const checkValidLocation = (loc) => {
        if (loc.length >= 3) {
            document.getElementById("location").style.border = "1px solid green"
            setValidLocation(true)
            handleChange("location", loc);
            handleErrorMsg("msgLocation", '')
        }
        else {
            document.getElementById("location").style.border = "1px solid red"
            setValidLocation(false)
            handleErrorMsg("msgLocation", 'Please enter valid location')
        }
    };
    const checkValidFamilyName = (name) => {
        if (name.length >= 3) {
            document.getElementById("familyName").style.border = "1px solid green"
            setValidFamilyName(true)
            handleChange("familyName", name);
            handleErrorMsg("msgFamilyName", '')
        }
        else {
            document.getElementById("familyName").style.border = "1px solid red"
            setValidFamilyName(false)
            handleErrorMsg("msgFamilyName", 'Please enter valid family name')
        }
    };
    const checkValidBornCountry = (country) => {
        if (country.length >= 3) {
            document.getElementById("bornCountry").style.border = "1px solid green"
            setValidBornCountry(true)
            handleChange("bornCountry", country);
            handleErrorMsg("msgBornCountry", '')
        }
        else {
            document.getElementById("bornCountry").style.border = "1px solid red"
            setValidBornCountry(false)
            handleErrorMsg("msgBornCountry", 'Please enter valid family name')
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
        if (!validName && !validNumber && !validEmail && !validPassword && !validLocation && !validFamilyName && !validBornCountry) {
            document.getElementById("password").style.border = "1px solid red"
            document.getElementById("email").style.border = "1px solid red"
            document.getElementById("number").style.border = "1px solid red"
            document.getElementById("name").style.border = "1px solid red"
            document.getElementById("location").style.border = "1px solid red"
            document.getElementById("bornCountry").style.border = "1px solid red"
            document.getElementById("alertNotSubmit").style.display = "block"
            document.getElementById("familyName").style.border = "1px solid red"
            setAlertMessage('Please enter required fields')
        }
        else {
            if (validName) {
                if (validNumber) {
                    if (validEmail) {
                        if (validPassword) {
                            if (validLocation) {
                                if (validFamilyName) {
                                    if (validBornCountry) {
                                        document.getElementById("alertNotSubmit").style.display = "none"
                                        try {
                                            const res = Auth.signUp({
                                                username: user.email,
                                                password: user.password,
                                                attributes: {
                                                    name: user.name,
                                                    email: user.email,
                                                    phone_number: user.number
                                                }
                                            }).then(
                                                data => {
                                                    if (data != null) {
                                                        history.push({
                                                            pathname: '/verify',
                                                            myCustomProps: user
                                                        })
                                                        console.log('success', data)
                                                    }
                                                }
                                            )
                                                .catch(
                                                    (err) => {

                                                        document.getElementById("alertNotSubmit").style.display = "block"
                                                        setAlertMessage(err.message)
                                                    }
                                                )
                                        } catch (error) {
                                            console.log('error signing up:', error);
                                        }
                                    }
                                    else {
                                        document.getElementById("bornCountry").style.border = "1px solid red"
                                        document.getElementById("alertNotSubmit").style.display = "block"
                                        setAlertMessage('Please enter required fields')
                                    }
                                }
                                else {
                                    document.getElementById("familyName").style.border = "1px solid red"
                                    document.getElementById("alertNotSubmit").style.display = "block"
                                    setAlertMessage('Please enter required fields')
                                }
                            }
                            else {
                                document.getElementById("location").style.border = "1px solid red"
                                document.getElementById("alertNotSubmit").style.display = "block"
                                setAlertMessage('Please enter required fields')
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
                else {
                    document.getElementById("number").style.border = "1px solid red"
                    document.getElementById("alertNotSubmit").style.display = "block"
                    setAlertMessage('Please enter required fields')
                }
            }
            else {
                document.getElementById("name").style.border = "1px solid red"
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
            <br /><br /><br /><br /><br /><br />
            <div class="container">
                <div class="row">
                    <br /><br />
                    <div class="col-7" style={{ marginLeft: "auto", marginRight: "auto", border: "1px solid black", padding: "2%" }}>
                        <div class="row justify-content-md-center">
                            <div class="col-lg-8" style={{ textAlign: 'center' }}>
                                <h2>REGISTRATION</h2>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-6">
                                <Form.Label>Name*</Form.Label>
                                <br />
                                <input type="text" className="textbox-design" id="name" name="name" placeholder="Enter Name" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidName(e.target.value);
                                    }} />
                                <div><p>{errMessage.msgName}</p></div>
                            </div>
                            <div class="col-6">
                                <Form.Label>Phone Number*</Form.Label>
                                <br />
                                <input type="text" className="textbox-design" id="number" name="number" placeholder="Enter Phone Number" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidNumber(e.target.value);
                                    }}
                                />
                                <div><p>{errMessage.msgNumber}</p></div>
                            </div>
                        </div>
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
                            <div class="col-6">
                                <Form.Label>Password*</Form.Label>
                                <br />
                                <input type="password" className="textbox-design" id="password" maxLength="20" placeholder="Enter Password" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        // handleChange("password", e.target.value);
                                        checkValidPassword(e.target.value);
                                    }}
                                />
                                <div><p>{errMessage.msgPassword}</p></div>
                            </div>
                            <div class="col-6">
                                <Form.Label>Location*</Form.Label>
                                <br />
                                <input type="text" className="textbox-design" id="location" placeholder="Enter location" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidLocation(e.target.value);
                                    }} />
                                <div><p>{errMessage.msgLocation}</p></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <Form.Label>Gender*</Form.Label>
                                <Form.Control as="select" defaultValue="Male" style={{ border: "1px solid green", outline: "none" }}
                                    onChange={(e) => {
                                        handleChange("gender", e.target.value);
                                    }}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Control>

                            </div>
                            <div class="col-6">
                                <Form.Label>Register As*</Form.Label>
                                <Form.Control as="select" defaultValue="Male" style={{ border: "1px solid green", outline: "none" }}
                                    onChange={(e) => {
                                        handleChange("role", e.target.value);
                                    }}>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </Form.Control>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <h6 style={{ textAlign: 'center' }}>Security Questions</h6>
                            <br />
                            <div class="col-6">
                                <Form.Label>What is your family name?*</Form.Label>
                                <br />
                                <input type="text" className="textbox-design" id="familyName" placeholder="Enter family name" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidFamilyName(e.target.value);
                                    }} />
                            </div>
                            <div class="col-6">
                                <Form.Label>In which country you were born?*</Form.Label>
                                <input type="text" className="textbox-design" id="bornCountry" placeholder="Enter born country" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidBornCountry(e.target.value);
                                    }} />
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
        </section>
    );
}

export default Registration