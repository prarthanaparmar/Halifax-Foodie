import '../../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'firebase/firestore';
import 'firebase/auth';

import { Alert, Button, Col, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Amplify, { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import firebase from '../../services/firebase';
import { useHistory } from 'react-router-dom';

function Registration(props) {
    const history = useHistory();
    // const ref = firebase.firestore().collection("userDetials")
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
        document.getElementById("number").style.border = "1px solid green"
        handleChange("number", number);
        setValidNumber(true)
        handleErrorMsg("msgNumber", '')
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

            // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
            identityPoolId: 'us-east-1:9aa76f09-bb4d-4608-8022-a1d1a6a189c1',

            // REQUIRED - Amazon Cognito Region
            region: 'us-east-1',

            // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
            // Required only if it's different from Amazon Cognito Region
            identityPoolRegion: 'us-east-1',

            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: 'us-east-1_x9SE9KfTJ',

            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: '5sgtlbm4q6m3bvd7fkqod8pak7'
        }
    });

    const withdrawSubmit = (e) => {
        e.preventDefault();
        console.log("user:- ", user)
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
                                        console.log('true')
                                        document.getElementById("alertNotSubmit").style.display = "none"
                                        try {
                                            console.log(user)
                                            const userDetails = Auth.signUp({
                                                username: user.email,
                                                password: user.password,
                                                attributes: {
                                                    name: user.name,
                                                    email: user.email,
                                                    phone_number: user.number
                                                }
                                            });

                                            console.log('role', user.role)

                                            //history.push('/verify');
                                            history.push({
                                                pathname: '/verify',
                                                myCustomProps: user
                                            })
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

        // axios.post('http://localhost:3000/insert', {
        //     "userName": this.state.userName,
        //     "userPassword": this.state.userPassword,
        //     "userNumber": this.state.userNumber,
        //     "userEmailID": this.state.userEmailID,
        //     "userGender": this.state.userGender
        // }).then((response) => {
        //     console.log("inserted")
        // });

        // try {
        //     const awsUser = Auth.signUp({
        //         username: user.email,
        //         password: user.password,
        //         attributes: {
        //             name: user.name,          // optional
        //             email: user.email,   // optional - E.164 number convention
        //             // other custom attributes 
        //         }
        //     });
        //     console.log('Success', user.email, user.name, awsUser);
        //     Auth.confirmSignUp(user.email, '189274', {
        //         forceAliasCreation: true
        //     }).then(data => console.log("comfirmcode", data))
        // } catch (error) {
        //     console.log('error signing up:', error);
        // }
    }

    return (

        <section class='bg-whole-page'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">HalifaxFoodie</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Nav className="me-auto">
                                <NavDropdown title="SignUp" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/">SignIn</NavDropdown.Item>
                                    <NavDropdown.Item href="/register">SignUp</NavDropdown.Item>
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
                                    }}

                                />
                                <div><p>{errMessage.msgName}</p></div>
                            </div>
                            <div class="col-6">
                                <Form.Label>Phone Number*</Form.Label>
                                <br />
                                <input type="text" className="textbox-design" maxLength="15" id="number" name="number" placeholder="Enter Phone Number" style={{ border: "1px solid green" }}
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
