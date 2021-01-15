import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseReducer, useFirestore } from "react-redux-firebase";
import { RootState } from "../store";
import { AuthState, setAuthorized } from "../store/slices/auth";
import { setOpenSettingsButtonVisible } from "../store/slices/settings";

export const useAuthorization = () => {
  const firestore = useFirestore();
  const { authorized } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const auth = useSelector<RootState, FirebaseReducer.AuthState>(
    (state) => state.firebase.auth
  );
  useEffect(() => {
    if (auth.isEmpty) {
     dispatch(setAuthorized(false));
      return;
    }
    setLoading(true);
    firestore
      .collection("users")
      .get()
      .then((users) => {
        const isAuthorized = Boolean(
          users.docs.find((x) => x.id === auth.email)?.exists
        );
        if (!isAuthorized) {
          enqueueSnackbar("Unauthorized access!", { variant: "error" });
        }
        dispatch(setOpenSettingsButtonVisible(isAuthorized));
        dispatch(setAuthorized(isAuthorized));
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestore, auth.email]);
  return { loading, authorized };
};
