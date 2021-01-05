import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import CardHeader from "../components/CardHeader";
import MediaListItem from "./MediaListItem";
import UploadMediaModal from "./UploadMediaModal";
import { setAddMediaModalOpen, setChoosingMedia } from "../store/slices/app";
import BakalariConfigurationModal from "./BakalariConfiguration/BakalariConfigurationModal";
import { RootState } from "../store";
import { List } from "@material-ui/core";
import { MediaModel } from "../definitions";

const Media = () => {
  const dispatch = useDispatch();
  const isChoosing = useSelector<RootState, boolean>((state) =>
    Boolean(state.app.choosingMedia)
  );
  const isOtherChoosing = useSelector<RootState, boolean>((state) =>
    Boolean(state.app.choosingScene)
  );
  const mediaList = useSelector<RootState, MediaModel[]>(
    (state) => state.firestore.ordered.media
  );
  const handleClick = () => dispatch(setAddMediaModalOpen(true));
  const handleCancelChoosing = () => {
    dispatch(setChoosingMedia(null));
  };
  return (
    <>
      <BakalariConfigurationModal />
      <Card disabled={isOtherChoosing}>
        <CardHeader
          title="Media"
          actions={[
            { icon: "add", tooltip: "Upload new media", onClick: handleClick },
          ]}
          onCancelChoosing={isChoosing ? handleCancelChoosing : undefined}
          sideMargin
        />
        <UploadMediaModal />
        <List disablePadding>
          {mediaList.map((media) => (
            <MediaListItem media={media} />
          ))}
        </List>
      </Card>
    </>
  );
};

export default Media;
