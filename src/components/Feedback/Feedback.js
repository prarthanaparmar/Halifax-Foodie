import React from 'react';
import PropTypes from 'prop-types';
import './Feedback.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'

function Feedback() {
    return(
        <body>
            <Header />
            <SideBar />
              <div className="feedback-screen-container">
                <div className="feedback-screen-content">
                </div>
              </div>
        </body>
  )
}
//   <div className={styles.Feedback}>
//     Feedback Component
//   </div>
// );

// Feedback.propTypes = {};

// Feedback.defaultProps = {};

export default Feedback;
