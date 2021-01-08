import { List } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import UserListItem from "./UserListItem";

const UsersList = () => {
  const users = useSelector<RootState, string[]>((state) =>
    Object.keys(state.firestore.data.users)
  );
  return (
    <List>
      {users.map((user) => (
        <UserListItem key={user} user={user} />
      ))}
    </List>
  );
};

export default UsersList;
