import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

const Login = ({ classes }) => {
    return(

        <div className={ classes.root }>Login Here </div>
    )
};

const styles = theme => ({
    root: {
      width: "auto",
      display: "block",
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up("md")]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing.unit * 2
    },
    title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%",
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2
    },
    icon: {
      padding: "0px 2px 2px 0px",
      verticalAlign: "middle",
      color: "green"
    }
  });
  
  export default withStyles(styles)(Login);
// export default Register;
  