import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-168052447-1');


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
