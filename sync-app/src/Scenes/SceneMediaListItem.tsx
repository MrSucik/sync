import React from "react";
import { CircularProgress, ListItemText } from "@material-ui/core";
import ListItem from "../components/ListItem";
import Avatar from "../components/Avatar";
import { MediaModel } from "../definitions";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  media: MediaModel;
  index: number;
  onRemove: (id: string) => void;
}

const SceneMediaListItem: React.FC<Props> = ({
  media: { id, color, duration, name, thumbnail, progress },
  index,
  onRemove,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem
            color={color}
            progress={progress}
            avatar={
              thumbnail ? (
                <Avatar alt={name} source={thumbnail} />
              ) : (
                <CircularProgress size={32} />
              )
            }
            body={
              <ListItemText primary={name} secondary={`${duration} seconds`} />
            }
            actions={[
              {
                icon: "close",
                tooltip: "Remove from this scene",
                onClick: () => onRemove(id),
              },
            ]}
          />
        </div>
      )}
    </Draggable>
  );
};

export default SceneMediaListItem;
