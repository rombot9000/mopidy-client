import React from "react";

import { IconButton } from "@material-ui/core";


/**
 * @param {Object} props
 */
export default (props) => {

    // remove warning msg
    const { fullWidth, disableElevation, children, ...filteredProps } = props;
    filteredProps.fullwidth = props.fullWidth.toString();
    
    return (
        <IconButton {...filteredProps} color="secondary">
            {children}
        </IconButton>
    );
};