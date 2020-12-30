import React from "react";
import { Box } from "@material-ui/core";
import CardHeader from "../components/CardHeader";
import Card from "../components/Card";
import ScenesList from "./ScenesList";
import { useFirestore } from "react-redux-firebase";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setChoosingScene } from "../store/slices/app";

const Scenes = () => {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isChoosing = useSelector<RootState, boolean>((state) =>
    Boolean(state.app.choosingScene)
  );
  const handleAddScene = async () => {
    await firestore.add(
      { collection: "scenes" },
      { name: "New scene", mediaList: [] }
    );
    enqueueSnackbar("Scene added successfully", { variant: "success" });
  };
  const handleCancelChoosing = () => {
    dispatch(setChoosingScene(null));
  };
  return (
    <Box flex={2}>
      <Card>
        <CardHeader
          title="Scenes"
          actions={[
            {
              icon: "add",
              tooltip: "Create new scene",
              onClick: handleAddScene,
            },
          ]}
          onCancelChoosing={isChoosing ? handleCancelChoosing : undefined}
        />
        <ScenesList />
      </Card>
    </Box>
  );
};
export default Scenes;
