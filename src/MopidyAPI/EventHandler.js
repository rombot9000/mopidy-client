
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
        Store.dispatch(PlaybackActions.fetch());
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
            return NotifyActions.notifyUser("info", "Connected to server.");

        case "reconnecting":
            return NotifyActions.notifyUser("info", "Reconnecting...");

        case "reconnectionPending":
            return NotifyActions.notifyUserToReconnect("error", "Waiting to reconnect...");

        case "state:offline":
            return NotifyActions.notifyUserToReconnect("error", "Could not connect to server.");

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
                Store.dispatch(PlaybackActions.update({
                    state: "stopped",
                    track_uri: null,
                    timePosition: 0,
                    timePositionUpdated: 0
                }));
            }
        break;
        
        case "event:trackPlaybackStarted":
            Store.dispatch(PlaybackActions.update({
                state: "playing",
                track_uri: args.tl_track.track.uri,
                timePosition: 0,
                timePositionUpdated: Date.now()
            }));
        break;

        case "event:trackPlaybackResumed":
            Store.dispatch(PlaybackActions.update({
                state: "playing",
                timePosition: args.time_position,
                timePositionUpdated: Date.now()
            }));
        break;
        
        case "event:trackPlaybackPaused":
            Store.dispatch(PlaybackActions.update({
                state: "paused",
                timePosition: args.time_position,
                timePositionUpdated: Date.now()
            }));
        break;

        case "event:trackPlaybackEnded":
        case "event:trackPlaybackStopped":
        break;

        case "event:seeked":
            Store.dispatch(PlaybackActions.update({
                timePosition: args.time_position,
                timePositionUpdated: Date.now()
            }));
        break;

        case "event:tracklistChanged":
            Store.dispatch(TracklistActions.fetch());
        break;

        default:
            console.debug("Event not handled here:", event, args);
            break;
    }
}