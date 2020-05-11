import { createSelector } from "reselect";

import { Album} from "ViewModel";

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
        if(album.artist.name.toLowerCase().search(token) !== -1) return true;

        // check track artists
        for(let track of album.tracks) {
            if(track.artist.name.toLowerCase().search(token) !== -1) return true;
        };

        // No match found
        return false;

    });
}

/**
 * 
 * @param {string|number} a 
 * @param {string|number} b 
 */
function customCompare(a,b) {
    const strA = String(a).replace(/^(The|the|Die|die)\s/,"");
    const strB = String(b).replace(/^(The|the|Die|die)\s/,"");
    return strA.localeCompare(strB);
} 

/**
 * 
 * @param {import("ViewModel/Album").Album[]} albums 
 * @param {string} albumSortKey
 */
function sortAlbums(albums, sortKey) {
    if(!sortKey) return albums;

    const nullAlbum = Album(null);

    if(typeof nullAlbum[sortKey] === "object") {

        if(!nullAlbum[sortKey].hasOwnProperty("name")) return albums;
        
        return albums.sort((a,b) => {
            if(a[sortKey] === null || b[sortKey] === null) return 0;
            return customCompare(a[sortKey].name, b[sortKey].name);
        });
    }

    return albums.sort((a,b) => customCompare(a[sortKey], b[sortKey]));
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
