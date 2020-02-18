import React from "react";

import { CssBaseline } from '@material-ui/core';

import MainView from "Components/MainView";

import PlaybackStore from "Stores/PlaybackStore";
import TracklistStore from "Stores/TracklistStore";
import LibraryStore from "Stores/LibraryStore";


import { mopidy } from "MopidyAPI";
mopidy.on("state:online", () => {
    PlaybackStore.init();
    TracklistStore.init();
    LibraryStore.init();
});
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
