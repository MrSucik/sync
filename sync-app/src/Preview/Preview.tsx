import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Overlay from "./Overlay";
import { MediaModel } from "../definitions";
import { RootState } from "../store";
import ProgressBar from "./ProgressBar";
import { PreviewState } from "../store/slices/preview";
import PlayNextPrevious from "./PlayNext";
import CloseModalPreview from "./CloseModalPreview";
import MediaPreviewPlayer from "./MediaPreviewPlayer";

interface Props {
  disableControls?: boolean;
}

const Preview: React.FC<Props> = ({ disableControls }) => {
  const { activeMediaIndex, previewMediaList } = useSelector<
    RootState,
    PreviewState
  >((state) => state.preview);
  const mediaList = useSelector<RootState, MediaModel[]>((state) =>
    previewMediaList.map((id) => state.firestore.data.media[id])
  );
  const media = mediaList[activeMediaIndex];
  return !media ? null : (
    <Box
      style={{
        height: window.innerHeight,
        width: window.innerHeight * 0.5625,
        padding: disableControls ? 0 : 32,
        margin: "auto",
        boxSizing: "border-box",
        color: "#e6e6e6",
      }}
    >
      <Box height={1} position="relative" bgcolor="rgba(20, 20, 20, 0.95)">
        <ProgressBar />
        {!disableControls && <CloseModalPreview />}
        {!disableControls && previewMediaList.length !== 1 && (
          <>
            <PlayNextPrevious type="previous" />
            <PlayNextPrevious type="next" />
          </>
        )}
        <MediaPreviewPlayer />
        <Overlay position="bottom" />
      </Box>
    </Box>
  );
};

export default Preview;
