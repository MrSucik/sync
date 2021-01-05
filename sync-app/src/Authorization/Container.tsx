import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import Card from "../components/Card";
import CardHeader from "../components/CardHeader";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  innerContainer: {
    width: 800,
    margin: "auto",
  },
  backgroundImage: (props: { backgroundImage: string }) => ({
    width: 800,
    height: 600,
    background: `url("${props.backgroundImage}")`,
    position: "relative",
  }),
}));

interface Props {
  title: string;
  backgroundImage: string;
}

const Container: React.FC<Props> = ({ title, backgroundImage, children }) => {
  const classes = useStyles({ backgroundImage });
  return (
    <Box className={classes.container}>
      <Card outerBoxProps={{ className: classes.innerContainer }}>
        <CardHeader title={title} />
        <Box className={classes.backgroundImage}>{children}</Box>
      </Card>
    </Box>
  );
};

export default Container;
