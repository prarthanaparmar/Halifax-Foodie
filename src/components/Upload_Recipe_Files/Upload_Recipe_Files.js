import React from 'react';
import PropTypes from 'prop-types';
import './Upload_Recipe_Files.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
import {useState} from 'react';
import axios from 'axios';

function Upload_Recipe_Files() {
    const [uploadFile, setUploadFile] = React.useState();
    const [superHero, setSuperHero] = React.useState();
    
    const submitForm = (event) => {
      event.preventDefault();
  
      const dataArray = new FormData();
      dataArray.append("superHeroName", superHero);
      dataArray.append("uploadFile", uploadFile);

    axios
    .post("url here", dataArray, { // paste url here!
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
        alert(response);
    })
    .catch((error) => {
      alert(error)
    });
};

return(
  <body>
      <Header />
      <SideBar />
      <div className="uploadFile-screen-container">
        <div className="uploadFile-screen-content">
      <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          onChange={(e) => setSuperHero(e.target.value)}
          placeholder={"File name"}
        />
        <br />
        <input type="file" onChange={(e) => setUploadFile(e.target.files)} />
        <br />
        <input type="submit" />
      </form>
            </div>
           </div>
        </div>
  </body>
)}

// Upload_Recipe_Files.propTypes = {};

// Upload_Recipe_Files.defaultProps = {};

export default Upload_Recipe_Files;
