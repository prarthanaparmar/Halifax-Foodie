import '../../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'firebase/firestore';
import 'firebase/auth';

import { Alert, Button, Form } from "react-bootstrap";
import Amplify, { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import firebase from '../../services/firebase';

;

function EmailVerification(props) {
    const location = useLocation();
    const [code, setCode] = useState('');
    const [errMsgCode, setErrMsgCode] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const user = location.myCustomProps
    const history = useHistory();

    const withdrawSubmit = (e) => {
        e.preventDefault();
        Auth.confirmSignUp(user.email, code, {
            forceAliasCreation: true
        }).then((response) => {
            if (response = 'SUCCESS') {
                const db = firebase.firestore();
                db.settings({
                    timestampsInSnapshots: true
                });
                const userRef = db.collection('userDetails').add({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    number: user.number,
                    location: user.location,
                    gender: user.gender,
                    role: user.role,
                    familyName: user.familyName,
                    bornCountry: user.bornCountry
                });
                history.push('/');
            }
        }).catch(
            (err) => {

                document.getElementById("alertError").style.display = "block"
                setAlertMessage(err.message)
            }
        );
    }

    return (
        <section class='bg-whole-page'>
            <Header />
            <br /><br /><br /><br /><br /><br /><br /><br />
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
                                <Form.Label>Enter the verification code received on {user.email} email ID*</Form.Label>
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

                        <Alert id="alertError" style={{ display: 'none' }} variant='danger'>
                            {alertMessage}
                        </Alert>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EmailVerification