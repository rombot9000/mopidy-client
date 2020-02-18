import Dispatcher from "Dispatcher";

export const LIBRARY_ACTIONS = {
    FETCH_ALL: "libraryActions.FetchAll",
    FILTER: "libraryActions.Filter",
};

/**
 * Fetch all albums from server
 */
export function fetch_all() {
    Dispatcher.dispatch({
        type: LIBRARY_ACTIONS.FETCH_ALL,
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
