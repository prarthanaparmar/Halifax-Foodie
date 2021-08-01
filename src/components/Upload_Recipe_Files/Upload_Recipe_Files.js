import React from 'react';
import './Upload_Recipe_Files.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
import {useState} from 'react';
import axios from 'axios';

function Upload_Recipe_Files() {
 const [text, setText] = useState('');


const onFileUpload = (event) => {
  event.preventDefault();
  console.log(text);
  axios({
    method: 'post',
    url: 'https://backend-yfg27siima-uc.a.run.app/api/upload/uploadrecipe',
    data: {
      msg: 'testing',
      text: text,
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(response.data.output);
      let responseObj = response.data.output;

      alert(response.data.output);
    })
    .catch((error) => {
      alert(error);
    });
};

const handleTextBox = (event) => {
  setText(event.target.value);
};

return(
  <body>
      <Header />
      <SideBar />
<div className='uploadFile-screen-container'>   
        <div className='uploadFile-screen-content'>
          <div>
            <h3 style={{ marginTop: '5%', marginRight: '2%' }}>Enter you text recipe here </h3>
            <form
              style={{ marginTop: '5%', marginRight: '2%' }}
              onSubmit={onFileUpload}
            >
              <textarea style={{ width: '50%', height: '100%' }} onChange={handleTextBox} value={text}></textarea>
              <button style={{ marginLeft: '2%', marginRight: '10%' }} onClick={onFileUpload}>Upload!</button>
            </form>
          </div>
        </div>
      </div>
  </body>
)}


export default Upload_Recipe_Files;
  