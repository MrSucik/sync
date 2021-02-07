import { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import client from "../utils/client";

export const useClientAccess = () => {
  const [loading, setLoading] = useState(true); 
  const { clientId } = useParams<{ clientId: string }>();
  const firebase = useFirebase();
  useEffect(() => {
    const updateToken = async () => {
      setLoading(true);
      await firebase.auth().signOut();
      const { data } = await client.clientAccess(clientId);
      await firebase.auth().signInWithCustomToken(data);
      setLoading(false);
    };
    updateToken();
  }, [clientId, firebase]);
  return { loading };
};
