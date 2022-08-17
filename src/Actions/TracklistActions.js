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
 * @param {string[]} track_uris
 */
export function set(track_uris) {
    return async dispatch => {
        await Mopidy.setTracklist(track_uris);
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.SET,
        });
    };
};

/**
 * 
 * @param {string[]} track_uris
 * @param {number} position
 */
 export function add(track_uris, position) {
    return async dispatch => {
        await Mopidy.addToTracklist(track_uris, position);
        dispatch ({
            type: ACTION_TYPES.TRACKLIST_ACTION,
            case: TRACKLIST_ACTIONS.ADD,
        });
    };
};

/**
 * 
 * @param {string[]} track_uris
 */
 export function playNext(track_uris) {
    return async dispatch => {
        await Mopidy.playNext(track_uris);
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
 * @param {import("Reducers/TracklistReducer").StoredTracklistItem} item Tracklist item to remove
 */
 export function removeTrack(item) {
    return async dispatch => {
        await Mopidy.removeFromTracklist(item);
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