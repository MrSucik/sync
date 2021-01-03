import React from "react";
import { MediaModel } from "../definitions";

interface Props {
  media: MediaModel;
}

const Video: React.FC<Props> = ({ media }) => {
  return <video src={media.source} autoPlay muted loop />;
};

export default Video;
