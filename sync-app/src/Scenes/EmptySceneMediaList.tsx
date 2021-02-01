import { ListItemText } from "@material-ui/core";
import React from "react";
import ListItem from "../components/ListItem";

const EmptySceneMediaList = () => (
  <ListItem
    body={
      <ListItemText
        style={{ textAlign: "center" }}
        primary="This scene does not contain any media yet"
      />
    }
  />
);

export default EmptySceneMediaList;
