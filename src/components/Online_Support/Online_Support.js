import React, { Component } from "react";
import LexChat from "react-lex";
// import LexChat from "react-lex-plus";
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'

// https://github.com/promediacorp/react-lex
// https://aws.amazon.com/blogs/machine-learning/greetings-visitor-engage-your-web-users-with-amazon-lex/
// https://github.com/venkateshkodumuri/Lex_Chatbot_to_fetch_data_from_dynamodb/blob/main/lambda_function.py
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
        // greeting={
        // "Hello, how can I help? You can say things like 'help' to get more info"
        // }
      />
      </body>
    );
  }
}
export default Online_Support;