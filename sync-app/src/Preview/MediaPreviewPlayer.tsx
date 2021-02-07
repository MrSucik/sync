import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MediaModel } from "../definitions";
import { RootState } from "../store";
import MediaPreview from "./MediaPreview";
import { nextMedia, PreviewState } from "../store/slices/preview";

const MediaPreviewPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { activeMediaIndex, previewMediaList } = useSelector<
    RootState,
    PreviewState
  >((state) => state.preview);
  const mediaList = useSelector<RootState, MediaModel[]>((state) =>
    previewMediaList.map((id) => state.firestore.data.media[id])
  );
  const handleMediaEnded = () => dispatch(nextMedia());
  return (
    <>
      {mediaList.map((media, index) => (
        <MediaPreview
          key={previewMediaList[index]}
          media={media}
          visible={index === activeMediaIndex}
          onMediaEnd={index === activeMediaIndex ? handleMediaEnded : () => {}}
        />
      ))}
    </>
  );
};

export default MediaPreviewPlayer;
