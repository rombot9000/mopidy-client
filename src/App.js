import React from "react";
import { Provider } from "react-redux";

import Store from "./Store";
import { LibraryActions, NotifyActions, NetworkActions, PlaybackActions, TracklistActions } from "Actions";

import { CssBaseline } from '@material-ui/core';
import MainView from "Containers/MainView";

Store.dispatch(LibraryActions.init());
Store.dispatch(NotifyActions.init());
Store.dispatch(NetworkActions.connectToServer());
// reconnect on focus
window.addEventListener('focus', () => {
    Store.dispatch(NetworkActions.connectToServer());
    Store.dispatch(PlaybackActions.fetch());
    Store.dispatch(TracklistActions.fetch());
});
 
function App() {
    return (
        <Provider store={Store}>
            <CssBaseline/>
            <MainView/>
        </Provider>
    );
};

export default App;
