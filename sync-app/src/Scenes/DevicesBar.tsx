import React from "react";
import {
  Box,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Paper,
} from "@material-ui/core";
import { getIconSource } from "../utils/icons";
import Tooltip from "../components/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "row-reverse",
      maxWidth: window.screen.width / 2 - theme.spacing(8),
      overflow: "auto",
    },
    icon: {
      margin: theme.spacing(0.5),
    },
  })
);

interface Props {
  devices: { tooltip: string; icon: string }[];
}

const DevicesBar: React.FC<Props> = ({ devices }) => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.container}>
      {devices.map((device) => (
        <Tooltip key={device.icon} title={device.tooltip}>
          <Box className={classes.icon}>
            <Avatar src={getIconSource(device.icon)} />
          </Box>
        </Tooltip>
      ))}
    </Paper>
  );
};

export default DevicesBar;
