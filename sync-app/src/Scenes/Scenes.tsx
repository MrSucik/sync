import React from "react";
import { Box } from "@material-ui/core";
import Card from "../components/Card";
import ScenesList from "./ScenesList";
import { useFirestore } from "react-redux-firebase";
import { useSnackbar } from "notistack";
import AddSceneButton from "./AddSceneButton";

const Scenes = () => {
  const firestore = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const handleAddScene = async () => {
    await firestore.add(
      { collection: "scenes" },
      { name: "New scene", mediaList: [] }
    );
    enqueueSnackbar("Scene added successfully", { variant: "success" });
  };
  return (
    <Box flex={2}>
      <Card>
        <AddSceneButton onClick={handleAddScene} />
        <ScenesList />
      </Card>
    </Box>
  );
};
export default Scenes;
