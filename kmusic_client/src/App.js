import React from 'react';
import logo from './logo.svg';
import './App.css';
import withRoot from "./withRoot";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const App = () => (
  <Query query={GET_TRACKS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;
      // const currentUser = data.me;

      return <div>{JSON.stringify(data)}</div>
    }}
  </Query>
)

const GET_TRACKS_QUERY = gql`
{
  ktracks{
    id
    tittle
    description
    url
  }
}
`

export default withRoot(App);
