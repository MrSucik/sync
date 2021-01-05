import React from "react";
import CardHeader from "../components/CardHeader";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useFirestore } from "react-redux-firebase";
import { setChoosingMedia, setChoosingScene } from "../store/slices/app";
import ScenesMediaList from "./ScenesMediaList";
import { useSnackbar } from "notistack";
import { useScenesWithChildren } from "./useScenesWithChildren";
import DevicesBar from "./DevicesBar";

const ScenesList = () => {
  const scenes = useScenesWithChildren();
  const choosingSceneClientId = useSelector<RootState, string | null>(
    (state) => state.app.choosingScene
  );
  const choosingMediaSceneId = useSelector<RootState, string | null>(
    (state) => state.app.choosingMedia
  );
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const handleClick = async (id: string) => {
    if (choosingSceneClientId) {
      await firestore.update(
        { collection: "clients", doc: choosingSceneClientId },
        { scene: id }
      );
      dispatch(setChoosingScene(null));
      enqueueSnackbar("Scene updated for this device", { variant: "success" });
    }
  };
  const handleDeleteClick = async (id: string) => {
    if (scenes.length === 1) {
      enqueueSnackbar("The last scene cannot be deleted.", {
        variant: "error",
      });
    } else if (scenes.find((x) => x.id === id)?.clientsList?.length) {
      enqueueSnackbar(
        "Scene cannot be deleted while some devices are using it.",
        { variant: "error" }
      );
    } else {
      await firestore.delete({ collection: "scenes", doc: id });
      enqueueSnackbar("Scene deleted successfully", { variant: "success" });
    }
  };
  const handleAddClick = (id: string) => {
    dispatch(setChoosingMedia(id));
  };
  const handleNameChange = async (id: string, name: string) => {
    await firestore.update({ collection: "scenes", doc: id }, { name });
    enqueueSnackbar("Scene name updated", { variant: "success" });
  };
  return (
    <>
      {scenes.map((scene) => (
        <Card
          key={scene.id}
          disabled={
            Boolean(choosingMediaSceneId) && choosingMediaSceneId !== scene.id
          }
          outerBoxProps={{
            onClick: () => handleClick(scene.id),
            style: {
              cursor: choosingSceneClientId ? "pointer" : "auto",
            },
          }}
          innerPaperProps={{
            style: {
              backgroundColor: "rgb(66, 96, 143)",
            },
          }}
        >
          <CardHeader
            title={scene.name}
            actions={[
              {
                icon: "add",
                tooltip: "Add media to this scene",
                onClick: () => handleAddClick(scene.id),
              },
              {
                icon: "delete",
                tooltip: "Delete this scene",
                onClick: () => handleDeleteClick(scene.id),
              },
            ]}
            onChangeTitle={(name: string) => handleNameChange(scene.id, name)}
          />
          <ScenesMediaList scene={scene} />
          <DevicesBar
            devices={scene.clientsList.map((x) => ({
              icon: x.icon,
              tooltip: x.name,
            }))}
          />
        </Card>
      ))}
    </>
  );
};

export default ScenesList;
