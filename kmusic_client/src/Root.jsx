import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import withRoot from "./withRoot";
import Header from "./Shared/Header";
import App from "./Pages/App";
import Profile from "./Pages/Profile";
import Error from "./Shared/Error";

export const UserContext = React.createContext();

const Root = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;
      const currentUser = data.me;

      return(
        <Router>
          <UserContext.Provider value={currentUser}>
          <Header currentUser={currentUser} />
          <Switch>
          <Route exact path="/" component={App} />
          <Route path="/profile/:id" component={Profile} />

           </Switch>
           </UserContext.Provider>
        </Router>
      )

    }}
  </Query>
);

export const ME_QUERY = gql`
  {
    me {
      id
      username
      email
      likeSet{
        ktrack{
          id
        }
      }
      }
    }
`;


export default withRoot(Root);
