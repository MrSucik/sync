import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseReducer, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { RootState } from "../store";
import { setAuthorized } from "../store/slices/auth";
import { setOpenSettingsButtonVisible } from "../store/slices/settings";

export const useAuthorization = () => {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const auth = useSelector<RootState, FirebaseReducer.AuthState>(
    (state) => state.firebase.auth
  );
  const { push } = useHistory();
  useEffect(() => {
    if (auth.isEmpty) {
      push("/auth");
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
        if (isAuthorized) {
          push("/");
        } else {
          enqueueSnackbar("Unauthorized access!", { variant: "error" });
        }
        dispatch(setOpenSettingsButtonVisible(isAuthorized));
        dispatch(setAuthorized(isAuthorized));
      })
      .finally(() => setLoading(false));
  }, [firestore, auth.email, auth.isEmpty, push, enqueueSnackbar, dispatch]);
  return { loading };
};
