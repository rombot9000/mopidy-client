import React from "react";

import { render } from "react-dom";

import { Provider } from "react-redux";

import "typeface-roboto";

import Store from "./Store";
import App from "./App";

import { LibraryActions, NotifyActions, NetworkActions, PlaybackActions, TracklistActions } from "Actions";
Store.dispatch(LibraryActions.init());
Store.dispatch(NotifyActions.init());
Store.dispatch(NetworkActions.connectToServer());
// reconnect on focus
window.addEventListener('focus', () => {
    Store.dispatch(NetworkActions.connectToServer());
    Store.dispatch(PlaybackActions.fetch());
    Store.dispatch(TracklistActions.fetch());
});

render(
    <Provider store={Store}>
        <App /> 
    </Provider>,
    document.getElementById("root")
);