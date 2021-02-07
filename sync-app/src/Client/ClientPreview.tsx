import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Preview from "../Preview/Preview";
import { setPreviewMediaList } from "../store/slices/preview";

interface Props {
  clientId: string;
}

const ClientPreview: React.FC<Props> = ({ clientId }) => {
  const dispatch = useDispatch();
  const scene = useSelector<RootState, string>(
    (state) => state.firestore.data.clients[clientId].scene
  );
  const mediaList = useSelector<RootState, any[]>(
    (state) => state.firestore.data.scenes[scene].mediaList
  );
  useEffect(() => {
    dispatch(setPreviewMediaList({ type: "client", mediaList }));
  }, [mediaList, dispatch]);
  return <Preview disableControls />;
};

export default ClientPreview;
