import React, { useState } from "react";
import {
  Box,
  IconButtonProps,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import ChooseChip from "./ChooseChip";
import clsx from "clsx";
import Action from "./Action";

const useStyles = makeStyles((theme) => ({
  container: {
    color: "white",
    height: 40,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09);",
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
  white: {
    color: "white",
    borderBottomColor: "white",
  },
  sideMargin: {
    margin: "0 7px",
  },
}));

interface Props {
  title?: string;
  actions?: {
    tooltip: string;
    icon: string;
    onClick: () => void;
  }[];
  onChangeTitle?: (newTitle: string) => void;
  onCancelChoosing?: () => void;
  sideMargin?: boolean;
}

const iconButtonProps: IconButtonProps = {
  color: "inherit",
  size: "small",
};

const CardHeader: React.FC<Props> = ({
  title = "",
  onChangeTitle,
  children,
  actions,
  onCancelChoosing,
  sideMargin,
}) => {
  const classes = useStyles();
  const [titleInputVisible, setTitleInputVisible] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState(title);
  const handleEditClick = () => {
    setTitleInputVisible(true);
  };
  const handleConfirmClick = () => {
    onChangeTitle && onChangeTitle(titleInputValue);
    setTitleInputVisible(false);
  };
  return (
    <Box className={clsx(classes.container, sideMargin && classes.sideMargin)}>
      <Box display="flex" alignItems="center">
        {titleInputVisible ? (
          <>
            <TextField
              inputProps={{ className: classes.white }}
              value={titleInputValue}
              onChange={(event) => setTitleInputValue(event.target.value)}
            />
            <Action
              icon="done"
              iconButtonProps={iconButtonProps}
              onClick={handleConfirmClick}
            />
          </>
        ) : (
          <>
            <Typography variant="button">{title}</Typography>
            {onChangeTitle && (
              <Action
                onClick={handleEditClick}
                tooltip="Rename"
                icon="edit"
                iconButtonProps={iconButtonProps}
              />
            )}
            <ChooseChip onCancelChoosing={onCancelChoosing} />
          </>
        )}
      </Box>
      {children}
      <Box display="flex">
        {actions?.length
          ? actions.map(({ icon, tooltip, onClick }, index) => (
              <Action
                key={index}
                tooltip={tooltip}
                onClick={onClick}
                icon={icon}
                iconButtonProps={iconButtonProps}
              />
            ))
          : null}
      </Box>
    </Box>
  );
};

export default CardHeader;
