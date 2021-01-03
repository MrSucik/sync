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

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [
      // just ignore every redux-firebase and react-redux-firebase action type
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
}>;

export default store;
