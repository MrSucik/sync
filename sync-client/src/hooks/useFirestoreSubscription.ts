import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "../store/store";

export const useFirestoreSubscription = () => {
  useFirestoreConnect([
    { collection: "clients" },
    { collection: "media" },
    { collection: "scenes" },
  ]);
  const loaded = useSelector<RootState, boolean>(
    (state) =>
      Array.isArray(state.firestore.ordered.clients) &&
      Array.isArray(state.firestore.ordered.media) &&
      Array.isArray(state.firestore.ordered.scenes)
  );
  return loaded;
};
