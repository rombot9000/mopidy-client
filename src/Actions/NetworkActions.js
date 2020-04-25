// Server API
import { mopidy } from "MopidyAPI";

/** @typedef {import("MopidyAPI/EventHandler").ServerState} ServerState */
/** @typedef {import("MopidyAPI/EventHandler").SocketState} SocketState */

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
 * @param {ServerState} state 
 */
export function setServerState(state) {
    return {
        type: NETWORK_ACTIONS.SET_SERVER_STATE,
        state: state
    };
};

/**
 * 
 * @param {SocketState} state 
 */
export function setSocketState(state) {
    return {
        type: NETWORK_ACTIONS.SET_SOCKET_STATE,
        state: state
    };
};


export function connectToServer() {
     mopidy.connect();
};