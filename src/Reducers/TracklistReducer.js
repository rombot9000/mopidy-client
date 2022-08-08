import { ACTION_TYPES, TRACKLIST_ACTIONS } from "Actions";

/**
 * @typedef TracklistState
 * @property {import("ViewModel/Track").Track[]} tracks
 */

 /** @type {TracklistState} */
const initialState = {
    tracks: []
}

/**
 * @param {TracklistState} state
 * @param {import("Actions").TracklistAction} action
 * @returns {TracklistState}
 */
export default (state = initialState, action) => {
    
    if(action.type !== ACTION_TYPES.TRACKLIST_ACTION) return state;

    switch (action.case) {
        case TRACKLIST_ACTIONS.FETCH:
            return {
                ...state,
                tracks: action.tracks || []
            };

        case TRACKLIST_ACTIONS.INIT:
        case TRACKLIST_ACTIONS.SET:
        case TRACKLIST_ACTIONS.ADD:
        case TRACKLIST_ACTIONS.PLAY_NEXT:
        case TRACKLIST_ACTIONS.CLEAR:
            return state;

        default:
            return state;
    }
};