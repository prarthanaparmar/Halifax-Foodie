
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'

import "./Home_Screen.css"

import { Link } from 'react-router-dom'
import React from 'react';

function Home_Screen() {
    return (
        <body>
            <Header />
            <SideBar />
            <div className="home-screen-container">
                <div className="home-screen-content">
                    <h1>Welcome to HalifaxFoodie!</h1>
                </div>
            </div>
         </body>
    )
}

export default Home_Screen;