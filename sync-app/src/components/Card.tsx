import React, { forwardRef } from "react";
import { Box, BoxProps, Paper, PaperProps } from "@material-ui/core";

interface Props {
  disabled?: boolean;
  outerBoxProps?: BoxProps;
  innerPaperProps?: PaperProps;
}

const Card: React.FC<Props> = forwardRef<any, Props>(
  ({ children, innerPaperProps, outerBoxProps, disabled }, ref) => {
    return disabled ? (
      <Box
        position="relative"
        flex={1}
        padding={2}
        // @ts-ignore
        ref={ref}
        {...outerBoxProps}
      >
        <Box
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(10, 10, 10, 0.2)",
            opacity: 0.5,
            zIndex: 999,
          }}
        />
        <Paper elevation={3} {...innerPaperProps}>
          {children}
        </Paper>
      </Box>
    ) : (
      <Box flex={1} padding={2} {...outerBoxProps}>
        <Paper elevation={3} {...innerPaperProps}>
          {children}
        </Paper>
      </Box>
    );
  }
);

export default Card;
