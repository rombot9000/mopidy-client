import { Tracklist, Playback, Library } from "."
import { NotifyActions } from "Actions";
import Store from "Store";


/**
 * Wait for promise to resolve and notifies user on error  
 * Returns resolved promise
 * 
 * @param {Promise} promise 
 * @returns {Promise}
 */
async function notifyUserOnError(promise) {
    try {

        return await promise;

    } catch(error) {
        
        console.log(error);
        Store.dispatch(NotifyActions.notifyUser("error", error));
    }
}

/**
 * Play tracklist. If track is omitted, playback starts with first track
 * @param {import("ViewModel/Track").Track[]} tracks 
 * @param {import("ViewModel/Track").Track} track 
 */
export async function playTracklist(tracks, track) {

    await notifyUserOnError(Tracklist.set(tracks));
    
    const tlid = track ? Tracklist.getTrackId(track): null;
    
    await notifyUserOnError(Playback.playTrack(tlid));

};

/**
 * 
 * @param {import("./PlaybackAPI").PlaybackCmd} cmd 
 */
export async function sendPlaybackCmd(cmd) {
   
    await notifyUserOnError(Playback.sendCmd(cmd));

}

export async function togglePlayback() {
    
    await notifyUserOnError(Playback.togglePlayback());

};

/**
 * 
 * @param {number} timePosition 
 */
export async function seekTimePosition(timePosition) {

    await notifyUserOnError(Playback.seek(timePosition));

};

/**
 * @returns 
 */
export async function fetchPlaybackInfo() {
    
    return await notifyUserOnError(Playback.fetchInfo());

}

export async function fetchTracklist() {

    return await notifyUserOnError(Tracklist.fetch());

}

/**
 * Replace current tracklist
 * @param {import("ViewModel/Track").Track[]} tracks 
 * @returns 
 */
export async function setTracklist(tracks) {

    return await notifyUserOnError(Tracklist.set(tracks));

}

/**
 * Add to current tracklist at postion
 * @param {import("ViewModel/Track").Track[]} tracks 
 * @param {number} position 
 * @returns 
 */
export async function addToTracklist(tracks, position) {

    return await notifyUserOnError(Tracklist.add(tracks, position));

}

/**
 * 
 * @returns 
 */
 export async function clearTracklist() {

    return await notifyUserOnError(Tracklist.clear());

}

/**
 * Add to current tracklist at postion
 * @param {import("ViewModel/Track").Track[]} tracks 
 * @returns 
 */
 export async function playNext(tracks) {

    const currentTrackId = await notifyUserOnError(Tracklist.getCurrentTrackId());

    const position = (currentTrackId == null) ? 0 : currentTrackId + 1; 

    return await notifyUserOnError(Tracklist.add(tracks, position));

}

export async function fetchLibray() {

    return await notifyUserOnError(Library.fetchAll());

}

