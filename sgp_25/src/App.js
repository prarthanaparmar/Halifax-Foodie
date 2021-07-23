// import logo from './logo.svg';
// import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import LoginPage from './Component/Login';
import RegistrationPage from './Component/Registration';
import VerificationPage from './Component/verifyEmail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={LoginPage}></Route>
          <Route exact path="/register" component={RegistrationPage}></Route>
          <Route exact path="/verify" component={VerificationPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
