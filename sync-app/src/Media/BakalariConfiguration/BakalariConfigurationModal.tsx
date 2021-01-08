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
    maxWidth: 300,
    margin: "auto",
    marginTop: theme.spacing(2),
  },
}));

const BakalariConfigurationModal = () => {
  const classes = useStyles();
  const modalState = useSelector<
    RootState,
    "bakalari-suplovani" | "bakalari-plan-akci" | "closed"
  >((state) => state.app.configureMediaModalState);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setConfigureMediaModalOpen("closed"));
  return (
    <Modal open={modalState !== "closed"} onClose={handleClose}>
      <Card outerBoxProps={{ className: classes.container }}>
        <CardHeader
          title={
            modalState === "bakalari-plan-akci"
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
        <BakalariConfigurationForm
          onClose={handleClose}
          type={modalState as any}
        />
      </Card>
    </Modal>
  );
};

export default BakalariConfigurationModal;
