import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFirestoreSubscribe } from "../hooks/useFirestoreSubscribe";
import { useStatusReporting } from "../hooks/useStatusReporting";
import { RootState } from "../store";
import Preview from "./Preview";

interface Params {
  clientId: string;
}
const ClientPreview = () => {
  const { clientId } = useParams<Params>();
  useStatusReporting(clientId);
  const loaded = useFirestoreSubscribe();
  const mediaList = useSelector<RootState, any>((state) => {
    try {
      const scene = state.firestore.data.clients[clientId].scene;
      return state.firestore.data.scenes[scene].mediaList;
    } catch {
      return [];
    }
  });
  return loaded ? <Preview mediaIds={mediaList} /> : null;
};

export default ClientPreview;
