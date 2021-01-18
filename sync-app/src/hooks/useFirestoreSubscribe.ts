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
    ({ firestore: { ordered } }) =>
      Array.isArray(ordered.clients) &&
      Array.isArray(ordered.media) &&
      Array.isArray(ordered.scenes) &&
      Array.isArray(ordered.configuration) &&
      Array.isArray(ordered.users)
  );
  return dataLoaded;
};
