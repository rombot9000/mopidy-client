import React from "react";

import { makeStyles, Paper } from "@material-ui/core";

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
function SquareImage(props) {

    const {src, className, ...paperProps} = props;

    const classes = useStyles();

    return (
        <Paper className={`${className} ${classes.paper}`} {...paperProps}
            style={{
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            }}>
        </Paper>
    );
}

export default SquareImage;