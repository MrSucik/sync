import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import CurrentUserIcon from "../Authorization/CurrentUserIcon";
import LogoutButton from "../Authorization/LogoutButton";
import { RootState } from "../store";
import UsersAdministrationIconButton from "../Users/UsersAdministrationIconButton";

const HeaderButtons = () => {
  const isEmpty = useSelector<RootState, boolean>(
    (state) => state.firebase.auth.isEmpty
  );
  const openSettingsButtonVisible = useSelector<RootState, boolean>(
    (state) => state.settings.openSettingsButtonVisible
  );
  return !isEmpty ? (
    <Box display="flex">
      {openSettingsButtonVisible && <UsersAdministrationIconButton />}
      <CurrentUserIcon />
      <LogoutButton />
    </Box>
  ) : null;
};

export default HeaderButtons;
