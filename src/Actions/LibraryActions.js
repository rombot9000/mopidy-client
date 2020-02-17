import Dispatcher from "Dispatcher";

export const LIBRARY_ACTIONS = {
    BROWSE: "libraryActions.Browse",
    LOOKUP: "libraryActions.Lookup",
    GET_IMAGES: "libraryActions.GetImages"
};

/**
 * 
 * @param {string} uri
 */
export function browse(uri) {
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.BROWSE,
        uri: uri
    })
};

/**
 * 
 * @param {string[]} uris
 */
export function lookup(uri) {
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.BROWSE,
        uri: uri
    })
};

/**
 * 
 * @param {string[]} uris
 */
export function getImages(uri) {
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.BROWSE,
        uri: uri
    })
};