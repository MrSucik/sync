import React from "react";
import CardHeader from "../components/CardHeader";
import Card from "../components/Card";
import DeviceList from "./DeviceList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setDeviceModalState } from "../store/slices/app";
import UpdateDeviceModal from "./UpdateDeviceModal";

const Device = () => {
  const isOtherChoosing = useSelector<RootState, boolean>((state) =>
    Boolean(state.app.choosingMedia)
  );
  const dispatch = useDispatch();
  const handleAddDeviceClick = () => dispatch(setDeviceModalState("create"));
  return (
    <Card disabled={isOtherChoosing}>
      <CardHeader
        sideMargin
        title="Devices"
        actions={[
          {
            icon: "add",
            tooltip: "Add a new device",
            onClick: handleAddDeviceClick,
          },
        ]}
      />
      <UpdateDeviceModal />
      <DeviceList />
    </Card>
  );
};

export default Device;
