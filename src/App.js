import React from "react";
import { Provider } from "react-redux";

import { ThemeProvider, createTheme } from '@mui/material';

import Store from "./Store";
import { LibraryActions, NotifyActions, NetworkActions, PlaybackActions, TracklistActions } from "Actions";

import { CssBaseline } from '@mui/material';
import MainView from "Containers/MainView";

const theme = createTheme();

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
            <ThemeProvider theme={theme}>
                <MainView/>
            </ThemeProvider>;
        </Provider>
    );
};

export default App;
