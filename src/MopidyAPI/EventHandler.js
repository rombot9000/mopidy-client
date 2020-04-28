
import { Track } from "ViewModel";
import { LibraryActions, TracklistActions, PlaybackActions, NetworkActions, NotifyActions } from "Actions";
import Store from "Store";

/** @typedef {
    "event:playbackStateChanged"|
    "event:trackPlaybackStarted"|
    "event:trackPlaybackResumed"|
    "event:trackPlaybackPaused"|
    "event:seeked"|
    "event:trackPlaybackEnded"|
    "event:trackPlaybackStopped"|
    "event:seeked"|
    "event:tracklistChanged"|
    "event:volumeChanged"
    } MpdEvent 
 */

/** @typedef {"state:online"|"state:offline"|"reconnectionPending"|"reconnecting"} ServerState */

/** @typedef {"websocket:open"|"websocket:close"|"websocket:error"} SocketState */

/**
 * Handle events of type "state"
 * @param {ServerState} state 
 */
export function handleServerEvent(state) {

    // Set network state
    Store.dispatch(NetworkActions.setServerState(state));

    Store.dispatch(notifyUser(state));
    
    // fetch info from server
    if(state === "state:online") {
        PlaybackActions.fetch();
        Store.dispatch(TracklistActions.fetch());
        Store.dispatch(LibraryActions.fetch());
    }
};

/**
 * 
 * @param {ServerState} state 
 */
function notifyUser(state) {
    console.log(state);
    // Notify user
    switch(state) {
        case "state:online":
            return NotifyActions.notifyUser("info", "Server online.");

        case "reconnecting":
            return NotifyActions.notifyUser("info", "Reconnecting...");

        case "reconnectionPending":
            return NotifyActions.notifyUser("error", "Server offline, waiting to reconnect...", {
                text: "Reconnect",
                creator: NetworkActions.connectToServer
            });

        case "state:offline":
            return NotifyActions.notifyUser("error", "Server offline.", {
                text: "Reconnect",
                creator: NetworkActions.connectToServer
            });

        default:
            return {};
    }
}

/**
 * Handle events of type "state"
 * @param {SocketState} state 
 */
export function handleSocketEvent(state) {
    Store.dispatch(NetworkActions.setSocketState(state));
};

/**
 * Handle events of type "event"
 * @param {MpdEvent} event 
 * @param {Object} args 
 */
export function handleMpdEvent(event, args) {
    switch(event) {
        case "event:playbackStateChanged":
            if(args.new_state === "stopped"){
                PlaybackActions.update({
                    state: "stopped",
                    track: Track(null),
                    timePosition: 0,
                    timePositionUpdated: 0
                });
            }
        break;
        
        case "event:trackPlaybackStarted":
            PlaybackActions.update({
                state: "playing",
                track: Track(args.tl_track.track),
                timePosition: 0,
                timePositionUpdated: Date.now()
            });
        break;

        case "event:trackPlaybackResumed":
            PlaybackActions.update({
                state: "playing",
                timePosition: args.time_position,
                timePositionUpdated: Date.now()
            });
        break;
        
        case "event:trackPlaybackPaused":
            PlaybackActions.update({
                state: "paused",
                timePosition: args.time_position,
                timePositionUpdated: Date.now()
            });
        break;

        case "event:trackPlaybackEnded":
        case "event:trackPlaybackStopped":
        break;

        case "event:seeked":
            PlaybackActions.update({
                timePosition: args.time_position,
                timePositionUpdated: Date.now()
            });
        break;

        case "event:tracklistChanged":
            Store.dispatch(TracklistActions.fetch());
        break;

        default:
            console.debug("Event not handled here:", event, args);
            break;
    }
}