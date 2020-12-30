import React from "react";
import { Button as MuiButton, ButtonProps } from "@material-ui/core";

const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton variant="outlined" color="inherit" {...props} />;
};

export default Button;
