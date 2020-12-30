import React from "react";
import { Avatar, List, ListItemText } from "@material-ui/core";
import ListItem from "../components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { MediaModel, SceneModel } from "../definitions";
import { useFirestore } from "react-redux-firebase";
import {
  setChoosingMedia,
  setConfigureMediaModalOpen,
} from "../store/slices/app";
import { useSnackbar } from "notistack";

const MediaList = () => {
  const scenes = useSelector<RootState, SceneModel[]>(
    (state) => state.firestore.ordered.scenes
  );
  const media = useSelector<RootState, MediaModel[]>(
    (state) => state.firestore.ordered.media
  );
  const choosingScene = useSelector<RootState, string | null>(
    (state) => state.app.choosingScene
  );
  const choosingMediaSceneId = useSelector<RootState, string | null>(
    (state) => state.app.choosingMedia
  );
  const choosingMediaList = useSelector<RootState, string[]>((state) =>
    choosingMediaSceneId
      ? state.firestore.data.scenes[choosingMediaSceneId]?.mediaList || []
      : []
  );
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteClick = async (id: string) => {
    if (scenes.find((x) => x.mediaList.includes(id))) {
      enqueueSnackbar(
        "Cannot delete this media while some scenes are using it.",
        { variant: "error" }
      );
    } else {
      await firestore.delete({ collection: "media", doc: id });
      enqueueSnackbar("Media deleted sucessfully", { variant: "success" });
    }
  };
  const handleClick = (id: string) => {
    if (choosingMediaSceneId) {
      firestore.update(
        { collection: "scenes", doc: choosingMediaSceneId },
        { mediaList: [...choosingMediaList, id] }
      );
      dispatch(setChoosingMedia(null));
    }
  };
  const handleConfigureClick = (
    id: "bakalari-suplovani" | "bakalari-plan-akci"
  ) => {
    dispatch(setConfigureMediaModalOpen(id));
  };
  return (
    <List>
      {media.map(({ id, name, duration, source, color, configurable }) => (
        <ListItem
          key={id}
          onClick={choosingMediaSceneId ? () => handleClick(id) : undefined}
          avatar={<Avatar alt={name} src={source} />}
          body={
            <ListItemText primary={name} secondary={`${duration} seconds`} />
          }
          color={color}
          disabled={choosingMediaList.includes(id) || Boolean(choosingScene)}
          actions={
            configurable
              ? [
                  {
                    icon: "settings",
                    tooltip: "Configure this media",
                    onClick: () => handleConfigureClick(id as any),
                  },
                ]
              : [
                  {
                    icon: "delete",
                    onClick: () => handleDeleteClick(id),
                    tooltip: "Delete this media",
                  },
                ]
          }
        />
      ))}
    </List>
  );
};

export default MediaList;