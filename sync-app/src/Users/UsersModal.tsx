import { Modal } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import CardHeader from "../components/CardHeader";
import { RootState } from "../store";
import { setUserAdministrationOpen } from "../store/slices/settings";
import AddUserButton from "./AddUserButton";
import UsersList from "./UsersList";

const UsersModal = () => {
  const open = useSelector<RootState, boolean>(
    (state) => state.settings.userAdministrationOpen
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setUserAdministrationOpen(false));
  return (
    <Modal open={open} onClose={handleClose}>
      <Card
        outerBoxProps={{ style: { maxWidth: 400, margin: "16px auto" } }}
        fill
      >
        <CardHeader
          title="Manage application users"
          actions={[
            {
              icon: "close",
              tooltip: "Close this window",
              onClick: handleClose,
            },
          ]}
        />
        <AddUserButton />
        <UsersList />
      </Card>
    </Modal>
  );
};

export default UsersModal;
