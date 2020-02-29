import { EventEmitter } from "events";

import { NETWORK_ACTIONS } from "Actions/NetworkActions"

export default class NetworkStore extends EventEmitter {
    constructor() {
        super();
        this._serverState = null;
        this._socketState = null;
    }

    handleAction(action) {
        switch(action.type) {

            case NETWORK_ACTIONS.SET_SERVER_STATE:
                this._serverState = action.state;
            break;

            case NETWORK_ACTIONS.SET_SOCKET_STATE:
                this._socketState = action.state;
            break;
            
            default:

        }
    }
};