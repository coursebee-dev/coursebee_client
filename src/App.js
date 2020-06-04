import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
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
import LiveClass from "./components/liveClass/LiveClass";
import Course from "./components/course/Course";
import Training from "./components/training/Training";
import {Helmet} from 'react-helmet';

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
    const seo = {
      title: "Coursebee",
      description:
        "A free, online API builder that works with CORS. A Postman alternative without the need for client app installation.",
      url: "https://coursebee.com/",
      image: ""
    };
    return (
      <div className="App">
        <Helmet
  title={seo.title}
  meta={[
    {
      name: "description",
      property: "og:description",
      content: seo.description
    },
    { property: "og:title", content: seo.title },
    { property: "og:url", content: seo.url },
  ]}
/>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
          <React.Fragment>
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/mentor" component={LandingMentor} />
              <Route exact path="/admin" component={LandingAdmin} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/mentor/register" component={RegisterMentor} />
              <Route exact path="/mentor/login" component={LoginMentor} />
              <Route exact path="/admin/register" component={RegisterAdmin} />
              <Route exact path="/admin/login" component={LoginAdmin} />
              <Route exact path="/verifyEmail" component={VerifyEmail} />
              <Route exact path="/about" component={About} />
              <Route exact path="/comingSoon" component={ComingSoon} />
              <Route exact path="/liveClassroom" component={LiveClass} />
              <Route exact path="/course" component={Course} />
              <Route exact path="/training" component={Training} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/mentor/dashboard" component={DashboardMentor} />
              <PrivateRoute exact path="/admin/dashboard" component={DashboardAdmin} />
              <Footer />
              </React.Fragment>
          </Switch>
        </Router>
      </Provider>
      </div>
    );
  }
}
export default App;