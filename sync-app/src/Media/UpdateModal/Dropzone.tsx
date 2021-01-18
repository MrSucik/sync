import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile, getDownloadURL } from "../../utils/fire";
import { needsProcessing } from "../../utils/image";
import { MediaFormData, updateForm } from "../../store/slices/media";
import { RootState } from "../../store";
import { MediaModel } from "../../definitions";

const useStyles = makeStyles(() =>
  createStyles({
    dropzone: {
      margin: 16,
      padding: "32px 0",
      border: "2px dashed #3f51b5",
      textAlign: "center",
    },
  })
);

const Dropzone = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState("");
  const { file } = useSelector<RootState, MediaFormData>(
    (state) => state.media.form
  );
  const updateMedia = useSelector<RootState, MediaModel | null>(
    (state) => state.firestore.data.media[state.media.updateMediaModalState]
  );
  useEffect(() => {
    if (updateMedia?.source) {
      handleFile(updateMedia.source);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMedia]);
  const handleFile = async (remoteFile: string) => {
    setLoading(true);
    const url = await getDownloadURL(remoteFile);
    const isVideo = remoteFile.endsWith("mp4");
    const result = await needsProcessing(url, isVideo ? "video" : "image");
    setMetadata(`${result.width}x${result.height}`);
    dispatch(
      updateForm({
        duration: result.duration,
        durationEnabled: !isVideo && !result.needsProcess,
        file: remoteFile,
      })
    );
    setLoading(false);
  };
  const handleFileAccepted = async (files: File[]) => {
    const file = files[0];
    const remoteFile = await uploadFile(file);
    handleFile(remoteFile);
  };
  const handleFileRejection = () =>
    enqueueSnackbar("Invalid file type", { variant: "error" });
  const { getInputProps, getRootProps } = useDropzone({
    accept: "image/jpeg, image/png, video/mp4",
    onDropRejected: handleFileRejection,
    onDropAccepted: handleFileAccepted,
  });
  return (
    <Box className={classes.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      {!loading ? (
        <Typography color="primary">
          {file ? `${file} (${metadata})` : "Drop your files here"}
        </Typography>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
export default Dropzone;
