import Dispatcher from "Dispatcher";

import { Tracklist, Playback } from "MopidyAPI";

export const PLAYBACK_ACTIONS = {
    PLAY: "playbackActions.Play",
    PAUSE: "playbackActions.Pause",
    RESUME: "playbackActions.Resume",
    STOP: "playbackActions.Stop",
    TOGGLE: "playbackActions.Toggle",
    NEXT: "playbackActions.Next",
    PREVIOUS: "playbackActions.Previous"
};

export async function play(track, tracks) {
    await Tracklist.set(tracks);
    await Playback.play(track);
    Dispatcher.dispatch({
        type: PLAYBACK_ACTIONS.PLAY,
        track: track,
        tracks: tracks
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