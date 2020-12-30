import React from "react";
import { Box } from "@material-ui/core";

const url =
  "https://cdn.dribbble.com/users/1849053/screenshots/7133321/media/39455ee14562332c4e378ed1c5d5694a.gif";

interface Props {
  opacity?: number;
}

const Loading: React.FC<Props> = ({ opacity = 0.3 }) => {
  return (
    <Box
      style={{
        opacity,
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        src={url}
        alt="loading"
      />
    </Box>
  );
};

export default Loading;
