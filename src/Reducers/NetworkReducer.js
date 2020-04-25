import { NETWORK_ACTIONS } from "Actions/NetworkActions";

const initialState = {
    serverState: undefined,
    socketState: undefined
}

export default (network = initialState, action) => {
    switch (action.type) {
        case NETWORK_ACTIONS.SET_SERVER_STATE:
            return {
                ...network, 
                serverState : action.state
            };

        case NETWORK_ACTIONS.SET_SOCKET_STATE:
            return {
                ...network, 
                socketState : action.state
            };

        default:
            return network;
    }
};