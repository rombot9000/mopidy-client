import React from "react";

import { Dialog, Menu, MenuList } from "@mui/material";
import { BrowserView, MobileView } from "react-device-detect";

/**
 * 
 * @param {Object} param
 * @param {Element} param.anchorEl Anchor element to use in browser view
 * @param {boolean} param.open Open state in mobile view
 * @param {Function} param.onClose onClose callback for mobile view
 * @returns 
 */
const ContextMenu = ({anchorEl, open, onClose, ...menuListProps}) => {
    
    const [menuOpen, setMenuOpen] = React.useState(false);

    React.useEffect(() => {

        if(anchorEl == null) return () => {};

        anchorEl.onclick = (event) => {
            event.stopPropagation()
            setMenuOpen(!menuOpen);
        };

        return () => {
            anchorEl.onclick = () => {};
        };

    }, [anchorEl, menuOpen]);

    const handleClose = (event) => {
        event.stopPropagation()
        setMenuOpen(false);
    };
    
    return (
        <>
            <BrowserView>
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
                    open={menuOpen}
                    onClick={handleClose}
                    {...menuListProps}
                />
            </BrowserView>
            <MobileView>
                <Dialog open={open} onClose={onClose}>
                    <MenuList
                        onClick={onClose}
                        {...menuListProps}
                    />
                </Dialog>
            </MobileView>
        </>
    )
}

export default ContextMenu;