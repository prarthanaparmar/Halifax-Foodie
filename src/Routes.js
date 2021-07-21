import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from './components/Register/Register';
import Home_Screen from './components/Home_Screen/Home_Screen';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Online_Support from './components/Online_Support/Online_Support';
import Feedback from './components/Feedback/Feedback';
import Upload_Recipe_Files from './components/Upload_Recipe_Files/Upload_Recipe_Files';
import Order from './components/Order/Order'

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home_Screen} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/chatbot" component={Chat} />
    <Route exact path="/online_support" component={Online_Support} />
    <Route exact path="/order" component={Order} />
    <Route exact path="/feedback" component={Feedback} />
    <Route exact path="/upload_recipe_files" component={Upload_Recipe_Files} />
  </Switch>
);

export default Routes;