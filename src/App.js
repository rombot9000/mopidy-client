import React from "react";

import { CssBaseline } from '@material-ui/core';

import MopidyHandler from "MopidyHandler/MopidyHandler";
import MainView from "Components/MainView";

import Mopdy from "Mopidy";
import PlaybackStore from "Stores/PlaybackStore";
import TracklistStore from "Stores/TracklistStore";
import LibraryStore from "Stores/LibraryStore";

Mopdy.on("state:online", () => {
    PlaybackStore.init();
    TracklistStore.init();
    LibraryStore.init();
});



function App() {
    const [state, setState] = React.useState({
        mpdState: null,
    });

    // setup listener
    React.useEffect(() => {
        // Listen for changes from mopidy handler
        const mdpListener = MopidyHandler.on("state", (mpdState) => setState(prev => ({...prev, mpdState: mpdState})));
        // clean up
        return () => {
            MopidyHandler.removeListener("state", mdpListener);
        };
    },[]); // only execute once

    return (
        <React.Fragment>
            <CssBaseline/>
            <MainView
                state={state.mpdState}
                albums={MopidyHandler.Albums}
            />
        </React.Fragment>
    );
};

export default App;
