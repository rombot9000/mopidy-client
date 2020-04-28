// Server API
import { mopidy } from "MopidyAPI";

/** @casedef {import("MopidyAPI/EventHandler").ServerState} ServerState */
/** @casedef {import("MopidyAPI/EventHandler").SocketState} SocketState */

import { ACTION_TYPES } from ".";

/**
 * @readonly
 */
export const NETWORK_ACTIONS = {
    CONNECT:            0,
    SET_SERVER_STATE:   1,
    SET_SOCKET_STATE:   2,
};

/**
 * 
 * @param {ServerState} state 
 */
export function setServerState(state) {
    return {
        type: ACTION_TYPES.NETWORK_ACTION,
        case: NETWORK_ACTIONS.SET_SERVER_STATE,
        state: state
    };
};

/**
 * 
 * @param {SocketState} state 
 */
export function setSocketState(state) {
    return {
        type: ACTION_TYPES.NETWORK_ACTION,
        case: NETWORK_ACTIONS.SET_SOCKET_STATE,
        state: state
    };
};


export function connectToServer() {
    mopidy.connect();
    return {
        type: ACTION_TYPES.NETWORK_ACTION,
        case: NETWORK_ACTIONS.CONNECT
    }
};