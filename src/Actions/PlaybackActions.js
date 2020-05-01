import { Playback } from "MopidyAPI";
import * as Mopidy from "MopidyAPI/Utils";

import { ACTION_TYPES } from ".";

export const PLAYBACK_ACTIONS = {
    INIT:                    1,
    FETCH:                   2,
    UPDATE:                  3,
    UPDATE_STATE:            4,
    UPDATE_TIME_POSITION:    5,
    UPDATE_TRACK:            6,
    PLAY:                    7,
    PLAY_ALBUM:              8,
    PAUSE:                   9,
    RESUME:                 10,
    STOP:                   11,
    TOGGLE:                 12,
    NEXT:                   13,
    PREVIOUS:               14,
    SEEK:                   15
};

export function fetch() {
    return async dispatch => dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.FETCH,
        ...await Playback.fetchInfo()
    });
};

/**
 * 
 * @param {Object} param0
 * @param {import("MopidyAPI/PlaybackAPI").PlaybackState} param0.state
 * @param {import("ViewModel/Track").Track} param0.track
 * @param {number} param0.timePosition
 * @param {number} param0.timePositionUpdated
 */
export function update({state, track, timePosition, timePositionUpdated}) {
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.UPDATE,
        state: state,
        track: track,
        timePosition: timePosition,
        timePositionUpdated: timePositionUpdated
    };
}

/**
 * @param {import("MopidyAPI/PlaybackAPI").PlaybackState} state 
 */
export function updateState(state) {
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.UPDATE_STATE,
        state: state,
    };
};

/**
 * @param {number} timePosition playback time position in ms
 */
export function updateTimePosition(timePosition) {
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.UPDATE_TIME_POSITION,
        timePosition: timePosition,
        timePositionUpdated: Date.now()
    };
}

/**
\ * @param {import("ViewModel/Track").Track} track 
 */
export function updateTrack(track) {
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.UPDATE_TRACK,
        track: track
    };
}


/**
 * 
 * @param {import("ViewModel/Track").Track} track 
 * @param {import("ViewModel/Track").Track[]} tracklist 
 */
export function play(track, tracklist) {
    Mopidy.playTracklist(tracklist ? tracklist : [track], track);
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.PLAY
    };
};

/**
 * 
 * @param {import("ViewModel/Album").Album} album 
 */
export async function playAlbum(album) {
    Mopidy.playTracklist(album.tracks);
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.PLAY_ALBUM
    }
};

export function pause() {
    Mopidy.sendPlaybackCmd("pause");
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.PAUSE
    };
};

export function resume() {
    Mopidy.sendPlaybackCmd("resume");
    return {
        case: PLAYBACK_ACTIONS.RESUME
    }; 
};

export function stop() {
    Mopidy.sendPlaybackCmd("stop");
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.STOP
    }; 
};

export function toggle() {
    Mopidy.togglePlayback();
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.TOGGLE
    }; 
};

export function next() {
    Mopidy.sendPlaybackCmd("next");
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.NEXT
    }; 
};

export function previous() {
    Mopidy.sendPlaybackCmd("previous");
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.PREVIOUS
    }; 
};

/**
 * 
 * @param {number} timePosition
 */
export function seek(timePosition) {
    Mopidy.seekTimePosition(timePosition);
    return {
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.SEEK,
        timePosition: timePosition
    }; 
};