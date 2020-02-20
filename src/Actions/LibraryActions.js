import Dispatcher from "Dispatcher";

import { Library } from "MopidyAPI";

export const LIBRARY_ACTIONS = {
    INIT: "libraryActions.Init",
    FETCH_ALL: "libraryActions.FetchAll",
    FILTER: "libraryActions.Filter",
};

/**
 * Fetch all albums from server
 */
export async function init() {
    const albums = await Library.fetchAll();
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.INIT,
        albums: albums
    })
};

/**
 * Fetch all albums from server
 */
export async function fetchAll() {
    const albums = await Library.fetchAll();
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.FETCH_ALL,
        albums: albums
    })
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
