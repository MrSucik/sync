import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { FirebaseReducer } from "react-redux-firebase";
import Tooltip from "../components/Tooltip";
import { RootState } from "../store";

const CurrentUserIcon = () => {
  const { photoURL, email } = useSelector<RootState, FirebaseReducer.AuthState>(
    (state) => state.firebase.auth
  );
  return (
    <Tooltip title={email + ""}>
      <Avatar
        style={{ width: 24, height: 24, alignSelf: "center" }}
        src={photoURL + ""}
      />
    </Tooltip>
  );
};

export default CurrentUserIcon;
