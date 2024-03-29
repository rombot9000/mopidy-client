import React from "react";

import {MenuItem, ListItemIcon, ListItemText} from "@mui/material";

const ContextMenuItem = React.forwardRef((props, ref) => {
    const {text, icon, ...menuItemProps} = props;

    return (
        <MenuItem ref={ref} {...menuItemProps}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
        </MenuItem>
    )
});

export default ContextMenuItem;