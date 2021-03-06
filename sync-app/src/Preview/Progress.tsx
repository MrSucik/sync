import React, { useEffect, useRef, useState } from "react";
import { createStyles, LinearProgress, makeStyles } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      zIndex: 99,
      height: 2,
      background: "rgba(100, 100, 100, 0.7)",
      "& div": {
        background: "white",
      },
    },
  })
);

interface Props {
  duration: number;
  state: "empty" | "full" | "running";
}

const Progress: React.FC<Props> = ({ duration, state }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const interval = useRef<NodeJS.Timeout>();
  // 101 for smoothness
  const completed = progress >= 101;
  useEffect(() => {
    if (state === "full") {
      setProgress(100);
      clearInterval(interval.current as any);
    } else if (state === "empty") {
      setProgress(0);
      clearInterval(interval.current as any);
    }
  }, [state]);
  useEffect(() => {
    if (state === "running") {
      setProgress(0);
      const startTime = moment();
      clearInterval(interval?.current as any);
      interval.current = setInterval(
        () =>
          setProgress(
            (moment().diff(startTime) /
              (parseFloat(duration.toString()) * 1000)) *
              100
          ),
        100
      );
      return () => clearInterval(interval?.current as any);
    }
  }, [duration, state, completed]);
  return (
    <LinearProgress
      className={classes.progress}
      variant="determinate"
      value={state === "full" ? 100 : state === "empty" ? 0 : progress}
    />
  );
};

export default Progress;
