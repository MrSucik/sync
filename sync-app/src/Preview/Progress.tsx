import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { MediaModel } from "../definitions";

interface Props {
  media: MediaModel;
}

const Progress: React.FC<Props> = ({ media }) => {
  const [progress, setProgress] = useState(0);
  const interval = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const startTime = moment();
    clearInterval(interval?.current as any);
    interval.current = setInterval(
      () =>
        setProgress(
          (moment().diff(startTime) /
            (parseFloat(media.duration + "") * 1000)) *
            100
        ),
      100
    );
    return () => clearInterval(interval?.current as any);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress >= 100, media.duration]);
  return (
    <LinearProgress
      style={{ zIndex: 99 }}
      color="secondary"
      variant="determinate"
      value={progress}
    />
  );
};

export default Progress;
