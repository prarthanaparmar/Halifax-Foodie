import '../../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'firebase/firestore';
import 'firebase/auth';

import { Alert, Button, Form } from "react-bootstrap";
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Header from '../Header/Header';

function QandA(props) {
    const history = useHistory();
    const location = useLocation();
    const getAnswers = location.myCustomProps
    const [user, setUser] = useState({
        familyName: "",
        bornCountry: ""
    });

    const [validFamilyName, setValidFamilyName] = useState(false);
    const [validBornCountry, setValidBornCountry] = useState(false);

    const [alertMessage, setAlertMessage] = useState('');

    const [errMessage, setErrMessage] = useState({
        msgFamilyName: "",
        msgBornCountry: ""
    });


    const handleChange = (key, value) => {
        setUser({ ...user, [key]: value });
    };
    const handleErrorMsg = (key, value) => {
        setErrMessage({ ...user, [key]: value });
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

    const withdrawSubmit = (e) => {
        e.preventDefault();
        if (!validFamilyName && !validBornCountry) {
            document.getElementById("bornCountry").style.border = "1px solid red"
            document.getElementById("alertAllErrors").style.display = "block"
            document.getElementById("familyName").style.border = "1px solid red"
            setAlertMessage('Please enter required fields')
        }
        else {
            if (validFamilyName) {
                if (validBornCountry) {
                    try {
                        if (user.familyName == getAnswers.familyName) {
                            if (user.bornCountry == getAnswers.bornCountry) {
                                history.push('/home')
                            }
                            else {
                                document.getElementById("bornCountry").style.border = "1px solid red"
                                document.getElementById("alertAllErrors").style.display = "block"
                                setAlertMessage('Incorrect country name')
                            }
                        }
                        else {
                            document.getElementById("familyName").style.border = "1px solid red"
                            document.getElementById("alertAllErrors").style.display = "block"
                            setAlertMessage('Incorrect family name')
                        }
                    } catch (error) {
                        console.log('error signing up:', error);
                    }
                }
                else {
                    document.getElementById("bornCountry").style.border = "1px solid red"
                    document.getElementById("alertAllErrors").style.display = "block"
                    setAlertMessage('Please enter required fields')
                }
            }
            else {
                document.getElementById("familyName").style.border = "1px solid red"
                document.getElementById("alertAllErrors").style.display = "block"
                setAlertMessage('Please enter required fields')
            }
        }
    }

    return (

        <section class='bg-whole-page'>
            <Header />

            <br /><br /><br /><br /><br /><br /><br /><br />
            <div class="container">
                <div class="row">
                    <br /><br />
                    <div class="col-7" style={{ marginLeft: "auto", marginRight: "auto", border: "1px solid black", padding: "2%" }}>
                        <div class="row justify-content-md-center">
                            <div class="col-lg-8" style={{ textAlign: 'center' }}>
                                <h2>MULTIFACTOR AUTHENTICATION</h2>
                            </div>
                        </div>
                        <br />

                        <div class="row">

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

                        <Alert id="alertAllErrors" style={{ display: 'none' }} variant='danger'>
                            {alertMessage}
                        </Alert>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QandA