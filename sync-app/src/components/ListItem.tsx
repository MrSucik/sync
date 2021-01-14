import React, { forwardRef } from "react";
import {
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  createStyles,
  makeStyles,
  Theme,
  LinearProgress,
} from "@material-ui/core";
import clsx from "clsx";
import Glowing from "./Glowing";
import Action from "./Action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      backgroundColor: "rgba(63, 81, 181, 0.2) !important",
    },
    disabled: {
      backgroundColor: "rgba(10, 10, 10, 0.5) !important",
    },
    listItem: (props: {
      color: string | undefined;
      actions: number;
      clickable: boolean;
    }) => ({
      position: "relative",
      borderLeft: props.color ? `4px solid ${props.color}` : "",
      borderRadius: 4,
      paddingRight: theme.spacing(2) + 30 * props.actions,
    }),
    container: (props: {
      color: string | undefined;
      actions: number;
      clickable: boolean;
    }) => ({
      boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`,
      margin: theme.spacing(1),
      borderRadius: 4,
      cursor: props.clickable ? "pointer" : undefined,
      background: theme.palette.common.white,
    }),
  })
);

interface Props {
  body: JSX.Element;
  progress?: number;
  avatar?: JSX.Element;
  actions?: {
    icon: string;
    tooltip: string;
    onClick: () => void;
  }[];
  disabled?: boolean;
  selected?: boolean;
  color?: string;
  onClick?: () => void;
  clickable?: boolean;
}

const ListItem = forwardRef<any, Props>(
  (
    {
      avatar,
      body,
      disabled,
      selected,
      color,
      actions = [],
      onClick,
      clickable,
      progress,
    },
    ref
  ) => {
    const classes = useStyles({
      color,
      actions: actions.length,
      clickable: !disabled && Boolean(onClick),
    });
    return (
      <MuiListItem
        onClick={() => !disabled && onClick && onClick()}
        innerRef={ref}
        className={clsx(
          classes.listItem,
          selected && classes.selected,
          disabled && classes.disabled
        )}
        disabled={disabled}
        selected={selected}
        ContainerProps={{ className: classes.container }}
      >
        {clickable && <Glowing />}
        {avatar && <ListItemAvatar>{avatar}</ListItemAvatar>}
        {body}
        {progress && progress < 100 && (
          <LinearProgress
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              opacity: 0.2,
            }}
            variant="determinate"
            value={progress}
            color="primary"
          />
        )}
        <ListItemSecondaryAction>
          {actions.map(({ icon, tooltip, onClick: actionOnClick }, index) => (
            <Action
              key={index}
              icon={icon}
              tooltip={tooltip}
              onClick={actionOnClick}
              iconButtonProps={{ disabled, size: "small" }}
            />
          ))}
        </ListItemSecondaryAction>
      </MuiListItem>
    );
  }
);

export default ListItem;
