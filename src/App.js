import React from "react";

import { CssBaseline } from '@material-ui/core';

import MainView from "Components/MainView";
import { LibraryActions, TracklistActions, PlaybackActions } from "Actions"
import { Track } from "ViewModel"

// Setup API callbacks here for now
import { mopidy } from "MopidyAPI";
mopidy.on("state:online", () => {
    console.log("Mopidy server online. Initializing stores...");
    LibraryActions.init();
    TracklistActions.init();
    PlaybackActions.init();
});

mopidy.on("event", (event, args) => {

    console.log(event);
    console.log(args);
    
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

        case "event:tracklistChanged":
            TracklistActions.update();
        break;

        default:
            console.debug(`Event not handled here: ${event}`);
            break;
    }
});

// connect to server
mopidy.connect();



function App() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <MainView/>
        </React.Fragment>
    );
};

export default App;
