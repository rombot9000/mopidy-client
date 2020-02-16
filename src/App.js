import React from "react";

import { CssBaseline } from '@material-ui/core';

import MopidyHandler from "MopidyHandler/MopidyHandler";
import MainView from "Components/MainView";



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
