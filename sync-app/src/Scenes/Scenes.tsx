import React from "react";
import { Box } from "@material-ui/core";
import Card from "../components/Card";
import ScenesList from "./ScenesList";
import { useSnackbar } from "notistack";
import AddSceneButton from "./AddSceneButton";
import { createNewScene } from "../utils/fire";

const Scenes = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleAddScene = async () => {
    await createNewScene();
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
