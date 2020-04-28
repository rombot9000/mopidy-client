import Dispatcher from "Dispatcher";

import { Tracklist } from "MopidyAPI";

import { ACTION_TYPES } from ".";

export const TRACKLIST_ACTIONS = {
    INIT: "tracklistActions.Init",
    FETCH: "tracklistActions.Fetch",
    SET: "tracklistActions.Set",
}

/**
 * 
 * @param {import("ViewModel/Track").Track[]} tracks 
 */
export function set(tracks) {
    return async dispatch => {
        await Tracklist.set(tracks);
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.SET,
        });
    };
};

export function fetch() {
    
    return async dispatch => dispatch({
        type: ACTION_TYPES.TRACKLIST_ACTION,
        case: TRACKLIST_ACTIONS.FETCH,
        tracks: await Tracklist.fetch()
    });
};