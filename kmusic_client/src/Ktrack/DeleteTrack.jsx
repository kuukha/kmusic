import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";

import { UserContext } from "../Root";
import { GET_TRACKS_QUERY } from "../Pages/App";

const DeleteTrack = ({ track }) => {
  const currentUser = useContext(UserContext);
  const isCurrentUser = currentUser.id === track.postedBy.id;
  
  const handleUpdateCache = (cache, { data: { deleteTrack } }) => {
    const data = cache.readQuery({ query: GET_TRACKS_QUERY });
    const index = data.ktracks.findIndex(
      track => Number(track.id) === deleteTrack.ktrackId
    )
    // data.ktracks.splice(index, 1)
    const ktracks = [...data.ktracks.slice(0, index), ...data.ktracks.slice(index + 1)]
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { ktracks } });
  };
  

  return isCurrentUser && (

    <Mutation mutation={DELETE_TRACK_MUTATION}
    variables={{ ktrackId: track.id }}

    onCompleted={data => {
      console.log({ data })
    } }
    update={handleUpdateCache}
    // refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}
    >
      {deleteTrack => (

        <IconButton onClick={deleteTrack}>
          <TrashIcon />
        </IconButton>
      )}
    </Mutation>
  )

}

const DELETE_TRACK_MUTATION = gql`
  mutation($ktrackId: Int!) {
    deleteTrack(ktrackId: $ktrackId) {
      ktrackId
    }
  }
`;

export default DeleteTrack;
