// import React from 'react';
// import PropTypes from 'prop-types';
// import './Feedback.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// import logo from './logo.svg';
import "./Feedback.css";
import React, { useState } from "react";
import feedback2 from './cfeedback.js';
// import {reactLocalStorage} from 'reactjs-localstorage';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
const { default: Axios } = require("axios");

function Feedback() {

  const ACCESS_KEY_ID = "ASIA2XIVEUUIH47QAJUQ"
    const SECRET_ACCESS_KEY = "Xjh4Zkqs2esEChkvVlKWnV9KLXkoeIqC43y04WKM"
    const BUCKET_NAME = "customerfeedback5410"
    const SESSION_TOKEN = "FwoGZXIvYXdzEJb//////////wEaDG/awPDgDP3jsOk2VSK/Ad1JuxMHtcSpK1wLB1watPI72zC5CGdkp45kXAGYVk26+nIwYNuS/wLPEWJCjwUDgcVfusyTxFw1FOFcJexSi4GvpqgPBj/+EBdQGce9i2Ldq+Qa0MCIYgTSQaLeurgIJl3c1QxJ62Mg5c3bD31uC8yyB4ozT6hSfdlsos2wEFYdGg0Q5OJunZLfmGOSTUuxhXAfW1tY36jea+039PjNj1ty8iTwLuW94celPC3RSMlh/9ZpMTvW17WnbNWOW3LPKLjDiogGMi1LQJIC8ffflyXuxGk/beURNfDeyKnPwsqcJB7Xv5gu/6kIkmr7wOMXMXgIqoM="
    const BUCKET_KEY = "combinedfeedback.txt"
    const [restaurantid, setrid] = useState("");
    const [customerid, setcid] = useState("");
    const [dishname, setdname] = useState("");
    const [feedback, setfeedback] = useState("");
 
    function formvalidation() {
      return restaurantid.length > 0 && customerid.length > 0 && dishname.length>0 && feedback.length>0 && restaurantid !=null &&
       customerid !=null && dishname !=null && feedback !=null;
    }
 
      async function SubmitFeedback(event) {
        event.preventDefault();
        feedback2({feedback,ACCESS_KEY_ID,SECRET_ACCESS_KEY,BUCKET_NAME,SESSION_TOKEN,BUCKET_KEY});
        alert("Congratulations Customer, your feedback has been recorded successfully.") 
      
      }

    return(
        <body>
            <Header />
            <SideBar />
              <div className="feedback-screen-container">
                <div className="feedback-screen-content">
                  <div className="CustomerFeedBack">
          <Form onSubmit={SubmitFeedback}>
          <Form.Group size="lg" controlId="rid">
              <Form.Label>Restaurant ID</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={restaurantid}
                onChange={(e) => setrid(e.target.value)}
              />
            </Form.Group>  
            <Form.Group size="lg" controlId="cid">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={customerid}
                onChange={(e) => setcid(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="dish">
              <Form.Label>Dish Name</Form.Label>
              <Form.Control
                type="text"
                value={dishname}
                onChange={(e) => setdname(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="feedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                type="text"
                value={feedback}
                onChange={(e) => setfeedback(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!formvalidation()}>
              Submit your feedback.
            </Button>
          </Form>
        </div>
        <div style={{ marginTop: '1%' }}>
                    {/* <h2> Please Click here to see word cloud! </h2> */}
                    <button style={{ marginTop: '4%' }} type="button" onClick={(e) => { 
                      e.preventDefault(); 
                     window.location.href='https://7dhk7r4hu2.execute-api.us-east-1.amazonaws.com/1/feedbackapi';
                      }}
                    > Click here to generate word cloud</button>
                  </div>
                </div>
              </div>
        </body>
  )
}

export default Feedback;
