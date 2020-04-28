import React from "react";
import { connect } from "react-redux";

import { ResponsiveGrid } from "Components";
import AlbumGridTile from "./AlbumGridTile";

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
    if(!albumSortKey) return albums;

    return albums.sort((a,b) => {
        return ('' +  a[albumSortKey]).localeCompare(b[albumSortKey]);
    });
}


function sortedAndFilteredAlbums(library) {
    let filteredAlbums = filterAlbumsByToken(library.albums, library.filterToken);
    return sortAlbums(filteredAlbums, library.albumSortKey);
}

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    albums: sortedAndFilteredAlbums(state.library)
});

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Album").Album[]} props.albums
 */
const AlbumGrid = ({albums}) => (
    <ResponsiveGrid GridItem={AlbumGridTile} gridItemProps={albums.map(a => {return {"album": a}})}/>
);

export default connect(mapStateToProps, null)(AlbumGrid);