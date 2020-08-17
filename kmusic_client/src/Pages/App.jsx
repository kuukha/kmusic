import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";

import SearchTracks from "../Ktrack/SearchTracks";
import TrackList from "../Ktrack/TrackList";
import CreateTrack from "../Ktrack/CreateTrack";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const App = ({ classes }) => {
  

  return (
      <div className={classes.container}>
      <SearchTracks />
      <CreateTrack />

      <Query query={GET_TRACKS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        return <TrackList ktracks={data.ktracks} />;
        
      }}
      </Query>

      </div>
  );
};

export const GET_TRACKS_QUERY = gql`
  query getTracksQuery {
    ktracks {
      id
      tittle
      description
      url
      likes {
        id
      }
      postedBy {
        id
        username
      }
    }
  }
`;

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing(2)
  }
});

export default withStyles(styles)(App);
