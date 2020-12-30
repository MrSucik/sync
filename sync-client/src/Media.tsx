import React, { useEffect, useState } from "react";
import Image from "./Image";
import { MediaModel, SceneModel } from "./models";
import Video from "./Video";

interface Props {
  scene: SceneModel;
}

const Media: React.FC<Props> = ({ scene }) => {
  const [activeMedia, setActiveMedia] = useState<MediaModel | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(-1);
  useEffect(() => {
    if (!scene?.mediaList) {
      return;
    }
    const nextMedia = (duration: number) => {
      setTimeout(() => {
        let nextIndex = activeMediaIndex + 1;
        nextIndex = scene.mediaList.length === nextIndex ? 0 : nextIndex;
        scene.mediaList[nextIndex].get().then((x) => {
          const media = x.data() as MediaModel;
          setActiveMedia(media);
          setActiveMediaIndex(nextIndex);
          nextMedia(media.duration);
        });
      }, duration * 1000);
    };
    nextMedia(0);
  }, [scene]);
  const Component = activeMedia?.type === "image" ? Image : Video;
  return activeMedia ? <Component media={activeMedia} /> : null;
};

export default Media;
