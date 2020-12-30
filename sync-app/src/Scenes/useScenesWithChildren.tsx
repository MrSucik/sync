import { useSelector } from "react-redux";
import { ClientModel, Scene } from "../definitions";
import { RootState } from "../store";

export const useScenesWithChildren = () => {
  const scenes = useSelector<RootState, Scene[]>((state) =>
    state.firestore.ordered.scenes.map((scene) => {
      const mediaList = (state.app.optimisticReorderUpdate?.sceneId === scene.id
        ? state.app.optimisticReorderUpdate?.mediaList
        : scene.mediaList
      ).map((mediaId: string) => ({
        id: mediaId,
        ...state.firestore.data.media[mediaId],
      }));
      const clientsList = state.firestore.ordered.clients.filter(
        (client: ClientModel) => client.scene === scene.id
      );
      return { ...scene, mediaList, clientsList };
    })
  );
  return scenes;
};
