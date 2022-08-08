import React from "react";

import { Menu } from "@material-ui/core";
import ContextMenuItem from "./ContextMenuItem";

/**
 * 
 * @param {Object} param
 * @param {Element} param.anchorEl
 * @returns 
 */
const ContextMenu = ({anchorEl, ...menuListProps}) => {
    
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {

        if(anchorEl == null) return () => {};

        anchorEl.onclick = (event) => {
            event.stopPropagation()
            setOpen(!open);
        };

        return () => {
            anchorEl.onclick = () => {};
        };

    }, [anchorEl, open]);

    const handleClose = (event) => {
        event.stopPropagation()
        setOpen(false);
    };
    
    return (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={open}
            onClick={handleClose}
            {...menuListProps}
        />
    )
}

export default ContextMenu;