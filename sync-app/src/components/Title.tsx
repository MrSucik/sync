import { Typography } from "@material-ui/core";
import React from "react";

const Title = () => {
  return (
    <Typography
      style={{ fontFamily: "'B612 Mono', monospace", color: "white" }}
      variant="h4"
      component="h1"
    >
      sync
    </Typography>
  );
};

export default Title;
