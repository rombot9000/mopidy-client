import React from "react";

import { Menu } from "@material-ui/core";

// Other
export default ({children, ...menuListProps}) => {
    return (
        <Menu {...menuListProps}>
            {children}
        </Menu>
    )
}