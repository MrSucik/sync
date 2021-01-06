import React from "react";
import { MediaModel } from "../definitions";
import { useDownloadURL } from "./useDownloadURL";
import { useTimeout } from "./useTimeout";

interface Props {
  media: MediaModel;
  onMediaEnd: () => void;
}

const MediaPreview: React.FC<Props> = ({ media, onMediaEnd }) => {
  useTimeout(media.duration, onMediaEnd);
  const downloadURL = useDownloadURL(media.source);
  return media.type === "image" ? (
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
  );
};

export default MediaPreview;
