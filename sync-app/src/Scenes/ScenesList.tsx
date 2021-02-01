import React from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useFirestore } from "react-redux-firebase";
import { setChoosingScene } from "../store/slices/app";
import ScenesMediaList from "./ScenesMediaList";
import { useSnackbar } from "notistack";
import { useScenesWithChildren } from "./useScenesWithChildren";
import DevicesBar from "./DevicesBar";
import SceneHeader from "./SceneHeader";

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
  return (
    <>
      {scenes.map((scene) => (
        <Card
          key={scene.id}
          disabled={
            Boolean(choosingMediaSceneId) && choosingMediaSceneId !== scene.id
          }
          fill
          clickable={Boolean(choosingSceneClientId)}
          outerBoxProps={{ onClick: () => handleClick(scene.id) }}
        >
          <SceneHeader scene={scene} />
          <ScenesMediaList scene={scene} />
          <DevicesBar
            devices={scene.clientsList.map(({ name, icon }) => ({
              icon,
              tooltip: name,
            }))}
          />
        </Card>
      ))}
    </>
  );
};

export default ScenesList;
