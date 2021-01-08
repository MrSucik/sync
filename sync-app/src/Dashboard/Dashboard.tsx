import React from "react";
import Devices from "../Devices/Devices";
import Media from "../Media/Media";
import Scenes from "../Scenes/Scenes";
import Header from "./Header";
import Loading from "../components/Loading";
import Container from "./Container";
import Preview from "../Preview/Preview";
import { useFirestoreSubscribe } from "../hooks/useFirestoreSubscribe";
import UsersModal from "../Users/UsersModal";

const Dashboard = () => {
  const dataLoaded = useFirestoreSubscribe();
  return dataLoaded ? (
    <>
      <UsersModal />
      <Preview />
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
