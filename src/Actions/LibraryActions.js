// Server API
import * as Mopidy from "MopidyAPI/Utils";


// Storage
import { writeSetting, readSetting, getAlbumsFromDB, writeAlbumsToDB } from "StorageAPI/Utils";

import { ACTION_TYPES } from ".";

/**
 * @readonly
 */
export const LIBRARY_ACTIONS = {
    INIT:           0,
    SET_ALBUMS:     1,
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
 * @param {string} albumSortKey 
 */
export function sortAlbums(albumSortKey) {
    writeSetting("albumSortKey", albumSortKey);
    return {
        type: ACTION_TYPES.LIBRARY_ACTION,
        case: LIBRARY_ACTIONS.SET_SORT_KEY,
        albumSortKey: albumSortKey
    };
};


/**
 * Load albums from browser database
 */
export function init() {
    return async dispatch => {

        dispatch({
            type: ACTION_TYPES.LIBRARY_ACTION,
            case: LIBRARY_ACTIONS.INIT,
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
        
        const albums = await Mopidy.fetchLibray();

        dispatch({
            type: ACTION_TYPES.LIBRARY_ACTION,
            case: LIBRARY_ACTIONS.SET_ALBUMS,
            albums: albums || []
        });
        
        if(albums) writeAlbumsToDB(albums);
    };
};
