import { EventEmitter } from "events";

import { NOTIFY_ACTIONS } from "Actions/NotifyActions"

/** @typedef {"error"|"warn"|"info"} NotifyLevel*/

export default class notifyStore extends EventEmitter {
    constructor() {
        super();
        /** @type {NotifyLevel} */
        this._notifyLevel = null;
        /** @type {string} */
        this._notifyMsg = null;
    }

    handleAction(action) {
        switch(action.type) {

            case NOTIFY_ACTIONS.NOTFY_USER:
                this._notifyMsg = action.arg.toString();
                this._notifyLevel = action.level;
                this.emit("update", action.level);
            break;
            
            default:

        }
    }

    /**
     * @readonly
     */
    get notifyMsg() {
        return this._notifyMsg;
    }

    /**
     * @readonly
     */
    get notifyLevel() {
        return this._notifyLevel;
    }

};