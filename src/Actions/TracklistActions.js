import * as Mopidy from "MopidyAPI/Utils";

import { ACTION_TYPES } from ".";

export const TRACKLIST_ACTIONS = {
    INIT: "tracklistActions.Init",
    FETCH: "tracklistActions.Fetch",
    SET: "tracklistActions.Set",
    ADD: "tracklistActions.Add",
    PLAY_NEXT: "tracklistActions.PlayNext",
}

/**
 * 
 * @param {import("ViewModel/Track").Track[]} tracks 
 */
export function set(tracks) {
    return async dispatch => {
        await Mopidy.setTracklist(tracks);
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.SET,
        });
    };
};

/**
 * 
 * @param {import("ViewModel/Track").Track[]} tracks
 * @param {number} position
 */
 export function add(tracks, position) {
    return async dispatch => {
        await Mopidy.addToTracklist(tracks, position);
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.ADD,
        });
    };
};

/**
 * 
 * @param {import("ViewModel/Track").Track[]} tracks
 */
 export function playNext(tracks, ) {
    return async dispatch => {
        await Mopidy.playNext(tracks);
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.PLAY_NEXT,
        });
    };
};

export function fetch() {
    
    return async dispatch => dispatch({
        type: ACTION_TYPES.TRACKLIST_ACTION,
        case: TRACKLIST_ACTIONS.FETCH,
        tracks: await Mopidy.fetchTracklist()
    });
};