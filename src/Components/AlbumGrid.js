import React from "react";

import { makeStyles, Grid } from "@material-ui/core"
import AlbumGridTile from "./AlbumGridTile"

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
 * @function AlbumGrid
 * @param {Object} props
 */
export default ({albums}) => {
    // calc classes
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={GRID_SPACING}
            className={classes.gridList}
        >
        {albums.map((a,i) => (<AlbumGridTile key={i} xl={1} lg={2} md={3} sm={4} xs={6} album={a}/>))}
        </Grid>
    );
};
