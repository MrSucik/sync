import { Modal, Paper, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardHeader from "../components/CardHeader";
import { MediaModel } from "../definitions";
import { RootState } from "../store";
import { ModalState, setMediaModalState } from "../store/slices/app";
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
  const modalState = useSelector<RootState, ModalState>(
    (state) => state.app.mediaModalState
  );
  const updateMedia = useSelector<RootState, MediaModel | null>(
    (state) => state.firestore.data.media[modalState]
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setMediaModalState("closed"));
  return (
    <Modal open={modalState !== "closed"} onClose={handleClose}>
      <Paper className={classes.container}>
        <CardHeader
          title={updateMedia ? "Edit media" : "Upload new media"}
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
