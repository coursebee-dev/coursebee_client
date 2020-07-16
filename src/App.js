import React, { Component } from "react";
import { Router } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import setCurrentUser from "./actions/setUser";
import logoutUser from "./actions/logoutAction";

import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history'
import { Helmet } from 'react-helmet';
import PathRoute from "./router";

//axios.defaults.baseURL = "http://localhost:5000"
//axios.defaults.baseURL = "https://coursebee-server-staging.herokuapp.com"
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
        "Coursebee is online education platform where we disseminate contemporary knowledge through live classroom , training and video based courses.",
      url: "https://coursebee.com/",
      image: ""
    };
    return (
      <>
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
            <PathRoute />
          </Router>
        </Provider>
      </>
    );
  }
}
export default App;