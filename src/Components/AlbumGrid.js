import React from "react";

import { makeStyles, Grid } from "@material-ui/core"
import AlbumGridTile from "./AlbumGridTile"

const GRID_SPACING = 1

const useStyles = makeStyles(theme => ({
    gridList: {
        paddingTop: theme.spacing(GRID_SPACING),
        paddingLeft: theme.spacing(GRID_SPACING),
        overflowY: 'scroll',
        width: '100%',
        height: '100%',
    },
}));

/**
 * @function AlbumGrid
 * @param {Object} props
 * @param {import('ViewModel/Album').Album[]} props.albums
 */
function AlbumGrid(props) {
    // calc classes
    const classes = useStyles();

    return (
            <Grid
                container
                spacing={GRID_SPACING}
                className={classes.gridList}
            >
            {props.albums.map((a,i) => (
                <Grid item key={i} xl={1} lg={2} md={3} sm={4} xs={6}>
                    <AlbumGridTile
                        album={a}
                        onClick={props.onTileClick} 
                    />
                </Grid>
            ))}
            </Grid>
    );
};

export default AlbumGrid;