import { Box, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Container: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.container}>{children}</Box>;
};

export default Container;
