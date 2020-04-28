import Dispatcher from "Dispatcher";

import { Playback } from "MopidyAPI";
import * as Mopidy from "MopidyAPI/Utils";

import { ACTION_TYPES } from ".";

export const PLAYBACK_ACTIONS = {
    INIT: "playbackActions.Init",
    FETCH: "playbackActions.Fetch",
    UPDATE: "playbackActions.Update",
    UPDATE_STATE: "playbackActions.UpdateState",
    UPDATE_TIME_POSITION: "playbackActions.UpdateTimePosition",
    UPDATE_TRACK: "playbackActions.UpdateTrack",
    PLAY: "playbackActions.Play",
    PLAY_ALBUM: "playbackActions.PlayAlbum",
    PAUSE: "playbackActions.Pause",
    RESUME: "playbackActions.Resume",
    STOP: "playbackActions.Stop",
    TOGGLE: "playbackActions.Toggle",
    NEXT: "playbackActions.Next",
    PREVIOUS: "playbackActions.Previous",
    SEEK: "playbackActions.Seek",
};

export async function fetch() {
    const { state, track, timePosition, timePositionUpdated } = await Playback.fetchInfo();
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.FETCH,
        state: state,
        track: track,
        timePosition: timePosition,
        timePositionUpdated: timePositionUpdated
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
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.UPDATE,
        state: state,
        track: track,
        timePosition: timePosition,
        timePositionUpdated: timePositionUpdated
    })
}

/**
 * @param {import("Stores/PlaybackStore").PlaybackState} state 
 */
export function updateState(state) {
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.UPDATE_STATE,
        state: state,
    });
};

/**
 * @param {number} timePosition playback time position in ms
 */
export function updateTimePosition(timePosition) {
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.UPDATE_TIME_POSITION,
        timePosition: timePosition,
        timePositionUpdated: Date.now()
    })
}

/**
\ * @param {import("ViewModel/Track").Track} track 
 */
export function updateTrack(track) {
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.UPDATE_TRACK,
        track: track
    });
}


/**
 * 
 * @param {import("ViewModel/Track").Track} track 
 * @param {import("ViewModel/Track").Track[]} tracks 
 */
export async function play(track, tracks) {
    Mopidy.playTracklist(tracks, track);
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.PLAY
    });
};

/**
 * 
 * @param {import("ViewModel/Album").Album} album 
 */
export async function playAlbum(album) {
    Mopidy.playTracklist(album.tracks);
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.PLAY_ALBUM
    });
};

export function pause() {
    Mopidy.sendPlaybackCmd("pause");
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.PAUSE
    });
};

export function resume() {
    Mopidy.sendPlaybackCmd("resume");
    Dispatcher.dispatch({
        case: PLAYBACK_ACTIONS.RESUME
    });
};

export function stop() {
    Mopidy.sendPlaybackCmd("stop");
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.STOP
    });
};

export function toggle() {
    Mopidy.togglePlayback();
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.TOGGLE
    });
};

export function next() {
    Mopidy.sendPlaybackCmd("next");
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.NEXT
    });
};

export function previous() {
    Mopidy.sendPlaybackCmd("previous");
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.PREVIOUS
    });
};

/**
 * 
 * @param {number} timePosition
 */
export function seek(timePosition) {
    Mopidy.seekTimePosition(timePosition);
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYBACK_ACTION,
        case: PLAYBACK_ACTIONS.SEEK,
        timePosition: timePosition
    });
};