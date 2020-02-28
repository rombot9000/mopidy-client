import Dispatcher from "Dispatcher";

// Server API
import { Library } from "MopidyAPI";

// Storage
import { LibraryDB, SettingsDB } from "StorageAPI";


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
    
    let albums = [];
    let albumSortKey;
    try {

        const albumObjectStoreReader = await LibraryDB.getObjectStoreReader("Albums"); 
        albums = await albumObjectStoreReader.getAll();
        
        const settingsObjectStoreReader = await SettingsDB.getObjectStoreReader("Settings");
        const albumSortKeyObject = await settingsObjectStoreReader.get("albumSortKey");
        albumSortKey = albumSortKeyObject.value;
    
    } catch(err) {
    
        console.warn("Could not read from indexedDB:", err);
        
    } finally {
    
        Dispatcher.dispatch({
            type: LIBRARY_ACTIONS.INIT,
            albums: albums,
            albumSortKey: albumSortKey
        });
    
    }
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
    const settingsObjectStoreWriter = await SettingsDB.getObjectStoreWriter("Settings");
    settingsObjectStoreWriter.add([{name: "albumSortKey", value: albumSortKey}]);
};
