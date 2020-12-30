import { Modal, Paper, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardHeader from "../components/CardHeader";
import { RootState } from "../store";
import { setAddMediaModalOpen } from "../store/slices/app";
import AddMediaForm from "./AddMediaForm";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      maxWidth: 500,
      margin: "16px auto 16px auto",
      overflow: "auto",
    },
  })
);

const UploadMediaModal = () => {
  const classes = useStyles();
  const isOpen = useSelector<RootState, boolean>(
    (state) => state.app.addMediaModalOpen
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setAddMediaModalOpen(false));
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Paper className={classes.container}>
        <CardHeader
          title="Upload new media"
          actions={[
            {
              icon: "close",
              onClick: handleClose,
              tooltip: "Close this window",
            },
          ]}
        />
        <AddMediaForm />
      </Paper>
    </Modal>
  );
};

export default UploadMediaModal;
