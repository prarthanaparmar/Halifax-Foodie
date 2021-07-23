import React from 'react';
import PropTypes from 'prop-types';
import './Upload_Recipe_Files.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'

// const Upload_Recipe_Files = () => (
//   <div className={styles.Upload_Recipe_Files}>
//     Upload_Recipe_Files Component
//   </div>
// );

function Upload_Recipe_Files() {
return(
  <body>
      <Header />
      <SideBar />
        <div className="uploadFile-screen-container">
           <div className="uploadFile-screen-content">
           </div>
        </div>
  </body>
)}

// Upload_Recipe_Files.propTypes = {};

// Upload_Recipe_Files.defaultProps = {};

export default Upload_Recipe_Files;
