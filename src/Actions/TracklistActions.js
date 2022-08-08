import * as Mopidy from "MopidyAPI/Utils";

import { ACTION_TYPES } from ".";

export const TRACKLIST_ACTIONS = {
    INIT: "tracklistActions.Init",
    FETCH: "tracklistActions.Fetch",
    SET: "tracklistActions.Set",
    CLEAR: "tracklistActions.Clear",
    REMOVE_TRACK: "tracklistActions.RemoveTrack",
    ADD: "tracklistActions.Add",
    PLAY_NEXT: "tracklistActions.PlayNext",
};
Object.freeze(TRACKLIST_ACTIONS);

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
 export function playNext(tracks) {
    return async dispatch => {
        await Mopidy.playNext(tracks);
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.PLAY_NEXT,
        });
    };
};

/**
 * Clear current tracklist
 */
 export function clear() {
    return async dispatch => {
        await Mopidy.clearTracklist();
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.CLEAR,
        });
    };
};

/**
 * 
 * @param {number} tlid Tracklist item id
 */
 export function removeTrack(tlid) {
    return async dispatch => {
        await Mopidy.addToTracklist(tlid);
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.REMOVE_TRACK,
        });
    };
};

/**
 * Fetch current tracklist from server
 * @returns 
 */
export function fetch() {
    
    return async dispatch => dispatch({
        type: ACTION_TYPES.TRACKLIST_ACTION,
        case: TRACKLIST_ACTIONS.FETCH,
        tracklistItems: await Mopidy.fetchTracklist()
    });
};