import React from "react";

import { render } from "react-dom";

import { Provider } from "react-redux";

import "typeface-roboto";

import Store from "./Store";
import App from "./App";

import { LibraryActions, NotifyActions } from "Actions";
Store.dispatch(LibraryActions.init());
Store.dispatch(NotifyActions.init());

render(
    <Provider store={Store}>
        <App /> 
    </Provider>,
    document.getElementById("root")
);