import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { MediaModel } from "../definitions";
import { useDownloadURL } from "../hooks/useDownloadURL";
import { useTimeout } from "../hooks/useTimeout";
import moment from "moment";

interface Props {
  media: MediaModel;
  onMediaEnd: () => void;
}

const MediaPreview: React.FC<Props> = ({ media, onMediaEnd }) => {
  useTimeout(media.duration, onMediaEnd);
  const [progress, setProgress] = useState(0);
  const downloadURL = useDownloadURL(media.source);
  useEffect(() => {
    const startTime = moment();
    const interval = setInterval(() => {
      setProgress((moment().diff(startTime) / (media.duration * 1000)) * 100);
    }, 100);
    return () => clearInterval(interval);
  }, [media.duration]);
  return (
    <>
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={progress}
      />
      {media.type === "image" ? (
        <img
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            right: 0,
            width: "100%",
            transform: "translateY(-50%)",
          }}
          src={downloadURL}
          alt={media.name}
        />
      ) : (
        <video src={downloadURL} />
      )}
    </>
  );
};

export default MediaPreview;
