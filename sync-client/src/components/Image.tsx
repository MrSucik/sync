import React from "react";
import { MediaModel } from "../definitions";

interface Props {
  media: MediaModel;
  downloadURL: string;
}

const Image: React.FC<Props> = ({ media, downloadURL }) => {
  return (
    <img
      src={downloadURL}
      alt={media.name}
      style={{ width: "100%", alignSelf: "center" }}
    />
  );
};

export default Image;
