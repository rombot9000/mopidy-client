import { Tracklist, Playback } from "."
import { NotifyActions } from "Actions";
import Store from "Store";

function notifyUserOnError(error) {
    Store.dispatch(NotifyActions.notifyUser("error", error));
}

/**
 * Play tracklist. If track is omitted, playback starts with first track
 * @param {import("ViewModel/Track").Track[]} tracks 
 * @param {import("ViewModel/Track").Track} track 
 */
export async function playTracklist(tracks, track) {
    try {
        await Tracklist.set(tracks);
        const tlid = track ? Tracklist.getTrackId(track): null;
        await Playback.playTrack(tlid);
    } catch (error) {
        notifyUserOnError(error)
    }
};

/**
 * 
 * @param {import("./PlaybackAPI").PlaybackCmd} cmd 
 */
export async function sendPlaybackCmd(cmd) {
    try {
        await Playback.sendCmd(cmd);
    } catch(error) {
        notifyUserOnError(error)
    }
}

export async function togglePlayback() {
    try {
        await Playback.togglePlayback();
    } catch(error) {
        notifyUserOnError(error)
    }
};

/**
 * 
 * @param {number} timePosition 
 */
export async function seekTimePosition(timePosition) {
    try {
        await Playback.seek(timePosition);
    } catch(error) {
        notifyUserOnError(error)
    }
};



