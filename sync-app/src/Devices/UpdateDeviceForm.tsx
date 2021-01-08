import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import Button from "../components/Button";
import { setDeviceModalState } from "../store/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import firebase from "firebase/app";
import { RootState } from "../store";
import { ClientModel } from "../definitions";
import IconSelect from "../components/IconSelect";

const useStyles = makeStyles(() =>
  createStyles({
    nameField: {
      flex: 1,
      margin: "0 8px",
    },
  })
);

const UpdateDeviceForm: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const updateDeviceId = useSelector<RootState, string>(
    (state) => state.app.deviceModalState
  );
  const updateDevice = useSelector<RootState, ClientModel | null>(
    (state) => state.firestore.data.clients[updateDeviceId]
  );
  const defaultScene = useSelector<RootState, string>(
    (state) => state.firestore.ordered.scenes[0]?.id
  );
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(updateDevice?.name || "");
  const [icon, setIcon] = useState<string>(updateDevice?.icon || "");
  const handleUpdate = async () => {
    try {
      await firestore.update(
        { collection: "clients", doc: updateDeviceId },
        {
          icon: icon,
          name,
        }
      );
      dispatch(setDeviceModalState("closed"));
      enqueueSnackbar("Device updated successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to update this device", { variant: "error" });
    }
  };
  const handleSave = async () => {
    try {
      await firestore.add(
        { collection: "clients" },
        {
          created: firebase.firestore.FieldValue.serverTimestamp(),
          name: name || "New Device",
          icon,
          scene: defaultScene,
        }
      );
      dispatch(setDeviceModalState("closed"));
      enqueueSnackbar("Device added successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to add the device", { variant: "error" });
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    updateDevice ? handleUpdate() : handleSave();
  };
  return (
    <Box style={{ backgroundColor: "#fff" }}>
      <Box display="flex" padding={1}>
        <TextField
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={classes.nameField}
          label="Name"
          placeholder="New Device"
        />
      </Box>
      <IconSelect icon={icon} onChange={(value) => setIcon(value)} />
      <Box display="flex" flexDirection="row-reverse" padding={1}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {loading ? (
            <CircularProgress color="inherit" size={24} />
          ) : updateDevice ? (
            "Update"
          ) : (
            "Save"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateDeviceForm;
