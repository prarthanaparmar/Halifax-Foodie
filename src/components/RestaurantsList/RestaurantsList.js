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
  const history = useHistory();

  const routeChange = () =>{ 
    let path = '/order'; 
    history.push(path);
  }
  return(
  <body>
    <Header />
    <SideBar />
    <div className="restaurant-screen-container">
        <div className="restaurant-screen-content">
        {/* <CardDeck> */}
        <Card className="course" >
        <Card.Body>
              <Card.Title>Chilis</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Famous for Chinese cuisines</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Card.Link href="/order">Click here to Order food!</Card.Link>
        </Card.Body>
        </Card>
        <br />

        <Card border="primary" style={{ width: '20rem' }}>
            <Card.Title>Olive Garden</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">One stop for Japanese food</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Card.Link href="/order">Click here to Order food!</Card.Link>
        </Card>
        {/* </CardDeck> */}
      <br />
       </div>
      </div>
  </body>
)
}

export default RestaurantsList;
