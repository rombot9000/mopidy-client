import React from "react";

import { IconButton } from "@mui/material";


/**
 * @param {Object} props
 */
const PlaybackButton = (props) => {

    // remove warning msg
    const { fullWidth, disableElevation, children, ...filteredProps } = props;
    //filteredProps.fullwidth = props.fullWidth.toString();
    
    return (
        <IconButton {...filteredProps} color="secondary">
            {children}
        </IconButton>
    );
};

export default PlaybackButton;