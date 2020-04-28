import React from "react";

import { makeStyles, Grid } from "@material-ui/core"

const GRID_SPACING = 1

const useStyles = makeStyles(theme => ({
    gridList: {
        paddingTop: theme.spacing(GRID_SPACING),
        paddingLeft: theme.spacing(GRID_SPACING),
        width: '100%',
        height: '100%',
    },
}));

/**
 * @function ResponsiveGrid
 * @param {Object} props
 * @param {Grid} props.GridItem
 * @param {Object[]} props.gridItemProps
 */
export default ({GridItem, gridItemProps}) => {
    // calc classes
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={GRID_SPACING}
            className={classes.gridList}
        >
        {gridItemProps.map((itemProps,i) => (<GridItem item key={i} xl={1} lg={2} md={3} sm={4} xs={6} {...itemProps}/>))}
        </Grid>
    );
};
