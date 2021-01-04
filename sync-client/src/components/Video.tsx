import React from "react";
import { MediaModel } from "../definitions";

interface Props {
  media: MediaModel;
  downloadURL: string;
}

const Video: React.FC<Props> = ({ media, downloadURL }) => {
  return <video src={downloadURL} title={media.name} autoPlay muted loop />;
};

export default Video;
