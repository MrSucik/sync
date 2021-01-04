import { useSelector } from "react-redux";
import MediaPlayer from "./MediaPlayer";
import { MediaModel } from "../definitions";
import { RootState } from "../store/store";
import { useClientId } from "../hooks/useClientId";

interface MappedScene {
  id: string;
  name: string;
  media: MediaModel[];
}

const Scene = () => {
  const clientId = useClientId();
  const scene = useSelector<RootState, MappedScene>((state) => {
    const sceneId = state.firestore.data.clients[clientId].scene;
    const { name, mediaList } = state.firestore.data.scenes[sceneId];
    const media: MediaModel[] = [];
    mediaList.forEach((id: string) => {
      if (state.firestore.data.media[id]?.ready) {
        media.push(state.firestore.data.media[id]);
      }
    });
    return { id: sceneId, name, media };
  });
  return <MediaPlayer media={scene.media} />;
};

export default Scene;
