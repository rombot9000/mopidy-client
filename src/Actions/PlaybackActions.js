import Dispatcher from "Dispatcher";

export const PLAYBACK_ACTIONS = {
    PLAY: "playbackActions.Play",
    PAUSE: "playbackActions.Pause",
    RESUME: "playbackActions.Resume",
    STOP: "playbackActions.Stop",
    TOGGLE: "playbackActions.Toggle",
    NEXT: "playbackActions.Next",
    PREVIOUS: "playbackActions.Previous"
};

export function play(track, tracklist) {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.PLAY,
        track: track,
        tracklist: tracklist
    });
};

export function pause() {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.PAUSE
    });
};

export function resume() {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.RESUME
    });
};

export function stop() {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.STOP
    });
};

export function toggle() {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.TOGGLE
    });
};

export function next() {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.NEXT
    });
};

export function previous() {
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.PREVIOUS
    });
};