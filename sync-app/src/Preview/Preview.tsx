import { Box, Icon, IconButton, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "../components/Tooltip";
import { MediaModel } from "../definitions";
import { RootState } from "../store";
import { setPreviewMediaList } from "../store/slices/app";
import MediaPreview from "./MediaPreview";

const Preview = () => {
  const mediaList = useSelector<RootState, MediaModel[]>((state) =>
    state.app.previewMediaList.map((id) => state.firestore.data.media[id])
  );
  const [activeMedia, setActiveMedia] = useState(0);
  const handleMediaEnded = () => {
    const nextIndex = activeMedia + 1;
    setActiveMedia(mediaList.length === nextIndex ? 0 : nextIndex);
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setPreviewMediaList([]));
  };
  if (!mediaList[activeMedia]) {
    return null;
  }
  const media = mediaList[activeMedia];
  return (
    <Modal open={Boolean(mediaList.length)} onClose={handleClose}>
      <Box
        width={1}
        height={1}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          paddingTop: window.screen.availHeight * 0.05,
        }}
        onClick={handleClose}
      >
        <Box
          style={{
            margin: "auto",
            position: "relative",
            backgroundColor: "white",
            height: window.screen.availHeight * 0.8,
            width: window.screen.availHeight * 0.8 * 0.5625,
          }}
        >
          <Tooltip title="Close this preview">
            <IconButton
              style={{ position: "absolute", right: 8, top: 8, zIndex: 9999 }}
              onClick={handleClose}
            >
              <Icon>close</Icon>
            </IconButton>
          </Tooltip>
          <MediaPreview media={media} onMediaEnd={handleMediaEnded} />
        </Box>
      </Box>
    </Modal>
  );
};
export default Preview;
