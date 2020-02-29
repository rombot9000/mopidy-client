import Dispatcher from "Dispatcher";

// Server API
import { mopidy } from "MopidyAPI";

/**
 * @readonly
 */
export const NETWORK_ACTIONS = {
    CONNECT: "networkActions.Connect",
    SET_SERVER_STATE: "networkActions.SetServerState",
    SET_SOCKET_STATE: "networkActions.SetSocketState",
};

/**
 * 
 * @param {"online"|"offline"|"reconnectionPending"|"reconnecting"} state 
 */
export function setServerState(state) {
    Dispatcher.dispatch({
        type: NETWORK_ACTIONS.SET_SERVER_STATE,
        state: state
    });
};

/**
 * 
 * @param {"open"|"close"|"error"} state 
 */
export function setSocketState(state) {
    Dispatcher.dispatch({
        type: NETWORK_ACTIONS.SET_SERVER_STATE,
        state: state
    });
};


export function connectToServer() {
     mopidy.connect();
};