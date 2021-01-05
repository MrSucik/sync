import React from "react";
import CardHeader from "../components/CardHeader";
import Card from "../components/Card";
import DeviceList from "./DeviceList";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Device = () => {
  const isOtherChoosing = useSelector<RootState, boolean>((state) =>
    Boolean(state.app.choosingMedia)
  );
  return (
    <Card disabled={isOtherChoosing}>
      <CardHeader sideMargin title="Devices" />
      <DeviceList />
    </Card>
  );
};

export default Device;
