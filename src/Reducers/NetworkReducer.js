import { ACTION_TYPES, NETWORK_ACTIONS } from "Actions";

/**
 * @typedef {Object} NetworkState
 * @property {string} serverState
 * @property {string} socketState
 */

/** @type {NetworkState} */
const initialState = {
    serverState: undefined,
    socketState: undefined
}

/**
 * @param {NetworkState} state
 * @param {import("Actions").NetworkAction} action
 * @returns {NetworkState}
 */
export default (state = initialState, action) => {

    if(action.type !== ACTION_TYPES.NETWORK_ACTION) return state;

    switch (action.case) {
        case NETWORK_ACTIONS.SET_SERVER_STATE:
            return {
                ...state, 
                serverState : action.state
            };

        case NETWORK_ACTIONS.SET_SOCKET_STATE:
            return {
                ...state, 
                socketState : action.state
            };

        default:
            return state;
    }
};