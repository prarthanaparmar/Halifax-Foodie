import React, { Component } from "react";
import LexChat from "react-lex";
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
import './Online_Support.css'


class Online_Support extends Component {
  render() {
    return (
        <body>
            <Header />
            <SideBar />
            <div className="home-screen-container">
                <div className="home-screen-content">
                  <h2>Welcome to Help Page</h2>
                  <h3>Our Bot will answer your queries</h3>
                </div>
            </div>
      <LexChat
        botName="HalifaxFoodieBot"
        IdentityPoolId="us-east-1:aba89626-098f-4557-bdc4-e7f179605f28"
        placeholder="Type your query"
        style={{ position: "absolute" }}
        backgroundColor="#f5bfbf"
        height="430px"
        region="us-east-1"
        headerText="Chat with our awesome bot"
        headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "10px" }}
      />
      </body>
    );
  }
}
export default Online_Support;