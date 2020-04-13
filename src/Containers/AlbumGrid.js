import { connect } from "react-redux";

import { AlbumGrid } from "Components";

/**
 * @param {import("ViewModel/Album").Album[]} albums
 * @param {string} lowerCaseToken
 */
function filterAlbumsByLowercaseToken(albums, lowerCaseToken) {

    if(!lowerCaseToken || lowerCaseToken === "") return albums;

    return albums.filter(album => {

        // check album name
        if(album.name.toLowerCase().search(lowerCaseToken) !== -1) return true;

        // check album artists
        if(album.artist.toLowerCase().search(lowerCaseToken) !== -1) return true;

        // check track artists
        for(let track of album.tracks) {
            if(track.artist.toLowerCase().search(lowerCaseToken) !== -1) return true;
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
    
    let sortedAlbumList = sortAlbums(library.albums, library.albumSortKey);

    return filterAlbumsByLowercaseToken(sortedAlbumList, library.filterToken.toLowerCase());

}


const mapStateToProps = (state, ownProps) => ({
    albums: sortedAndFilteredAlbums(state.library)
});
  
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGrid);