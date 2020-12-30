import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import CardHeader from "../components/CardHeader";
import MediaList from "./MediaList";
import UploadMediaModal from "./UploadMediaModal";
import { setAddMediaModalOpen, setChoosingMedia } from "../store/slices/app";
import BakalariConfigurationModal from "./BakalariConfiguration/BakalariConfigurationModal";
import { RootState } from "../store";

const Media = () => {
  const dispatch = useDispatch();
  const isChoosing = useSelector<RootState, boolean>((state) =>
    Boolean(state.app.choosingMedia)
  );
  const handleClick = () => dispatch(setAddMediaModalOpen(true));
  const handleCancelChoosing = () => {
    dispatch(setChoosingMedia(null));
  };
  return (
    <>
      <BakalariConfigurationModal />
      <Card>
        <CardHeader
          title="Media"
          actions={[
            { icon: "add", tooltip: "Upload new media", onClick: handleClick },
          ]}
          onCancelChoosing={isChoosing ? handleCancelChoosing : undefined}
        />
        <UploadMediaModal />
        <MediaList />
      </Card>
    </>
  );
};

export default Media;
