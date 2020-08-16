import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";

// import Loading from "../Shared/Loading";
// import Error from "../components/Shared/Error";

const Profile = ({ classes }) => {
  

  return (
      <div>Profile</div>
    // <div className={classes.container}>

    //   <Query query={GET_TRACKS_QUERY}>
    //     {({ data, loading, error }) => {
    //       if (loading) return <Loading />;
    //       if (error) return <Error error={error} />;
    //       const tracks = searchResults.length > 0 ? searchResults : data.tracks;

    //       return <TrackList tracks={tracks} />;
    //     }}
    //   </Query>
    // </div>
  );
};

// export const GET_TRACKS_QUERY = gql`
//   query getTracksQuery {
//     tracks {
//       id
//       title
//       description
//       url
//       likes {
//         id
//       }
//       postedBy {
//         id
//         username
//       }
//     }
//   }
// `;

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Profile);