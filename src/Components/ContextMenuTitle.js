import React from "react";

import {ListItem, ListItemText, Divider} from "@mui/material";

const ContextMenuTitle = React.forwardRef((props, ref) => {
    const {children, ...menuItemProps} = props;

    return (
        <>
            <ListItem ref={ref} {...menuItemProps}>
                <ListItemText disableTypography>{children}</ListItemText>
            </ListItem>
            <Divider/>
        </>
    )
});

export default ContextMenuTitle;