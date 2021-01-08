import { Modal, Paper, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardHeader from "../components/CardHeader";
import { MediaModel } from "../definitions";
import { RootState } from "../store";
import { ModalState, setDeviceModalState } from "../store/slices/app";
import UpdateDeviceForm from "./UpdateDeviceForm";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: 300,
      margin: "16px auto 16px auto",
      overflow: "auto",
    },
  })
);

const UploadDeviceModal = () => {
  const classes = useStyles();
  const modalState = useSelector<RootState, ModalState>(
    (state) => state.app.deviceModalState
  );
  const updateDevice = useSelector<RootState, MediaModel | null>(
    (state) => state.firestore.data.clients[modalState]
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setDeviceModalState("closed"));
  return (
    <Modal open={modalState !== "closed"} onClose={handleClose}>
      <Paper className={classes.container}>
        <CardHeader
          title={updateDevice ? "Configure device" : "Add new device"}
          actions={[
            {
              icon: "close",
              onClick: handleClose,
              tooltip: "Close this window",
            },
          ]}
        />
        <UpdateDeviceForm />
      </Paper>
    </Modal>
  );
};

export default UploadDeviceModal;
