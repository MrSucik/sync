import {
  Box,
  Typography,
  createStyles,
  makeStyles,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFirestore } from "react-redux-firebase";
import Button from "../components/Button";
import { setAddMediaModalOpen } from "../store/slices/app";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import firebase from "firebase/app";
import { uploadFile } from "../utils/fire";

const useStyles = makeStyles(() =>
  createStyles({
    dropzone: {
      margin: 16,
      padding: "32px 0",
      border: "2px dashed #3f51b5",
      textAlign: "center",
    },
    nameField: {
      flex: 3,
      margin: "0 8px",
    },
    durationField: {
      flex: 2,
      margin: "0 8px",
    },
  })
);

const AddMediaForm: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const handleFileRejection = () =>
    enqueueSnackbar("Invalid file type", { variant: "error" });
  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    accept: "image/jpeg, image/png",
    onDropRejected: handleFileRejection,
  });
  const [duration, setDuration] = useState("30");
  const [name, setName] = useState("");
  const validate = () => {
    if (!acceptedFiles[0]) {
      enqueueSnackbar("Upload a file before saving", { variant: "error" });
      return false;
    }
    if (
      isNaN(duration as any) ||
      parseFloat(duration) < 0 ||
      parseFloat(duration) > 600
    ) {
      enqueueSnackbar("Duration should be less than 600 and more than 0", {
        variant: "error",
      });
      return false;
    }
    return true;
  };
  const handleSave = async () => {
    const valid = validate();
    if (!valid) {
      return;
    }
    setLoading(true);
    try {
      const file = acceptedFiles[0];
      const remoteFileName = await uploadFile(file);
      await firestore.add(
        { collection: "media" },
        {
          created: firebase.firestore.FieldValue.serverTimestamp(),
          color: "blue",
          duration: duration || 30,
          name: name || "New Media",
          source: remoteFileName,
          type: "image",
          ready: false,
        }
      );
      dispatch(setAddMediaModalOpen(false));
      enqueueSnackbar("Media uploaded successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to upload the media", { variant: "error" });
    }
  };
  return (
    <>
      <Box display="flex" padding={1}>
        <TextField
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={classes.nameField}
          label="Name"
          placeholder="New Media"
        />
        <TextField
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          className={classes.durationField}
          label="Duration (seconds)"
          placeholder="30"
          type="number"
          inputProps={{
            min: "0",
            max: "600",
          }}
        />
      </Box>
      <Box className={classes.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography color="primary">
          {acceptedFiles[0] ? acceptedFiles[0].name : "Drop your files here"}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row-reverse" padding={1}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {loading ? <CircularProgress color="inherit" size={24} /> : "Save"}
        </Button>
      </Box>
    </>
  );
};

export default AddMediaForm;
