import Mopidy from "mopidy";

import LibraryAPI from "./LibraryAPI";
import TracklistAPI from "./TracklistAPI";
import PlaybackAPI from "./PlaybackAPI";

import { LibraryActions, TracklistActions, PlaybackActions, NetworkActions } from "Actions";
import { Track } from "ViewModel";

// Creat instance of Mopidy API class
const MPD_ARGS = {
    autoConnect: false
};
if(process.env.NODE_ENV !== "production") {
    MPD_ARGS.webSocketUrl = "ws://raspberrypi.fritz.box:8080/mopidy/ws/";
}
export const mopidy = new Mopidy(MPD_ARGS);

// Create instances of API wrapper classes and export
export const Library = new LibraryAPI(mopidy);
export const Tracklist = new TracklistAPI(mopidy);
export const Playback = new PlaybackAPI(mopidy);

// Handle API callbacks

// set server state
mopidy.on("state", (state) => { NetworkActions.setServerState(state) } );

mopidy.on("state:online", () => {
    LibraryActions.fetch();
    TracklistActions.fetch();
    PlaybackActions.fetch();
});

// set websocket state
mopidy.on("websocket:close", () => { NetworkActions.setSocketState("close") } );
mopidy.on("websocket:error", () => { NetworkActions.setSocketState("error") } );
mopidy.on("websocket:open",  () => { NetworkActions.setSocketState("open")  } );


mopidy.on("event", (event, args) => {
    
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

        case "event:seeked":
            PlaybackActions.update({
                timePosition: args.time_position,
                timePositionUpdated: Date.now()
            });
        break;

        case "event:trackPlaybackEnded":
        case "event:trackPlaybackStopped":
        break;

        case "event:tracklistChanged":
            TracklistActions.fetch();
        break;

        default:
            console.debug("Event not handled here:", event, args);
            break;
    }
});