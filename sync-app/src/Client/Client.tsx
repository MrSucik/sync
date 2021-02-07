import React from "react";
import { useParams } from "react-router-dom";
import { useFirestoreSubscribe } from "../hooks/useFirestoreSubscribe";
import { useStatusReporting } from "../hooks/useStatusReporting";
import ClientPreview from "./ClientPreview";

interface Params {
  clientId: string;
}

const Client = () => {
  const { clientId } = useParams<Params>();
  useStatusReporting(clientId);
  const loaded = useFirestoreSubscribe();
  return loaded ? <ClientPreview clientId={clientId} /> : null;
};

export default Client;
