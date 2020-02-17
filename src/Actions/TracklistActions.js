import Dispatcher from "Dispatcher";

export const TRACKLIST_ACTIONS = {
    SET: "tracklistActions.Set"
}

/**
 * 
 * @param {string[]} uris 
 */
export function set(uris) {
    Dispatcher.dispatch({
        type: TRACKLIST_ACTIONS.SET,
        uris: uris
    });
};