import React from "react";
import {
  ListItemText,
  Typography,
  Chip,
  Box,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    online: {
      marginRight: 8,
      backgroundColor: theme.palette.success.light,
      color: theme.palette.common.white,
    },
    offline: {
      marginRight: 8,
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
  })
);

interface Props {
  name: string;
  scene: string;
  online: boolean;
}

const DeviceListItemText: React.FC<Props> = ({ name, online, scene }) => {
  const classes = useStyles();
  return (
    <ListItemText
      primary={
        <Box display="flex" alignItems="center">
          <Chip
            className={online ? classes.online : classes.offline}
            color="default"
            label={online ? "Online" : "Offline"}
            size="small"
          />
          <Typography>{name}</Typography>
        </Box>
      }
      secondary={
        <>
          {"Currently running: "}
          <Typography
            component="span"
            color="primary"
            style={{ fontWeight: "bold" }}
          >
            {scene}
          </Typography>
        </>
      }
    />
  );
};

export default DeviceListItemText;
