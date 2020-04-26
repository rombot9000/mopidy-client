// Server API
import { Library } from "MopidyAPI";

// Storage
import { writeSetting, readSetting, getAlbumsFromDB, writeAlbumsToDB } from "StorageAPI/Utils";

/**
 * @readonly
 */
export const LIBRARY_ACTIONS = {
    INIT: "libraryActions.Init",
    SET_ALBUMS: "libraryActions.SetAlbums",
    SET_FILTER: "libraryActions.SetFilter",
    SET_SORT_KEY: "libraryActions.SetSortKey"
};

// /**
//  * 
//  * @param {import("ViewModel/Album").Album[]} albums 
//  * @param {string} albumSortKey 
//  */
// function init(albums, albumSortKey) {
//     return {
//         type: LIBRARY_ACTIONS.SET_ALBUMS,
//         albums: albums,
//         albumSortKey: albumSortKey
//     };
// };

// /**
//  * 
//  * @param {import("ViewModel/Album").Album[]} albums 
//  * @param {string} albumSortKey 
//  */
// function setAlbums(albums, albumSortKey) {
//     return {
//         type: LIBRARY_ACTIONS.SET_ALBUMS,
//         albums: albums,
//     };
// };

/**
 * Filter albums by search token
 * @param {string} token
 */
export function setFilter(token) {
    return {
        type: LIBRARY_ACTIONS.SET_FILTER,
        token: token
    };
};

/**
 * Sort albums by key
 * @param {string} albumSortKey 
 */
export function sortAlbums(albumSortKey) {
    writeSetting("albumSortKey", albumSortKey);
    return {
        type: LIBRARY_ACTIONS.SET_SORT_KEY,
        albumSortKey: albumSortKey
    };
};


/**
 * Load albums from browser database
 */
export function init() {
    return async dispatch => {

        dispatch({
            type: LIBRARY_ACTIONS.INIT,
            albums: await getAlbumsFromDB(),
            albumSortKey: await readSetting("albumSortKey")
        });

    };
};

/**
 * Fetch all albums from server
 */
export function fetch() {
    return async dispatch => {
        
        const albums = await Library.fetchAll();

        writeAlbumsToDB(albums);
        
        dispatch({
            type: LIBRARY_ACTIONS.SET_ALBUMS,
            albums: albums
        });

    };
};
