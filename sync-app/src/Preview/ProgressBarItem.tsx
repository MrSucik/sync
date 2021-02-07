import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { MediaModel } from "../definitions";
import { RootState } from "../store";
import Progress from "./Progress";

interface Props {
  media: MediaModel;
  index: number;
}

const ProgressBarItem: React.FC<Props> = ({ index, media }) => {
  const activeMediaIndex = useSelector<RootState, number>(
    (state) => state.preview.activeMediaIndex
  );
  const state =
    index < activeMediaIndex
      ? "full"
      : index === activeMediaIndex
      ? "running"
      : "empty";
  return (
    <Box>
      <Progress duration={media.duration} state={state} />
      <Typography
        style={{
          fontFamily: "Segoe UI",
          textAlign: "center",
          fontWeight: 500,
          padding: 4,
          fontSize: 13,
          color: state === "running" ? "white" : "rgba(220, 220, 220, 0.5)",
        }}
      >
        {media.name}
      </Typography>
    </Box>
  );
};

export default ProgressBarItem;
