import React from "react";
import { CircularProgress, ListItemText } from "@material-ui/core";
import ListItem from "../components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { MediaModel, SceneModel } from "../definitions";
import { useFirestore } from "react-redux-firebase";
import { setChoosingMedia } from "../store/slices/app";
import { useSnackbar } from "notistack";
import Avatar from "../components/Avatar";
import {
  setConfigureMediaModalOpen,
  setUpdateMediaModalState,
} from "../store/slices/media";

interface Props {
  media: MediaModel;
}

const MediaListItem: React.FC<Props> = ({
  media: { color, duration, id, name, thumbnail, configurable, progress },
}) => {
  const scenes = useSelector<RootState, SceneModel[]>(
    (state) => state.firestore.ordered.scenes
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
  ) => dispatch(setConfigureMediaModalOpen(id));
  const handleEditClick = (id: string) =>
    dispatch(setUpdateMediaModalState(id));
  return (
    <ListItem
      progress={progress}
      clickable={
        Boolean(choosingMediaSceneId) && !choosingMediaList.includes(id)
      }
      onClick={choosingMediaSceneId ? () => handleClick(id) : undefined}
      avatar={
        thumbnail ? (
          <Avatar alt={name} source={thumbnail} />
        ) : (
          <CircularProgress size={32} />
        )
      }
      body={<ListItemText primary={name} secondary={`${duration} seconds`} />}
      color={color}
      disabled={choosingMediaList.includes(id)}
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
                icon: "edit",
                onClick: () => handleEditClick(id),
                tooltip: "Edit this media",
              },
              {
                icon: "delete",
                onClick: () => handleDeleteClick(id),
                tooltip: "Delete this media",
              },
            ]
      }
    />
  );
};

export default MediaListItem;
