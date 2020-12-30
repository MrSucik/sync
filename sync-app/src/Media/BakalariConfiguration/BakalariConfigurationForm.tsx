import React, { useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Slider,
  Button,
  makeStyles,
  CardActions,
} from "@material-ui/core";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ConfigurationModel } from "../../definitions";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";
import DatePicker from "./DatePicker";
import { useAvailableDates } from "./useAvailableDates";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 3, 0, 3),
    margin: "auto",
  },
  actions: {
    display: "flex",
    flexDirection: "row-reverse",
  },
}));

interface State {
  autoSuplDate: boolean;
  suplDate: string;
  suplDuration: number;
  autoPlanDate: boolean;
  planDate: string;
  planDuration: number;
}

interface Props {
  type: "bakalari-suplovani" | "bakalari-plan-akci";
  onClose: () => void;
}

const BakalariConfigurationForm: React.FC<Props> = ({ type, onClose }) => {
  const classes = useStyles();
  const configuration = useSelector<RootState, ConfigurationModel>(
    (state) => state.firestore.ordered.configuration[0]
  );
  const suplDuration = useSelector<RootState, number>(
    (state) => state.firestore.data.media["bakalari-suplovani"].duration
  );
  const planDuration = useSelector<RootState, number>(
    (state) => state.firestore.data.media["bakalari-plan-akci"].duration
  );
  const [data, setData] = useState<State>({
    suplDuration,
    planDuration,
    autoPlanDate: configuration.autoPlanDate,
    autoSuplDate: configuration.autoSuplDate,
    planDate: configuration.planDate.toDate().toDateString(),
    suplDate: configuration.suplDate.toDate().toDateString(),
  });
  const dates = useAvailableDates();
  const firestore = useFirestore();
  const handleSave = async () => {
    await firestore.collection("configuration").add({
      created: firebase.firestore.Timestamp.fromDate(moment().toDate()),
      autoPlanDate: data.autoPlanDate,
      autoSuplDate: data.autoSuplDate,
      planDate: firebase.firestore.Timestamp.fromDate(new Date(data.planDate)),
      suplDate: firebase.firestore.Timestamp.fromDate(new Date(data.suplDate)),
    });
    await firestore
      .collection("media")
      .doc(type)
      .update({
        duration:
          type === "bakalari-plan-akci" ? data.planDuration : data.suplDuration,
      });
    onClose();
  };
  return (
    <>
      <Box className={classes.container}>
        {dates.length < 1 ? (
          <Box position="relative" height={170}>
            <Loading opacity={1} />
          </Box>
        ) : type === "bakalari-suplovani" ? (
          <>
            <FormControlLabel
              checked={data.autoSuplDate}
              onChange={(_event, checked) =>
                setData({
                  ...data,
                  autoSuplDate: checked,
                })
              }
              control={<Checkbox color="primary" />}
              label="Automaticky vybrat aktuální datum"
            />
            {!data.autoSuplDate && (
              <DatePicker
                dates={dates}
                value={data.suplDate}
                onChange={(value) => setData({ ...data, suplDate: value })}
              />
            )}
            <Box mt={1}>
              <TextField
                fullWidth
                type="number"
                value={data.suplDuration}
                onChange={(event) => {
                  setData({
                    ...data,
                    suplDuration: parseInt(event.target.value),
                  });
                }}
                label="Doba trvání"
              />
              <Slider
                value={data.suplDuration}
                onChange={(_event, value) =>
                  typeof value === "number" &&
                  setData({ ...data, suplDuration: value })
                }
              />
            </Box>
          </>
        ) : (
          <>
            <FormControlLabel
              checked={data.autoPlanDate}
              onChange={(_event, checked) =>
                setData({
                  ...data,
                  autoPlanDate: checked,
                })
              }
              control={<Checkbox color="primary" />}
              label="Automaticky vybrat aktuální plán akcí"
            />
            {!data.autoPlanDate && (
              <DatePicker
                dates={dates}
                value={data.planDate}
                onChange={(value) => setData({ ...data, planDate: value })}
              />
            )}
            <Box mt={1}>
              <TextField
                type="number"
                value={data.planDuration}
                onChange={(event) => {
                  setData({
                    ...data,
                    planDuration: parseInt(event.target.value),
                  });
                }}
                label="Doba trvání"
                fullWidth
              />
              <Slider
                value={data.planDuration}
                onChange={(_event, value) =>
                  typeof value === "number" &&
                  setData({ ...data, planDuration: value })
                }
              />
            </Box>
          </>
        )}
      </Box>
      <CardActions className={classes.actions}>
        <Button color="primary" variant="text" onClick={handleSave}>
          Save
        </Button>
      </CardActions>
    </>
  );
};

export default BakalariConfigurationForm;
