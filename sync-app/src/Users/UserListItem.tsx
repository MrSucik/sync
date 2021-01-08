import { ListItemText } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useFirestore } from "react-redux-firebase";
import ListItem from "../components/ListItem";

interface Props {
  user: string;
}

const UserListItem: React.FC<Props> = ({ user }) => {
  const firestore = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteClick = async () => {
    try {
      await firestore.delete({ collection: "users", doc: user });
      enqueueSnackbar("User successfully deleted from administration.", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to delete this user from administration.", {
        variant: "error",
      });
    }
  };
  return (
    <ListItem
      body={<ListItemText primary={user} />}
      actions={[
        {
          icon: "delete",
          tooltip: "Delete this user from administration",
          onClick: handleDeleteClick,
        },
      ]}
    />
  );
};
export default UserListItem;
