import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.css';

// import * as AiIcons from 'react-icons/ai'
// import * as FaIcons from 'react-icons/fa'
// import * as IoIcons from 'react-icons/io5'

import { Link } from 'react-router-dom'
// import React from 'react'

function SideBar() {
    return (
        <div className='navBar' >
            <nav className='nav-menu' >
                <ul className='nav-menu-items' >
                    <li className='nav-text' style={{ marginTop: '10%'}} >
                        <Link to='/online_support'>
                            <span > ChatBot </span> 
                        </Link > 
                    </li> 
                    <li className='nav-text' >
                        <Link to='/chatWithUs' >
                            <span > Chat </span> 
                        </Link > 
                    </li> 
                    <li className='nav-text' >
                        <Link to='/restaurantList' >
                            <span > Place an Order </span> 
                        </Link > 
                    </li> 
                    <li className='nav-text' >
                        <Link to='/feedback' >
                            <span > Feedback </span> 
                        </Link > 
                    </li> 
                    <li className='nav-text' >
                        <Link to='/upload_recipe_files' >
                            <span > Upload Recipe Files </span> 
                        </Link > 
                    </li> 
                    <li className='nav-text' >
                        <Link to='/visual' >
                            <span > Visualisation </span> 
                        </Link > 
                    </li> 
                    <li className='nav-text' >
                        <Link to='/report' >
                            <span >  Report Generation </span> 
                        </Link > 
                    </li> 
                </ul > 
            </nav> 
        </div >
    )
}

export default SideBar;
