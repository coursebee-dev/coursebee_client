import React, { Component } from "react";
import {  Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import setCurrentUser from "./actions/setUser";
import logoutUser from "./actions/logoutAction";

import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";


import Navbar from "./components/layout/Navbar";
import Landing from "./components/landing/Landing";
import LandingMentor from "./components/landingMentor/LandingMentor";
import LandingAdmin from "./components/landingAdmin/LandingAdmin";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import RegisterMentor from "./components/authMentor/RegisterMentor";
import LoginMentor from "./components/authMentor/LoginMentor";
import RegisterAdmin from "./components/authAdmin/RegisterAdmin";
import LoginAdmin from "./components/authAdmin/LoginAdmin";
import VerifyEmail from "./components/verifyEmail/VerifyEmail"
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardMentor from "./components/dashboardMentor/DashboardMentor";
import DashboardAdmin from "./components/dashboardAdmin/DashboardAdmin";
import Footer from "./components/layout/Footer";
import About from "./components/about/About";
import ComingSoon from "./components/comingSoon/ComingSoon";
import ReactGA from 'react-ga';
import {createBrowserHistory} from 'history'

//axios.defaults.baseURL="http://localhost:5000"
axios.defaults.baseURL = "https://coursebee-server.herokuapp.com"
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to home
    window.location.href = "./";
  }
}

const history = createBrowserHistory()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

class App extends Component {
  
  componentDidMount() {
		ReactGA.pageview(window.location.pathname)
  }
  
  render() {
    return (
      <>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route  path="/mentor" component={LandingMentor} />
              <Route  path="/admin" component={LandingAdmin} />
              <Route  path="/register" component={Register} />
              <Route  path="/login" component={Login} />
              <Route  path="/mentor/register" component={RegisterMentor} />
              <Route  path="/mentor/login" component={LoginMentor} />
              <Route  path="/admin/register" component={RegisterAdmin} />
              <Route  path="/admin/login" component={LoginAdmin} />
              <Route  path="/verifyEmail" component={VerifyEmail} />
              <Route  path="/about" component={About} />
              <Route  path="/comingSoon" component={ComingSoon} />
              <PrivateRoute  path="/dashboard" component={Dashboard} />
              <PrivateRoute  path="/mentor/dashboard" component={DashboardMentor} />
              <PrivateRoute  path="/admin/dashboard" component={DashboardAdmin} />
              <Footer />
            </div>
          </Switch>
        </Router>
      </Provider>
      </>
    );
  }
}
export default App;