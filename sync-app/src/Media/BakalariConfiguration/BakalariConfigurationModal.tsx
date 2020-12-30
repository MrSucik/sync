import { makeStyles, Modal } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import { RootState } from "../../store";
import { setConfigureMediaModalOpen } from "../../store/slices/app";
import BakalariConfigurationForm from "./BakalariConfigurationForm";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 350,
    margin: "auto",
    marginTop: theme.spacing(2),
  },
}));

const BakalariConfigurationModal = () => {
  const classes = useStyles();
  const type = useSelector<
    RootState,
    "bakalari-suplovani" | "bakalari-plan-akci" | null
  >((state) => state.app.configureMediaModalOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setConfigureMediaModalOpen(null));
  };
  return (
    <Modal open={Boolean(type)} onClose={handleClose}>
      <Card outerBoxProps={{ className: classes.container }}>
        <CardHeader
          title={
            type === "bakalari-plan-akci"
              ? "Bakaláři - Plán akcí"
              : "Bakaláři - Suplování"
          }
          actions={[
            {
              tooltip: "Close this window",
              icon: "close",
              onClick: handleClose,
            },
          ]}
        />
        <BakalariConfigurationForm onClose={handleClose} type={type as any} />
      </Card>
    </Modal>
  );
};

export default BakalariConfigurationModal;
