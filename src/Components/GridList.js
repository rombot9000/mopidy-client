import React from "react";

import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const GRID_SPACING = 1;

const useStyles = makeStyles(theme => ({
    container: {
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            display: "none"
        },
        "-msOverflowStyle": "none",
        maxHeight: "100%",
        maxWidth: "100%"
    }
}));

/**
 * @param {Object} props
 */
export default ({children}) => {

    const classes = useStyles();

    return (
        <Grid container
            className={classes.container}
            spacing={GRID_SPACING}
        >
            {React.Children.map(children, child => 
                <Grid item xs={12}>{child}</Grid>
            )}
        </Grid>
    );
}