import React from "react";
import { createStyles, Icon, IconButton, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setPreviewMediaList } from "../store/slices/preview";
import Tooltip from "../components/Tooltip";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      position: "absolute",
      top: 16,
      right: -48,
      transform: "translateY(-50%)",
      color: "white",
    },
  })
);

const CloseModalPreview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(setPreviewMediaList({ type: "closed", mediaList: [] }));
  return (
    <Tooltip title="Close the preview">
      <IconButton className={classes.icon} onClick={handleClick}>
        <Icon>close</Icon>
      </IconButton>
    </Tooltip>
  );
};

export default CloseModalPreview;
