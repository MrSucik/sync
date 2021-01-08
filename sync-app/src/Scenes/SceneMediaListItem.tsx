import React from "react";
import { ListItemText } from "@material-ui/core";
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
  media: { id, color, duration, name, source, progress },
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
            avatar={<Avatar alt={name} source={source} />}
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
