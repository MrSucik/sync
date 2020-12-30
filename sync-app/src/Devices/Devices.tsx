import React from "react";
import CardHeader from "../components/CardHeader";
import Card from "../components/Card";
import DeviceList from "./DeviceList";

const Device = () => {
  return (
    <Card>
      <CardHeader title="Devices" />
      <DeviceList />
    </Card>
  );
};

export default Device;
