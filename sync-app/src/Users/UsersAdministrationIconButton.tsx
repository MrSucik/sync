import { Icon, IconButton } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import Tooltip from "../components/Tooltip";
import { setUserAdministrationOpen } from "../store/slices/app";

const UsersAdministrationIconButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setUserAdministrationOpen(true));
  return (
    <Tooltip title="Manage application users">
      <IconButton
        size="small"
        onClick={handleClick}
        style={{ marginRight: 24, color: "#fff" }}
      >
        <Icon color="inherit">assignment_ind</Icon>
      </IconButton>
    </Tooltip>
  );
};
export default UsersAdministrationIconButton;
