import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles"
import { Skeleton } from "@mui/material";

import selectSortedAndFilteredAlbums from "Selectors/selectSortedAndFilteredAlbums";
import { ResponsiveGrid } from "Components";
import AlbumGridTile from "./AlbumGridTile";


const useStyles = makeStyles(theme => ({
    square: {
        paddingTop: "100%"
    }
}));

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    albums: selectSortedAndFilteredAlbums(state)
});

/**
 * 
 * @param {Object} props
 * @param {import("Reducers/LibraryReducer").StoredAlbum[]} props.albums
 */
const AlbumGrid = ({albums, dispatch, ...forwardProps}) => {
    const classes = useStyles();
    const skeleton = (
        <React.Fragment>
            <Skeleton animation={false} variant="rect" className={classes.square}/>
            <Skeleton animation={false} variant="text" />
            <Skeleton animation={false} variant="text" />
        </React.Fragment>
    )

    return (
        <ResponsiveGrid
            placeholder={skeleton}
            spacing={1}
            {...forwardProps}
        >
            {albums.map((album, key) => <AlbumGridTile key={key} album={album}/>)}
        </ResponsiveGrid>
    )
};

export default connect(mapStateToProps, null)(AlbumGrid);