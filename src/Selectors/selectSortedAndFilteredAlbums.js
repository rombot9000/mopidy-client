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
    const strA = String( (a !== null && typeof a === "object") ? a.name : a).replace(/^(The|the|Die|die)\s/,"");
    const strB = String( (b !== null && typeof b === "object") ? b.name : b).replace(/^(The|the|Die|die)\s/,"");
    return strA.localeCompare(strB);
} 

/**
 * 
 * @param {import("ViewModel/Album").Album[]} albums 
 * @param {string[]} sortKeys
 */
function sortAlbums(albums, sortKeys) {

    if(!sortKeys || !Array.isArray(sortKeys) || !sortKeys.length) return albums;
    
    //remove unsortable attributes from sort list
    const album = Album(null);
    const filteredKeys = sortKeys.filter(key => 
        album.hasOwnProperty(key) &&
        // if key refers to an object, we sort using the name attribute of the object
        (typeof album[key] != "object" || album[key].hasOwnProperty("name"))
    );
    
    let compRes = 0;
    return albums.sort((a,b) => {
        for(let key of filteredKeys) {
            compRes = customCompare(a[key], b[key]);
            if( compRes !== 0 ) return compRes;
        }
        return 0;
    });
}

export default createSelector(
    [
        state => state.library.filterToken,
        state => state.library.albumSortKeys,
        state => state.library.albums
    ],
    (filterToken, sortKeys, albums) => {
        let filteredAlbums = filterAlbumsByToken(albums, filterToken);
        return sortAlbums(filteredAlbums, sortKeys);
    }
)
