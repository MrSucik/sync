import React, { useEffect, useRef } from "react";
import Image from "./Image";
import { MediaModel } from "../definitions";
import Video from "./Video";

interface Props {
  media: MediaModel;
  onMediaEnd: () => void;
}

const Media: React.FC<Props> = ({ media, onMediaEnd }) => {
  const timeout = useRef<any>(0);
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      onMediaEnd();
    }, media.duration * 1000);
  }, [onMediaEnd, media]);
  const Component =
    media.type === "image" ? Image : media.type === "video" ? Video : Image;
  return <Component media={media} />;
};

export default Media;
