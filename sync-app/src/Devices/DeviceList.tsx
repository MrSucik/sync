import React from "react";
import { List, Avatar } from "@material-ui/core";
import ListItem from "../components/ListItem";
import { getIconSource } from "../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { ClientModel } from "../definitions";
import { RootState } from "../store";
import DeviceListItemText from "./DeviceListItemText";
import { setChoosingScene } from "../store/slices/app";

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
  const handleChangeScene = (id: string) => {
    dispatch(setChoosingScene(id));
  };
  return (
    <List>
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
              icon: "settings",
              tooltip: "Change scene",
              onClick: () => handleChangeScene(id),
            },
          ]}
        />
      ))}
    </List>
  );
};

export default DeviceList;
