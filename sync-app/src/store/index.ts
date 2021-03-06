import {
  CombinedState,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  actionTypes as rrfActionTypes,
  FirebaseReducer,
  firebaseReducer,
  FirestoreReducer,
} from "react-redux-firebase";
import {
  constants as rfConstants,
  firestoreReducer,
  reduxFirestore,
} from "redux-firestore";
import firebase from "firebase/app";
import appReducer, { AppState } from "./slices/app";
import mediaReducer, { MediaState } from "./slices/media";
import settingsReducer, { SettingsState } from "./slices/settings";
import authReducer, { AuthState } from "./slices/auth";
import previewReducer, { PreviewState } from "./slices/preview";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  app: appReducer,
  media: mediaReducer,
  settings: settingsReducer,
  auth: authReducer,
  preview: previewReducer,
});

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [
      // ignore every redux-firebase and react-redux-firebase action type
      ...Object.keys(rfConstants.actionTypes).map(
        (type) => `${rfConstants.actionsPrefix}/${type}`
      ),
      ...Object.keys(rrfActionTypes).map(
        (type) => `@@reactReduxFirebase/${type}`
      ),
    ],
    ignoredPaths: ["firebase", "firestore"],
  },
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
  enhancers: [reduxFirestore({ default: firebase })],
});

export type RootState = CombinedState<{
  firestore: FirestoreReducer.Reducer;
  firebase: FirebaseReducer.Reducer;
  app: AppState;
  auth: AuthState;
  settings: SettingsState;
  media: MediaState;
  preview: PreviewState;
}>;

export default store;
