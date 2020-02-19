import React from "react";

import { CssBaseline } from '@material-ui/core';

import MainView from "Components/MainView";
import { LibraryActions, TracklistActions, PlaybackActions } from "Actions"
import { Track } from "ViewModel"

// Setup API callbacks here for now
import { mopidy } from "MopidyAPI";
mopidy.on("state:online", () => {
    LibraryActions.init();
    TracklistActions.init();
    PlaybackActions.init();
});

mopidy.on("event", (event, args) => {
    
    switch(event) {
        case "event:playbackStateChanged":
            PlaybackActions.updateState(args.new_state);
        break;
        
        case "event:trackPlaybackStarted":
            PlaybackActions.updateTimePosition(0);
            PlaybackActions.updateTrack(Track(args.tl_track.track));
        break;

        case "event:trackPlaybackResumed":
        case "event:trackPlaybackPaused":
            PlaybackActions.updateTimePosition(args.time_position);     
        break;

        case "event:trackPlaybackEnded":
        case "event:trackPlaybackStopped":
            if(this._state === "stopped") PlaybackActions.updateTrack(Track(null));
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
