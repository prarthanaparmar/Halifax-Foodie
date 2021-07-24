import '../../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Alert, Button, Col, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Amplify, { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import VerificationPage from '../Authentication/verifyEmail';
import axios from 'axios';
import firebase from '../../services/firebase';
import { useHistory } from 'react-router-dom';

function Registration(props) {
    const history = useHistory();
    // const userDetails = new userDetails();
    const [getUser, setGetUser] = useState({
        getEmail: "",
        getPassword: ""
    });

    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [result, setResult] = useState('');
    const [code, setCode] = useState(false);
    // const ref = firebase.firestore().collection("userDetails")

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
        // console.log(user.validPassword)
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
        const db = firebase.firestore();
        var flag=0;

        // const data = response.get();
        // console.log(data.docs)
        // data.docs.forEach(item => {
        //     setUser([...user, item.data()])
        // })
        // console.log('values received', user)

        //------for inserting into firebase----------
        // const db = firebase.firestore();
        // db.settings({
        //     timestampsInSnapshots: true
        // });
        // const userRef = db.collection('userDetails').add({
        //     email: user.email,
        //     password: user.password
        // });
        if (!validEmail && !validPassword) {
            document.getElementById("password").style.border = "1px solid red"
            document.getElementById("email").style.border = "1px solid red"
            document.getElementById("alertNotSubmit").style.display = "block"
            setAlertMessage('Please enter required fields')
        }
        else {
            if (validEmail) {
                if (validPassword) {
                    console.log('true')
                    document.getElementById("alertNotSubmit").style.display = "none"
                    try {
                        //-----hitting the firebase--------
                        const response = db.collection('userDetails').get().then(
                            result => {
                                console.log('valResult- ',result)
                                const firestoreData = []
                                result.forEach(doc => {
                                    const data = doc.data()
                                    firestoreData.push(data)
                                })
                                
                                for (var i = 0; i < firestoreData.length; i++) {
                                    if(getUser.getEmail == firestoreData[i].email){
                                        flag=1;
                                        if(getUser.getPassword == firestoreData[i].password){
                                            history.push('/home');
                                            // history.push({
                                            //     pathname: '/chat',
                                            //     myCustomProps: userData
                                            // })
                                        }
                                        else{
                                            console.log("Invalid password")
                                            break
                                        }
                                    }
                                } 
                                if(flag==0){
                                    console.log("User email ID not found.")
                                }
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
                                    <NavDropdown.Item href="/">SignIn</NavDropdown.Item>
                                    <NavDropdown.Item href="/register">SignUp</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br /><br /><br />
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

export default Registration