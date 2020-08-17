import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";

import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const CreateTrack = ({ classes }) => {
  

  return (
      <div>
        CreateTrack
      </div>
  );
};


const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing(2)
  }
});

export default withStyles(styles)(CreateTrack);
