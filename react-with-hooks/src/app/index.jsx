/**
 * @author Afzal Ashraf <afzalashraf.dev@gmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { browserHistory } from 'react-router'

import App from './components/App';

//  styles
import './styles/index.scss';
import './styles/animate.scss';
import './styles/rcsteps.scss';

const favIcon = require('assets/images/fav.ico');

ReactDOM.render(
  <Router history={browserHistory}>
    <App />
  </Router>,
  document.getElementById('root'),
);
