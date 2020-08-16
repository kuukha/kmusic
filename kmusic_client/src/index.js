import React from 'react';
import ReactDOM from 'react-dom';

import Root from "./Root.jsx";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider, Query } from 'react-apollo'
import AppoloClient, { gql } from 'apollo-boost'
import Auth from './Auth/Index'

const client = new AppoloClient({
  uri: 'http://localhost:8000/graphql/',

  fetchOptions: {
    credentials: "include"
  },

  request: operation => {
    const token = localStorage.getItem("authToken") || "";
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`
      }
    });
  },

  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem("authToken")
    }
  }
})

const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

ReactDOM.render(

  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN_QUERY}>
      {({ data }) => (data.isLoggedIn ? <Root /> : <Auth />)}
    </Query>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
