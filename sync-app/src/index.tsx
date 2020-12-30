import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./utils/theme";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={{}}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <App />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

