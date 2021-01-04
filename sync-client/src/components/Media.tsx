import React from "react";
import Image from "./Image";
import { MediaModel } from "../definitions";
import Video from "./Video";
import { useTimeout } from "../hooks/useTimeout";
import { useDownloadURL } from "../hooks/useDownloadURL";

interface Props {
  media: MediaModel;
  onMediaEnd: () => void;
}

const Media: React.FC<Props> = ({ media, onMediaEnd }) => {
  useTimeout(media.duration, onMediaEnd);
  const downloadURL = useDownloadURL(media.source);
  const Component =
    media.type === "image" ? Image : media.type === "video" ? Video : Image;
  return <Component media={media} downloadURL={downloadURL} />;
};

export default Media;
