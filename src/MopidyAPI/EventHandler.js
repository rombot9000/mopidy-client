
import { Track } from "ViewModel";
import { LibraryActions, TracklistActions, PlaybackActions, NetworkActions, NotifyActions } from "Actions";

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
    NetworkActions.setServerState(state)

    // Notify user
    switch(state) {
        case "state:online":
            NotifyActions.notifyUser("info", "Server online.");
        break;

        case "reconnecting":
            NotifyActions.notifyUser("info", "Reconnecting...");
        break;

        case "reconnectionPending":
            NotifyActions.notifyUser("error", "Server offline, waiting to reconnect...");
        break;

        case "state:offline":
            NotifyActions.notifyUser("error", "Server offline.");
        break;

        default:
            console.debug("Server state not handled:", state);
    }
    
    // fetch info from server
    if(state === "state:online") {
        PlaybackActions.fetch();
        TracklistActions.fetch();
        LibraryActions.fetch();
    }
};

/**
 * Handle events of type "state"
 * @param {SocketState} state 
 */
export function handleSocketEvent(state) {
    NetworkActions.setSocketState(state);
    console.debug("Server state not handled:", state);
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
            TracklistActions.fetch();
        break;

        default:
            console.debug("Event not handled here:", event, args);
            break;
    }
}