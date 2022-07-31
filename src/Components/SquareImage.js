import React from "react";

import { makeStyles, Paper } from "@material-ui/core";

import StopPropagation from "./StopPropagation";

const useStyles = makeStyles(theme => ({
    paper: {
        width: "100%",
        paddingTop: "100%",
    }
}));

/**
 * @typedef {Object} SquareImagePropType
 * @property {string} src
 * 
 * @typedef {SquareImagePropType & import("@material-ui/core").PaperProps} SquareImageProps
 */

/**
 * @param {SquareImageProps} props 
 */
function SquareImage({src, className, children, ...paperProps}) {

    const classes = useStyles();

    return (
        <Paper className={`${className} ${classes.paper}`} {...paperProps}
            style={{
                backgroundImage: src ? `url(${src})` : undefined,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundColor: "#cccccc"
            }}>
            <StopPropagation>
                {children}
            </StopPropagation>
        </Paper>
    );
}

export default SquareImage;