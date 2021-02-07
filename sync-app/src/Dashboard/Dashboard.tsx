import React from "react";
import Devices from "../Devices/Devices";
import Media from "../Media/Media";
import Scenes from "../Scenes/Scenes";
import Header from "./Header";
import Loading from "../components/Loading";
import Container from "./Container";
import { useFirestoreSubscribe } from "../hooks/useFirestoreSubscribe";
import UsersModal from "../Users/UsersModal";
import ModalPreview from "../Preview/ModalPreview";

const Dashboard = () => {
  const dataLoaded = useFirestoreSubscribe();

  return dataLoaded ? (
    <>
      <UsersModal />
      <ModalPreview />
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
