import React from "react";
import { useClientAccess } from "../hooks/useClientAccess";
import Client from "./Client";

const ClientAuthroization = () => {
  const { loading } = useClientAccess();
  return loading ? null : <Client />;
};

export default ClientAuthroization;
