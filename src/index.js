import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_NOT_GA_TRACKING_ID);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
