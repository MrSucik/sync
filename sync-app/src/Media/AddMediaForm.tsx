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
import { setMediaModalState } from "../store/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import firebase from "firebase/app";
import { uploadFile } from "../utils/fire";
import { RootState } from "../store";
import { MediaModel } from "../definitions";

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
  const updateMediaId = useSelector<RootState, string>(
    (state) => state.app.mediaModalState
  );
  const updateMedia = useSelector<RootState, MediaModel | null>(
    (state) => state.firestore.data.media[updateMediaId]
  );
  const dispatch = useDispatch();
  const handleFileRejection = () =>
    enqueueSnackbar("Invalid file type", { variant: "error" });
  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    accept: "image/jpeg, image/png",
    onDropRejected: handleFileRejection,
  });
  const [duration, setDuration] = useState<string>(
    updateMedia?.duration + "" || "30"
  );
  const [name, setName] = useState<string>(updateMedia?.name || "");
  const validateFile = () => {
    if (!acceptedFiles[0]) {
      enqueueSnackbar("Upload a file before saving", { variant: "error" });
      return false;
    }
  };
  const validate = () => {
    if (!updateMedia && !validateFile()) {
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
  const handleUpdate = async () => {
    try {
      const file = acceptedFiles[0];
      const source = file ? await uploadFile(file) : updateMedia!.source;
      await firestore.update(
        { collection: "media", doc: updateMediaId },
        {
          duration,
          name,
          source,
          type: "image",
          ready: Boolean(file),
        }
      );
      dispatch(setMediaModalState("closed"));
      enqueueSnackbar("Media updated successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to update this media", { variant: "error" });
    }
  };
  const handleSave = async () => {
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
      dispatch(setMediaModalState("closed"));
      enqueueSnackbar("Media uploaded successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to upload the media", { variant: "error" });
    }
  };
  const handleSubmit = async () => {
    const valid = validate();
    if (!valid) {
      return;
    }
    setLoading(true);
    updateMedia ? handleUpdate() : handleSave();
  };
  return (
    <Box style={{ backgroundColor: "#fff" }}>
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
          inputProps={{ min: "0", max: "600" }}
        />
      </Box>
      <Box className={classes.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography color="primary">
          {acceptedFiles[0]
            ? acceptedFiles[0].name
            : updateMedia?.source || "Drop your files here"}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row-reverse" padding={1}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {loading ? (
            <CircularProgress color="inherit" size={24} />
          ) : updateMedia ? (
            "Update"
          ) : (
            "Save"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default AddMediaForm;
