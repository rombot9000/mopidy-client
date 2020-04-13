import React from "react";

import { render } from "react-dom";

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk";

import "typeface-roboto";

import App from "./App";
import reducer from "./Reducers";
import { LibraryActions, NetworkActions, NotifyActions } from "Actions";

// set store and make initial dispatches
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.dispatch(LibraryActions.init());

render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById("root")
);