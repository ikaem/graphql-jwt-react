import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

import App from './App';
import ApolloClientProvider from './apollo/apollo-provider';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloClientProvider>
        <App />
      </ApolloClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
