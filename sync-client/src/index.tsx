import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import Auth from "./Auth";
import { firebaseApp } from "./utils/fire";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        config={{}}
        dispatch={store.dispatch}
        firebase={firebaseApp}
        createFirestoreInstance={createFirestoreInstance}
      >
        <Auth />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
