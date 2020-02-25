import Dispatcher from "Dispatcher";

import { Tracklist, Playback } from "MopidyAPI";

export const PLAYBACK_ACTIONS = {
    INIT: "playbackActions.Init",
    FETCH: "playbackActions.Fetch",
    UPDATE: "playbackActions.Update",
    UPDATE_STATE: "playbackActions.UpdateState",
    UPDATE_TIME_POSITION: "playbackActions.UpdateTimePosition",
    UPDATE_TRACK: "playbackActions.UpdateTrack",
    PLAY: "playbackActions.Play",
    PAUSE: "playbackActions.Pause",
    RESUME: "playbackActions.Resume",
    STOP: "playbackActions.Stop",
    TOGGLE: "playbackActions.Toggle",
    NEXT: "playbackActions.Next",
    PREVIOUS: "playbackActions.Previous"
};

export async function fetch() {
    const { state, track, timePosition, timePositionUpdated } = await Playback.fetchInfo();
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.FETCH,
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
        type: PLAYBACK_ACTIONS.UPDATE,
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
        type: PLAYBACK_ACTIONS.UPDATE_STATE,
        state: state,
    });
};

/**
 * @param {number} timePosition playback time position in ms
 */
export function updateTimePosition(timePosition) {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.UPDATE_TIME_POSITION,
        timePosition: timePosition,
        timePositionUpdated: Date.now()
    })
}

/**
\ * @param {import("ViewModel/Track").Track} track 
 */
export function updateTrack(track) {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.UPDATE_TRACK,
        track: track
    });
}


/**
 * 
 * @param {import("ViewModel/Track").Track} track 
 * @param {import("ViewModel/Track").Track[]} tracks 
 */
export async function play(track, tracks) {
    await Tracklist.set(tracks);
    const tlid = Tracklist.getTrackId(track);
    await Playback.play(tlid);
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.PLAY
    });
};

export function pause() {
    Playback.pause();
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.PAUSE
    });
};

export function resume() {
    Playback.resume();
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.RESUME
    });
};

export function stop() {
    Playback.stop();
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.STOP
    });
};

export function toggle() {
    Playback.togglePlayback();
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.TOGGLE
    });
};

export function next() {
    Playback.next();
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.NEXT
    });
};

export function previous() {
    Playback.previous();
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.PREVIOUS
    });
};