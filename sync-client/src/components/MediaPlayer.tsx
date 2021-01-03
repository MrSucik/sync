import React, { useEffect, useState } from "react";
import Media from "./Media";
import { MediaModel } from "../definitions";

interface Props {
  media: MediaModel[];
}

const MediaPlayer: React.FC<Props> = ({ media }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  useEffect(() => {
    setActiveMediaIndex(0);
  }, [media]);
  const handleMediaEnd = () => {
    const nextIndex = activeMediaIndex + 1;
    setActiveMediaIndex(media.length === nextIndex ? 0 : nextIndex);
  };
  return !media[activeMediaIndex] ? null : (
    <Media media={media[activeMediaIndex]} onMediaEnd={handleMediaEnd} />
  );
};

export default MediaPlayer;
