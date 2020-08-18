import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUpTwoTone";
import AudiotrackIcon from "@material-ui/icons/AudiotrackTwoTone";
import Divider from "@material-ui/core/Divider";
import format from "date-fns/format";

import AudioPlayer from "../Shared/AudioPlayer";
import Error from "../Shared/Error";
import Loading from "../Shared/Loading";

const Profile = ({ classes, match }) => {
  const id = match.params.id;
  return (
    <Query query={PROFILE_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        return (
          <div>
            {/* User Info Card */}
            <Card className={classes.card}>
              <CardHeader
                avatar={<Avatar>{data.user.username[0]}</Avatar>}
                title={data.user.username}
                subheader={`Joined ${data.user.dateJoined}`}
              />
            </Card>

            {/* Created Tracks */}
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="title" className={classes.title}>
                <AudiotrackIcon className={classes.audioIcon} />
                Created Tracks
              </Typography>
              {data.user.ktrackSet.map(ktrack => (
                <div key={ktrack.id}>
                  <Typography>
                    {ktrack.tittle} · {ktrack.likes.length} Likes
                  </Typography>
                  <AudioPlayer url={ktrack.url} />
                  <Divider className={classes.divider} />
                </div>
              ))}
            </Paper>

            {/* Liked Tracks */}
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="title" className={classes.title}>
                <ThumbUpIcon className={classes.thumbIcon} />
                Liked Tracks
              </Typography>
              {data.user.likeSet.map(({ ktrack }) => (
                <div key={ktrack.id}>
                  <Typography>
                    {ktrack.tittle} · {ktrack.likes.length} Likes ·{" "}
                    {ktrack.postedBy.username}
                  </Typography>
                  <AudioPlayer url={ktrack.url} />
                  <Divider className={classes.divider} />
                </div>
              ))}
            </Paper>
          </div>
        );
      }}
    </Query>
  );
};

const PROFILE_QUERY = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      username
      dateJoined
      likeSet {
        id
        ktrack {
          id
          tittle
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
      ktrackSet {
        id
        tittle
        url
        likes {
          id
        }
      }
    }
  }
`;

const styles = theme => ({
  paper: {
    width: "auto",
    display: "block",
    padding: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  audioIcon: {
    color: "purple",
    fontSize: 30,
    marginRight: theme.spacing(1)
  },
  thumbIcon: {
    color: "green",
    marginRight: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

export default withStyles(styles)(Profile);