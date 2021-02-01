import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setPreviewMediaList } from "../store/slices/app";
import Preview from "./Preview";

const ScenePreview = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setPreviewMediaList([]));
  const previewMediaList = useSelector<RootState, string[]>(
    (state) => state.app.previewMediaList
  );
  return <Preview mediaIds={previewMediaList} onClose={handleClose} />;
};

export default ScenePreview;
