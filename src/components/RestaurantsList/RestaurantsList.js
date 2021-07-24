import React from 'react';
import PropTypes from 'prop-types';
// import Select from 'react-select'
import './RestaurantsList.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
// import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

function RestaurantsList() {
  // const history = useHistory();

  // const routeChange = () =>{ 
  //   let path = '/order'; 
  //   history.push(path);
  // }
  return(
  <body>
    <Header />
    <SideBar />
    <div className="restaurant-screen-container">
        <div className="restaurant-screen-content">
        <Card border="primary" style={{ marginLeft: '7%', width: '20rem' }}>
              <Card.Img variant="top" src='images/chilis.png' style={{ width: '90%', height: '50%'}} alt="olive image" />
              <Card.Body>
                  <Card.Title>Chillis</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">One stop for Japanese food</Card.Subtitle> */}
                  <Card.Text style={{ color:'black' }}>
                  Family-friendly chain serving classic Tex-Mex & American fare in a Southwestern-style setting.
                  </Card.Text>
                  <Card.Link href="/order">Click here to Order food!</Card.Link>
                  </Card.Body>
              </Card>
            <br></br>

              <Card border="primary" style={{ marginLeft: '7%', width: '20rem' }}>
              <Card.Img variant="top" src='images/oliveGarden.jpeg' style={{ width: '90%', height: '50%'}} alt="chef iamge" />
              <Card.Body>
                  <Card.Title>Olive Garden</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">One stop for Japanese food</Card.Subtitle> */}
                  <Card.Text style={{ color:'black' }}>
                  Lively, family-friendly chain featuring Italian standards such as pastas & salads.
                  </Card.Text>
                  <Card.Link href="/order">Click here to Order food!</Card.Link>
                  </Card.Body>
              </Card>
           <br />
        </div>
      </div>
  </body>
)
}

export default RestaurantsList;
