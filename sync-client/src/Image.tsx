import React from "react";
import { MediaModel } from "./models";

interface Props {
  media: MediaModel;
}

const Image: React.FC<Props> = ({ media }) => {
  return (
    <img
      src={media.source}
      alt={media.name}
      style={{ width: "100%", alignSelf: "center" }}
    />
  );
};

export default Image;
