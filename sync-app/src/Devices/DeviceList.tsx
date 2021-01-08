import React from "react";
import { List, Avatar } from "@material-ui/core";
import ListItem from "../components/ListItem";
import { getIconSource } from "../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { ClientModel } from "../definitions";
import { RootState } from "../store";
import DeviceListItemText from "./DeviceListItemText";
import { setChoosingScene, setDeviceModalState } from "../store/slices/app";

const DeviceList = () => {
  const clients = useSelector<RootState, ClientModel[]>((state) =>
    state.firestore.ordered.clients.map((client) => {
      const sceneName = state.firestore.data.scenes[client.scene]?.name;
      return { ...client, scene: sceneName };
    })
  );
  const choosingSceneClientId = useSelector<RootState, string | null>(
    (state) => state.app.choosingScene
  );
  const choosingMediaSceneId = useSelector<RootState, string | null>(
    (state) => state.app.choosingMedia
  );
  const dispatch = useDispatch();
  const handleChangeScene = (id: string) => dispatch(setChoosingScene(id));
  const handleUpdateScene = (id: string) => dispatch(setDeviceModalState(id));
  return (
    <List disablePadding>
      {clients.map(({ id, name, scene, icon, status }) => (
        <ListItem
          key={id}
          avatar={<Avatar src={getIconSource(icon)} />}
          body={
            <DeviceListItemText
              online={status === "online"}
              name={name}
              scene={scene}
            />
          }
          disabled={
            choosingMediaSceneId || choosingSceneClientId
              ? id !== choosingSceneClientId
              : false
          }
          actions={[
            {
              icon: "queue_play_next",
              tooltip: "Change the current scene",
              onClick: () => handleChangeScene(id),
            },
            {
              icon: "settings",
              tooltip: "Configure this device",
              onClick: () => handleUpdateScene(id),
            },
          ]}
        />
      ))}
    </List>
  );
};

export default DeviceList;
