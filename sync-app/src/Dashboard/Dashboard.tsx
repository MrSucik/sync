import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import Devices from "../Devices/Devices";
import Media from "../Media/Media";
import Scenes from "../Scenes/Scenes";
import { RootState } from "../store";
import Header from "./Header";
import Loading from "../components/Loading";
import Container from "./Container";

const Dashboard = () => {
  useFirestoreConnect([
    { collection: "clients" },
    { collection: "scenes" },
    { collection: "media", orderBy: ["created", "asc"] },
    { collection: "configuration", orderBy: ["created", "desc"], limit: 1 },
  ]);
  const dataLoaded = useSelector<RootState, boolean>(
    (state) =>
      Array.isArray(state.firestore.ordered.clients) &&
      Array.isArray(state.firestore.ordered.media) &&
      Array.isArray(state.firestore.ordered.scenes) &&
      Array.isArray(state.firestore.ordered.configuration)
  );
  return dataLoaded ? (
    <>
      <Header />
      <Container>
        <Media />
        <Scenes />
        <Devices />
      </Container>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
