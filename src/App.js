import React from "react";
import { Provider as ReduxProvider} from "react-redux";

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';


import Store from "./Store";
import { LibraryActions, NotifyActions, NetworkActions, PlaybackActions, TracklistActions } from "Actions";

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

const createExtendedTheme = () => {
    const defaultTheme = createTheme();
    const spacingNumber = (spacing) => Number(theme.spacing(spacing).slice(0, -2));
  
    return createTheme({
        spacingNumber
    });
  };

const theme = createExtendedTheme();
 
function App() {
    return (
        <ReduxProvider store={Store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <MainView/>
                </ThemeProvider>
            </StyledEngineProvider>
        </ReduxProvider>
    );
};

export default App;
