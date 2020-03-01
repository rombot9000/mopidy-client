import {Tracklist, Playback} from "."
import { NotifyActions } from "Actions";

export async function playTracklist(track, tracks) {
    try {
        await Tracklist.set(tracks);
        const tlid = Tracklist.getTrackId(track);
        await Playback.playTrack(tlid);
    } catch (error) {
        NotifyActions.notifyUser("error", error);
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
        NotifyActions.notifyUser("error", error);
    }
}

export async function togglePlayback() {
    try {
        await Playback.togglePlayback();
    } catch(error) {
        NotifyActions.notifyUser("error", error);
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
        NotifyActions.notifyUser("error", error);
    }
};



