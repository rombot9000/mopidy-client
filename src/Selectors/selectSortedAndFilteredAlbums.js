import { createSelector } from "reselect";

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

export default createSelector(
    [
        state => state.library.filterToken,
        state => state.library.albumSortKey,
        state => state.library.albums
    ],
    (filterToken, sortKey, albums) => {
        let filteredAlbums = filterAlbumsByToken(albums, filterToken);
        return sortAlbums(filteredAlbums, sortKey);
    }
)
