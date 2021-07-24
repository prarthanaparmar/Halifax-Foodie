import { Route, Switch } from "react-router-dom";

import Cart from './components/Cart/Cart';
import Chat from './components/Chat/Chat';
import Feedback from './components/Feedback/Feedback';
import Header from './components/Header/Header';
import Home_Screen from './components/Home_Screen/Home_Screen';
import Login from './components/Login/Login';
import Online_Support from './components/Online_Support/Online_Support';
import Order from './components/Order/Order'
import React from "react";
import Register from './components/Register/Registration';
import RestaurantsList from './components/RestaurantsList/RestaurantsList';
import SideBar from './components/SideBar/SideBar'
import Upload_Recipe_Files from './components/Upload_Recipe_Files/Upload_Recipe_Files';
import VerificationPage from './components/Authentication/verifyEmail';

export const Routes = () => (
  <Switch>
    <Route exact path="/home" component={Home_Screen} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/" component={Login} />
    <Route exact path="/chatWithUs" component={Chat} />
    <Route exact path="/online_support" component={Online_Support} />
    <Route exact path="/order" component={Order} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/feedback" component={Feedback} />
    <Route exact path="/upload_recipe_files" component={Upload_Recipe_Files} />
    <Route exact path="/restaurantList" component={RestaurantsList} />
    <Route exact path="/header" component={Header} />
    <Route exact path="/verify" component={VerificationPage}></Route>
    <Route exact path="/sideBar" component={SideBar} />
  </Switch>
);

export default Routes;