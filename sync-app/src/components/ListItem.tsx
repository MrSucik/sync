import React, { forwardRef } from "react";
import {
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Icon,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Tooltip from "./Tooltip";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      backgroundColor: "rgba(63, 81, 181, 0.2) !important",
    },
    disabled: {
      backgroundColor: "rgba(10, 10, 10, 0.2) !important",
    },
    listItem: (props: {
      color: string | undefined;
      actions: number;
      clickable: boolean;
    }) => ({
      borderLeft: props.color ? `4px solid ${props.color}` : "",
      borderRadius: 4,
      paddingRight: 16 + 30 * props.actions,
    }),
    container: (props: {
      color: string | undefined;
      actions: number;
      clickable: boolean;
    }) => ({
      boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`,
      margin: 8,
      borderRadius: 4,
      cursor: props.clickable ? "pointer" : undefined,
      background: "#fff"
    }),
  })
);

interface Props {
  body: JSX.Element;
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
}

const ListItem = forwardRef<any, Props>(
  ({ avatar, body, disabled, selected, color, actions = [], onClick }, ref) => {
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
        {avatar && <ListItemAvatar>{avatar}</ListItemAvatar>}
        {body}
        <ListItemSecondaryAction>
          {actions.map(({ icon, tooltip, onClick: actionOnClick }, index) => (
            <Tooltip key={index} title={tooltip}>
              <IconButton
                disabled={disabled}
                size="small"
                onClick={actionOnClick}
              >
                <Icon>{icon}</Icon>
              </IconButton>
            </Tooltip>
          ))}
        </ListItemSecondaryAction>
      </MuiListItem>
    );
  }
);

export default ListItem;