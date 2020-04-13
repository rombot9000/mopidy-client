import React from "react";

import { CssBaseline } from '@material-ui/core';


import MainView from "Components/MainView";
import { NetworkActions, NotifyActions } from "Actions";

// Init stores
NotifyActions.init();

// connect to server
NetworkActions.connectToServer();
// reconnect on focus
window.addEventListener('focus', () => {
    NetworkActions.connectToServer();
});
 
function App() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <MainView/>
        </React.Fragment>
    );
};

export default App;
