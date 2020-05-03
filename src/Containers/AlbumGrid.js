import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { makeStyles } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab";

import { ResponsiveGrid } from "Components";
import AlbumGridTile from "./AlbumGridTile";


const useStyles = makeStyles(theme => ({
    square: {
        paddingTop: "100%"
    }
}));

/**
 * @param {import("ViewModel/Album").Album[]} albums
 * @param {string} token
 */
function filterAlbumsByToken(albums, token) {

    if(!token || token === "") return [...albums];

    return albums.filter(album => {

        // check album name
        if(album.name.toLowerCase().search(token) !== -1) return true;

        // check album artists
        if(album.artist.toLowerCase().search(token) !== -1) return true;

        // check track artists
        for(let track of album.tracks) {
            if(track.artist.toLowerCase().search(token) !== -1) return true;
        };

        // No match found
        return false;

    });
}

/**
 * 
 * @param {import("ViewModel/Album").Album[]} albums 
 * @param {string} albumSortKey
 */
function sortAlbums(albums, albumSortKey) {
    console.log("sorting albums:", albumSortKey)
    if(!albumSortKey) return albums;

    return albums.sort((a,b) => {
        return ('' +  a[albumSortKey]).localeCompare(b[albumSortKey]);
    });
}


const getFilterToken = state => state.library.filterToken;
const getSortKey = state => state.library.albumSortKey;
const getAlbums = state => state.library.albums;

const selectSortedAndFilteredAlbums = createSelector(
    [getFilterToken, getSortKey, getAlbums],
    (filterToken, sortKey, albums) => {
        let filteredAlbums = filterAlbumsByToken(albums, filterToken);
        return sortAlbums(filteredAlbums, sortKey);
    }
)

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    albums: selectSortedAndFilteredAlbums(state)
});

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Album").Album[]} props.albums
 */
const AlbumGrid = ({albums}) => {
    const classes = useStyles();
    const skeleton = (
        <React.Fragment>
            <Skeleton variant="rect" className={classes.square}/>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
        </React.Fragment>
    )

    return (
        <ResponsiveGrid placeholder={skeleton}>
            {albums.map((album, key) => <AlbumGridTile key={key} album={album}/>)}
        </ResponsiveGrid>
    )
};

export default connect(mapStateToProps, null)(AlbumGrid);