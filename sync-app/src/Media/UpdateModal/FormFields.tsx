import { Box, TextField, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  MediaFormData,
  updateDuration,
  updateName,
} from "../../store/slices/media";

const useStyles = makeStyles(() =>
  createStyles({
    nameField: {
      flex: 3,
      margin: "0 8px",
    },
    durationField: {
      flex: 2,
      margin: "0 8px",
    },
  })
);

const FormFields = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { name, duration, durationEnabled } = useSelector<
    RootState,
    MediaFormData
  >((state) => state.media.form);
  return (
    <Box display="flex" padding={1}>
      <TextField
        value={name}
        onChange={(event) => dispatch(updateName(event.target.value))}
        className={classes.nameField}
        label="Name"
        placeholder="New Media"
      />
      <TextField
        disabled={!durationEnabled}
        value={duration}
        onChange={(event) => dispatch(updateDuration(event.target.value))}
        className={classes.durationField}
        label="Duration (seconds)"
        type="number"
        inputProps={{ min: "1", max: "600" }}
      />
    </Box>
  );
};
export default FormFields;
