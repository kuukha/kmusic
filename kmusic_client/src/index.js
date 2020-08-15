import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from 'react-apollo'
import AppoloClient from 'apollo-boost'
import Auth from './Auth/Index'

const apiclient = new AppoloClient({
  uri: 'http://localhost:8000/graphql/'
})

ReactDOM.render(

  <ApolloProvider client={apiclient}>
      <BrowserRouter>
          {/* <App></App> */}
          <Auth></Auth>
      </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
