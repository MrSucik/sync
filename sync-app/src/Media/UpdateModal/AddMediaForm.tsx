import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFirestore } from "react-redux-firebase";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { createNewMedia } from "../../utils/fire";
import { RootState } from "../../store";
import { MediaModel } from "../../definitions";
import Dropzone from "./Dropzone";
import {
  MediaFormData,
  setUpdateMediaModalState,
  updateDuration,
  updateName,
} from "../../store/slices/media";
import FormFields from "./FormFields";

const AddMediaForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const { name, file, duration } = useSelector<RootState, MediaFormData>(
    (state) => state.media.form
  );
  const updateMediaId = useSelector<RootState, string>(
    (state) => state.media.updateMediaModalState
  );
  const updateMedia = useSelector<RootState, MediaModel | null>(
    (state) => state.firestore.data.media[updateMediaId]
  );
  useEffect(() => {
    if (updateMedia) {
      dispatch(updateDuration(updateMedia.duration.toString()));
      dispatch(updateName(updateMedia.name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMedia]);
  const dispatch = useDispatch();
  const validate = () => {
    if (!updateMedia) {
      if (!file) {
        enqueueSnackbar("Upload a file before saving", { variant: "error" });
        return false;
      }
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
      await firestore.update(
        { collection: "media", doc: updateMediaId },
        // TODO: Fix type
        { duration, name, originalSource: file, type: "image", ready: !Boolean(file) }
      );
      enqueueSnackbar("Media updated successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to update this media", { variant: "error" });
    }
  };
  const handleSave = async () => {
    try {
      await createNewMedia(name, duration, file);
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
    try {
      setLoading(true);
      await (updateMedia ? handleUpdate : handleSave)();
    } finally {
      dispatch(setUpdateMediaModalState("closed"));
      setLoading(false);
    }
  };
  return (
    <Box style={{ backgroundColor: "#fff" }}>
      <FormFields />
      <Dropzone />
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
