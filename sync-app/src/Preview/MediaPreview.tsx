import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { MediaModel } from "../definitions";
import { useDownloadURL } from "../hooks/useDownloadURL";
import { useTimeout } from "../hooks/useTimeout";
import Progress from "./Progress";

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      position: "absolute",
      left: 0,
      top: "50%",
      right: 0,
      width: "100%",
      transform: "translateY(-50%)",
    },
  })
);

interface Props {
  media: MediaModel;
  onMediaEnd: () => void;
}

const MediaPreview: React.FC<Props> = ({ media, onMediaEnd }) => {
  const classes = useStyles();
  useTimeout(media.duration, onMediaEnd);
  const downloadURL = useDownloadURL(media.source);
  return (
    <>
      <Progress media={media} />
      {media.type === "image" ? (
        <img className={classes.media} src={downloadURL} alt={media.name} />
      ) : (
        <video className={classes.media} src={downloadURL} autoPlay />
      )}
    </>
  );
};

export default MediaPreview;
