import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MyBrowserRouter as Router } from './services';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
