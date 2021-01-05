import React from "react";
import {
  Box,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { getIconSource } from "../utils/icons";
import Tooltip from "../components/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row-reverse",
      padding: theme.spacing(0, 0.5, 0.5, 0.5),
    },
    icon: {
      margin: theme.spacing(0.5),
    },
    avatar: {
      height: 32,
      width: 32,
    },
  })
);

interface Props {
  devices: { tooltip: string; icon: string }[];
}

const DevicesBar: React.FC<Props> = ({ devices }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      {devices.map((device) => (
        <Tooltip key={device.icon} title={device.tooltip}>
          <Box className={classes.icon}>
            <Avatar
              className={classes.avatar}
              src={getIconSource(device.icon)}
            />
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default DevicesBar;
