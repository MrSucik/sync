import { Box, Icon, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  container: {
    height: 64,
    border: "2px white dashed",
    margin: "00 16px 16px 16px",
    borderRadius: 4,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 200ms ease-in-out",
    "&:hover": {
      transition: "all 200ms ease-in-out",
      backgroundColor: "rgba(222, 222, 222, 0.3)",
    },
  },
  icon: {
    color: "white",
  },
}));

interface Props {
  onClick: () => void;
}

const AddSceneButton: React.FC<Props> = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Box onClick={onClick} className={classes.container}>
      <Icon className={classes.icon}>add</Icon>
    </Box>
  );
};
export default AddSceneButton;
