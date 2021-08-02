
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
import './ReportGeneration.css';

const ReportGeneration = (props) => {
return(
    <body>
        <Header />
      <SideBar />
      <div className="report-screen-container">
        <div className="report-screen-content">
        <div style={{ marginTop: '1%' }}>
                    <button style={{ marginTop: '4%' }} type="button" onClick={(e) => { 
                      e.preventDefault(); 
                     window.location.href='https://datastudio.google.com/embed/reporting/6105bd5b-b1db-4729-878e-cc481ec4f197/page/QvmWC';
                      }}
                    > Click here to view reports</button>
                  </div>
{/* <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/6105bd5b-b1db-4729-878e-cc481ec4f197/page/QvmWC" frameborder="0" style="border:0" allowfullscreen></iframe> */}
    </div>
    </div>
    
    </body>
)
}

export default ReportGeneration;