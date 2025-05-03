import { ACTION_TYPES, PLAYBACK_ACTIONS } from "Actions";

/** @typedef {"playing"|"paused"|"stopped"} MopdiyPlaybackState */

/** 
 * @typedef {Object} PlaybackState
 * @property {MopdiyPlaybackState} state
 * @property {string} track_uri
 * @property {number} timePosition
 * @property {number} timePositionUpdated
 */

 /** @type {PlaybackState} */
const initialState = {
    state: "stopped",
    track_uri: null,
    timePosition: 0,
    timePositionUpdated: 0,
}

/**
 * @param {PlaybackState} state
 * @param {import("Actions").PlaybackAction} action
 * @returns {PlaybackState}
 */
const PlaybackReducer = (state = initialState, action) => {
    
    if(action.type !== ACTION_TYPES.PLAYBACK_ACTION) return state;
    
    switch(action.case) {
        case PLAYBACK_ACTIONS.FETCH:
            return {
                ...initialState,
                state: action.state || "stopped",
                timePosition: action.timePosition || 0,
                timePositionUpdated: action.timePositionUpdated || 0,
                track_uri: action.track_uri || null
            };

        case PLAYBACK_ACTIONS.UPDATE:
            return {
                ...state,
                ...action.stateUpdates
            };

        case PLAYBACK_ACTIONS.UPDATE_STATE:
            return {
                ...state,
                state: action.state || "stopped"
            };

        case PLAYBACK_ACTIONS.UPDATE_TIME_POSITION:
            return {
                ...state,
                timePosition: action.timePosition || 0,
                timePositionUpdated: action.timePositionUpdated || 0
            };

        case PLAYBACK_ACTIONS.UPDATE_TRACK:
            return {
                ...state,
                track_uri: action.track_uri || null
            };

        default:
            return state;
    }
};

export default PlaybackReducer;