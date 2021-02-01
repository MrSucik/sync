import { Box, Icon, IconButton, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tooltip from "../components/Tooltip";
import { MediaModel } from "../definitions";
import { RootState } from "../store";
import MediaPreview from "./MediaPreview";

interface Props {
  mediaIds: string[];
  onClose?: () => void;
}

const Preview: React.FC<Props> = ({ mediaIds, onClose }) => {
  const mediaList = useSelector<RootState, MediaModel[]>((state) =>
    mediaIds.map((id) => ({
      ...state.firestore.data.media[id],
      id,
    }))
  );
  const [activeMedia, setActiveMedia] = useState(0);
  useEffect(() => setActiveMedia(0), [mediaIds, setActiveMedia]);
  const handleMediaEnded = () => {
    const nextIndex = activeMedia + 1;
    setActiveMedia(!mediaList[nextIndex] ? 0 : nextIndex);
  };
  const media = mediaList[activeMedia];
  if (!media) {
    return null;
  }
  return (
    <Modal open={Boolean(mediaList.length)} onClose={onClose}>
      <Box
        width={1}
        height={1}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)"
        }}
        onClick={onClose}
      >
        <Box
          style={{
            margin: "auto",
            position: "relative",
            backgroundColor: "white",
            height: window.screen.availHeight * 0.9,
            width: window.screen.availHeight * 0.9 * 0.5625,
          }}
        >
          {onClose && (
            <Tooltip title="Close this preview">
              <IconButton
                style={{ position: "absolute", right: 8, top: 8, zIndex: 9999 }}
                onClick={onClose}
              >
                <Icon>close</Icon>
              </IconButton>
            </Tooltip>
          )}
          <MediaPreview media={media} onMediaEnd={handleMediaEnded} />
        </Box>
      </Box>
    </Modal>
  );
};
export default Preview;
