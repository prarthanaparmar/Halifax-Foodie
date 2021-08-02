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
import RestaurantsList from './components/RestaurantsList/RestaurantsList';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar'
import Authentication from './components/Authentication/verifyEmail';
import Question from './components/Login/qa';
import Visualisation from "./components/Visualization/Visualization";
import ReportGeneration from './components/Report_Generation/ReportGeneration';

export const Routes = () => (
  <Switch>
    <Route exact path="/home" component={Home_Screen} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/" component={Login} />
    <Route exact path="/chatWithUs" component={Chat} />
    <Route exact path="/online_support" component={Online_Support} />
    <Route exact path="/order" component={Order} />
    <Route exact path="/feedback" component={Feedback} />
    <Route exact path="/upload_recipe_files" component={Upload_Recipe_Files} />
    <Route exact path="/restaurantList" component={RestaurantsList} />
    <Route exact path="/header" component={Header} />
    <Route exact path="/sideBar" component={SideBar} />
    <Route exact path="/verify" component={Authentication} />
    <Route exact path="/qa" component={Question} />
    <Route exact path="/visual" component={Visualisation} />
    <Route exact path="/report" component={ReportGeneration} />


  </Switch>
);

export default Routes;