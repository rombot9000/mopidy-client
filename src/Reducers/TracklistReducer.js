import { ACTION_TYPES, TRACKLIST_ACTIONS } from "Actions";

/** 
 * @typedef TracklistItem
 * @property {import("./LibraryReducer").StoredTrack} track Track
 * @property {number} tlid Tracklist Item Id
 */

/**
 * @typedef TracklistState
 * @property {TracklistItem[]} items
 */

 /** @type {TracklistState} */
const initialState = {
    items: []
}

/**
 * @param {TracklistState} state
 * @param {import("Actions").TracklistAction} action
 * @returns {TracklistState}
 */
const TracklistReducer = (state = initialState, action) => {
    
    if(action.type !== ACTION_TYPES.TRACKLIST_ACTION) return state;

    switch (action.case) {
        case TRACKLIST_ACTIONS.FETCH:
            return {
                ...state,
                items: action.tracklistItems || []
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

export default TracklistReducer;