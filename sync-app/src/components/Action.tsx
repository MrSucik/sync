import {
  Icon,
  IconButton,
  IconButtonProps,
  IconProps,
} from "@material-ui/core";
import React from "react";
import Tooltip from "./Tooltip";

interface Props {
  icon: string;
  onClick?: () => void;
  tooltip?: string;
  iconButtonProps?: IconButtonProps;
  iconProps?: IconProps;
}

const Action: React.FC<Props> = ({
  icon,
  onClick = () => {},
  tooltip,
  iconButtonProps,
  iconProps,
}) => {
  const button = (
    <IconButton onClick={onClick} {...iconButtonProps}>
      <Icon {...iconProps}>{icon}</Icon>
    </IconButton>
  );
  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
};
export default Action;
