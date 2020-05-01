import { ACTION_TYPES, PLAYBACK_ACTIONS } from "Actions";

import { Track } from "ViewModel";

/** @typedef {"playing"|"paused"|"stopped"} MopdiyPlaybackState */

/** 
 * @typedef {Object} PlaybackState
 * @property {MopdiyPlaybackState} state
 * @property {import("ViewModel/Track").Track} track
 * @property {number} timePosition
 * @property {number} timePositionUpdated
 */

 /** @type {PlaybackState} */
const initialState = {
    state: null,
    track: Track(null),
    timePosition: 0,
    timePositionUpdated: 0,
}

/**
 * @param {PlaybackState} state
 * @param {import("Actions").PlaybackAction} action
 * @returns {PlaybackState}
 */
export default (state = initialState, action) => {
    
    if(action.type !== ACTION_TYPES.PLAYBACK_ACTION) return state;

    switch(action.case) {
        case PLAYBACK_ACTIONS.FETCH:
            return {
                ...state,
                state: action.state,
                timePosition: action.timePosition,
                timePositionUpdated: action.timePositionUpdated,
                track: action.track
            };

        case PLAYBACK_ACTIONS.UPDATE:
            return {
                ...state,
                state: action.state || state.state,
                timePosition: action.timePosition || state.timePosition,
                timePositionUpdated: action.timePositionUpdated || state.timePositionUpdated,
                track: action.track || state.track
            };

        case PLAYBACK_ACTIONS.UPDATE_STATE:
            return {
                ...state,
                state: action.state
            };

        case PLAYBACK_ACTIONS.UPDATE_TIME_POSITION:
            return {
                ...state,
                timePosition: action.timePosition,
                timePositionUpdated: action.timePositionUpdated
            };

        case PLAYBACK_ACTIONS.UPDATE_TRACK:
            return {
                ...state,
                track: action.track
            };

        default:
            return state;
    }
};