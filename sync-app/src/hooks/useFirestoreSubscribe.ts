import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "../store";

export const useFirestoreSubscribe = () => {
  useFirestoreConnect([
    { collection: "clients", orderBy: ["created", "asc"] },
    { collection: "scenes", orderBy: ["created", "desc"] },
    { collection: "media", orderBy: ["created", "asc"] },
    { collection: "configuration", orderBy: ["created", "desc"], limit: 1 },
    { collection: "users" },
  ]);
  const dataLoaded = useSelector<RootState, boolean>(
    (state) =>
      Array.isArray(state.firestore.ordered.clients) &&
      Array.isArray(state.firestore.ordered.media) &&
      Array.isArray(state.firestore.ordered.scenes) &&
      Array.isArray(state.firestore.ordered.configuration) &&
      Array.isArray(state.firestore.ordered.users)
  );
  return dataLoaded;
};
