import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

export default (props) => {
    const {to, text, icon, ...listItemProps} = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <NavLink to={to} ref={ref} {...itemProps}/>)
    , [to]);

    return (
        <ListItem
            button
            selected={useRouteMatch(to)}
            {...listItemProps} 
            component={renderLink}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
        </ListItem>
    );
}