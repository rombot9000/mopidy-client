import { ACTION_TYPES, PLAYBACK_ACTIONS } from "Actions";

import { Track } from "ViewModel";

/** @typedef {"playing"|"paused"|"stopped"} MopdiyPlaybackState */

/** 
 * @typedef {Object} PlaybackState
 * @property {MopdiyPlaybackState} state
 * @property {import("Reducers/LibraryReducer").StoredTrack} track
 * @property {number} timePosition
 * @property {number} timePositionUpdated
 */

 /** @type {PlaybackState} */
const initialState = {
    state: "stopped",
    track: Track(null),
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
                track: action.track || Track(null)
            };

        case PLAYBACK_ACTIONS.UPDATE:
            return {
                ...state,
                state: action.state || state.state,
                timePosition: action.timePosition != null ?  action.timePosition : state.timePosition,
                timePositionUpdated: action.timePositionUpdated != null ? action.timePositionUpdated : state.timePositionUpdated,
                track: action.track || state.track
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
                track: action.track || Track(null)
            };

        default:
            return state;
    }
};

export default PlaybackReducer;