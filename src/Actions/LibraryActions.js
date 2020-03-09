import Dispatcher from "Dispatcher";

// Server API
import { Library } from "MopidyAPI";

// Storage
import { writeSetting, readSetting, getAlbumsFromDB, writeAlbumsToDB } from "StorageAPI/Utils";


/**
 * @readonly
 */
export const LIBRARY_ACTIONS = {
    INIT: "libraryActions.Init",
    FETCH: "libraryActions.Fetch",
    FILTER: "libraryActions.Filter",
    SORT_ALBUMS: "libraryActions.SortAlbums"
};

/**
 * Load albums from Library database
 */
export async function init() {
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.INIT,
        albums: await getAlbumsFromDB(),
        albumSortKey: await readSetting("albumSortKey")
    });
};

/**
 * Fetch all albums from server
 */
export async function fetch() {
    const albums = await Library.fetchAll();
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.FETCH,
        albums: albums
    });
    writeAlbumsToDB();
};

/**
 * Filter albums by search token
 * @param {string} token
 */
export function filter(token) {
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.FILTER,
        token: token
    });
};

/**
 * Sort albums by key
 * @param {string} albumSortKey 
 */
export async function sortAlbums(albumSortKey) {
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.SORT_ALBUMS,
        albumSortKey: albumSortKey
    });
    writeSetting("albumSortKey", albumSortKey);
};
