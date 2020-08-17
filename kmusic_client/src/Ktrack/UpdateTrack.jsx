import React, { useState, useContext } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import { UserContext } from "../Root";
import Error from "../Shared/Error";

const UpdateTrack = ({ classes, track }) => {
  const [open, setOpen] = useState(false);
  const [tittle, setTittle] = useState(track.tittle);
  const [description, setDescription] = useState(track.description);
  const [file, setFile] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fileError, setFileError] = useState("");

const handleAudioChange = event => {
  const selectedFile = event.target.files[0];

  const fileSizeLimit = 5000000; // 5mb
  if (selectedFile && selectedFile.size > fileSizeLimit) {
    setFileError(`${selectedFile.name}: File size too large`);
  } else {
    setFile(selectedFile);
    setFileError("");
  }
};

const handleAudioUpload = async () => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("resource_type", "raw");
    data.append("upload_preset", "ktracks");
    data.append("cloud_name", "robert1");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/robert1/raw/upload",
      data
    );
    return res.data.url;
  } catch (err) {
    console.error("Error uploading file", err);
    setSubmitting(false);
  }
};

const handleSubmit = async (event, updateTrack) => {
  event.preventDefault();
  setSubmitting(true);
  // upload our audio file, get returned url from API
  const uploadedUrl = await handleAudioUpload();
  updateTrack({ variables: {ktrackId: track.id, tittle, description, url: uploadedUrl } });
};

  return (
      <>
        {/* Update Track Button */}
      <IconButton
      onClick={() => setOpen(true)}
      >

        <EditIcon />
      </IconButton>

      <Mutation 
      mutation={UPDATE_TRACK_MUTATION}
          onCompleted={data => {
            console.log({ data });
            setSubmitting(false);
            setOpen(false);
            setTittle("");
            setDescription("");
            setFile("");
          }}
          // refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}
      >
        {(updateTrack, { loading, error }) => {
          if (error) return <Error error={error} />;



          return(
            <Dialog open={open} className={classes.dialog}>
            <form onSubmit={event => handleSubmit(event, updateTrack)}>
              <DialogTitle>Update Track</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add a Title, Description & Audio File
                </DialogContentText>
                <FormControl fullWidth>
                  <TextField
                    label="Title"
                    placeholder="Add Title"
                    onChange={event => setTittle(event.target.value)}
                    value={tittle}
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    multiline
                    rows="3"
                    label="Description"
                    placeholder="Add Description"
                    onChange={event => setDescription(event.target.value)}
                    value={description}
                    className={classes.textField}
                  />
                </FormControl>
                <FormControl
                error={Boolean(fileError)}
                >
                  <input
                    id="audio"
                    required
                    type="file"
                    accept="audio/mp3,audio/wav"
                    className={classes.input}
                    onChange={handleAudioChange}
                  />
                  <label htmlFor="audio">
                    <Button
                      variant="outlined"
                      color={file ? "secondary" : "inherit"}
                      component="span"
                      className={classes.button}
                    >
                      Audio File
                      <LibraryMusicIcon className={classes.icon} />
                    </Button>
                     {file && file.name}
                   <FormHelperText>{fileError}</FormHelperText>
                  </label>
                </FormControl>
              </DialogContent>

              <DialogActions>
                <Button
                  disabled={submitting}
                  onClick={() => setOpen(false)}
                  className={classes.cancel}
                >
                  Cancel
                </Button>
                <Button
                  disabled={
                    submitting ||
                    !tittle.trim() ||
                    !description.trim() ||
                    !file
                  }
                  type="submit"
                  className={classes.save}
                >
                  {submitting ? (
                    <CircularProgress className={classes.save} size={24} />
                  ) : (
                    "Update Track"
                  )}
                  
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          )
        }}
      </Mutation>
      
      
        
      </>
  );
};
const UPDATE_TRACK_MUTATION = gql`
  mutation($ktrackId: Int!, $tittle: String, $url: String, $description: String) {
    updateTrack(
      ktrackId: $ktrackId,
      tittle: $tittle,
      url: $url
      description: $description
    ) {
      ktrack {
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
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing(1)
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing(2)
  },
  icon: {
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});

export default withStyles(styles)(UpdateTrack);
