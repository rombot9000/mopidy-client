// Server API
import * as Mopidy from "MopidyAPI/Utils";


// Storage
import { writeSetting, readSetting, readLibraryFromDB, writeLibraryToDB } from "StorageAPI/Utils";

import { ACTION_TYPES } from ".";

/**
 * @readonly
 */
export const LIBRARY_ACTIONS = {
    INIT:           0,
    FETCH:          1,
    SET_FILTER:     2,
    SET_SORT_KEY:   3
};

/**
 * Filter albums by search token
 * @param {string} token
 */
export function setFilter(token) {
    return {
        type: ACTION_TYPES.LIBRARY_ACTION,
        case: LIBRARY_ACTIONS.SET_FILTER,
        token: token
    };
};

/**
 * Sort albums by key
 * @param {string[]} albumSortKeys 
 */
export function sortAlbums(albumSortKeys) {
    writeSetting("albumSortKeys", albumSortKeys);
    return {
        type: ACTION_TYPES.LIBRARY_ACTION,
        case: LIBRARY_ACTIONS.SET_SORT_KEY,
        albumSortKeys: albumSortKeys
    };
};


/**
 * Load albums from browser database
 */
export function init() {
    return async dispatch => {

        const library = await readLibraryFromDB(); 

        dispatch({
            type: ACTION_TYPES.LIBRARY_ACTION,
            case: LIBRARY_ACTIONS.INIT,
            artists: library.artists,
            albums: library.albums,
            tracks: library.tracks,
            albumSortKeys: await readSetting("albumSortKeys")
        });

    };
};

/**
 * Fetch all albums from server
 */
export function fetch() {
    return async dispatch => {
        
        const [artists, albums, tracks] = await Mopidy.fetchLibray();

        dispatch({
            type: ACTION_TYPES.LIBRARY_ACTION,
            case: LIBRARY_ACTIONS.FETCH,
            artists: artists || [],
            albums: albums || [],
            tracks: tracks || []
        });
        
        if(albums && artists && tracks) writeLibraryToDB({
            artists: artists || [],
            albums: albums || [],
            tracks: tracks || []
        });
    };
};
