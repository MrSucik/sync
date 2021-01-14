import React from "react";
import { List, ListItemText } from "@material-ui/core";
import { Scene } from "../definitions";
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";
import SceneMediaListItem from "./SceneMediaListItem";
import { useFirestore } from "react-redux-firebase";
import { setOptimisticReorderUpdate } from "../store/slices/app";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import ListItem from "../components/ListItem";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface Props {
  scene: Scene;
}

const ScenesMediaList: React.FC<Props> = ({ scene: { mediaList, id } }) => {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reordered = reorder(
      mediaList.map((x) => x.id),
      result.source.index,
      result.destination.index
    );
    dispatch(setOptimisticReorderUpdate({ sceneId: id, mediaList: reordered }));
    await firestore.update(
      { collection: "scenes", doc: id },
      { mediaList: reordered }
    );
    dispatch(setOptimisticReorderUpdate(null));
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleRemoveClick = async (mediaId: string) => {
    await firestore.update(
      { collection: "scenes", doc: id },
      { mediaList: mediaList.map((x) => x.id).filter((x) => x !== mediaId) }
    );
    enqueueSnackbar("Media removed from the scene", { variant: "success" });
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="scene">
        {(provided) => (
          <List
            disablePadding
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {mediaList.length < 1 ? (
              <ListItem
                body={
                  <ListItemText
                    style={{ textAlign: "center" }}
                    primary="This scene does not contain any media yet"
                  />
                }
              />
            ) : (
              mediaList.map((media, index) => (
                <SceneMediaListItem
                  key={media.id}
                  media={media}
                  index={index}
                  onRemove={handleRemoveClick}
                />
              ))
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ScenesMediaList;
