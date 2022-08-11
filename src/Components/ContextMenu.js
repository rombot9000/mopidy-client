import React from "react";

import { Menu } from "@mui/material";

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