import { connect } from "react-redux";

import { AlbumGrid } from "Components";

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


const mapStateToProps = (state, ownProps) => ({
    albums: sortedAndFilteredAlbums(state.library)
});
  
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGrid);