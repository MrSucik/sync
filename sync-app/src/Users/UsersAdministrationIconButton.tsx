import React from "react";
import { useDispatch } from "react-redux";
import Action from "../components/Action";
import { setUserAdministrationOpen } from "../store/slices/settings";

const UsersAdministrationIconButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setUserAdministrationOpen(true));
  return (
    <Action
      icon="settings"
      onClick={handleClick}
      tooltip="Open application settings"
      iconProps={{ style: { color: "white" } }}
    />
  );
};
export default UsersAdministrationIconButton;
