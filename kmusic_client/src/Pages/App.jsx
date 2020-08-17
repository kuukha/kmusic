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
  const [searchResults, setSearchResults] = useState([]);
  

  return (
      <div className={classes.container}>
      <SearchTracks setSearchResults={setSearchResults} />
      <CreateTrack />

      <Query query={GET_TRACKS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        const ktracks = searchResults.length > 0 ? searchResults : data.ktracks;
        return <TrackList ktracks={ktracks} />;
        
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
