import Dispatcher from "Dispatcher";

// Server API
import { Library } from "MopidyAPI";

// View Model
import { Album } from "ViewModel";

// Storage API
import IndexedDB from "StorageAPI/IndexedDB";
/** @type {IndexedDB} */
const LibraryDB = new IndexedDB("Library", 3);
LibraryDB.addSchema({
    name: "Albums",
    params: {keyPath: "_uri"},
    indexSchemes: Object.keys(Album(null)).map(key => {
        return {"name": key, "params": null};
    })
});

/**
 * @readonly
 */
export const LIBRARY_ACTIONS = {
    INIT: "libraryActions.Init",
    FETCH: "libraryActions.Fetch",
    FILTER: "libraryActions.Filter",
};

/**
 * Load albums from Library database
 */
export async function init() {
    const albumObjectStoreWriter = await LibraryDB.getObjectStoreWriter("Albums"); 
    const albums = await albumObjectStoreWriter.getAll();
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.INIT,
        albums: albums
    })
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
    const albumObjectStoreWriter = await LibraryDB.getObjectStoreWriter("Albums"); 
    await albumObjectStoreWriter.clear();
    await albumObjectStoreWriter.add(albums);
};

/**
 * Filter albums by search token
 * @param {string} token
 */
export function filter(token) {
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.FILTER,
        token: token
    })
};
