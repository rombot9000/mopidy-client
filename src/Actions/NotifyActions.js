import { writeSetting, readSetting } from "StorageAPI/Utils";

import { ACTION_TYPES } from ".";

/**
 * @readonly
 */
export const NOTIFY_ACTIONS = {
    INIT: 0,
    NOTIFY_USER: 1,
    ENABLE_NOTIFICATIONS: 2,
    NOTIFY_USER_TO_RECONNECT: 3,
};
Object.freeze(NOTIFY_ACTIONS);

export function init() {
    
    return async dispatch => dispatch({
        type: ACTION_TYPES.NOTIFY_ACTION,
        case: NOTIFY_ACTIONS.INIT,
        enabled: await readSetting("enableNotifications", true)
    });

};

/**
 * 
 * @param {import("Stores/notifyStore").NotifyLevel} level
 * @param {string} msg
 * @param {{text: string, creator: Function}} action
 */
export function notifyUser(level, msg) {
    
    if(typeof msg !== "string" && msg) msg = msg.toString ? msg.toString() : null;
    
    
    return {
        type: ACTION_TYPES.NOTIFY_ACTION,
        case: NOTIFY_ACTIONS.NOTIFY_USER,
        level: level,
        msg: msg
    };
}

/**
 * 
 * @param {import("Stores/notifyStore").NotifyLevel} level
 * @param {string} msg
 * @param {{text: string, creator: Function}} action
 */
 export function notifyUserToReconnect(level, msg) {
    
    if(typeof msg !== "string" && msg) msg = msg.toString ? msg.toString() : null;
    
    
    return {
        type: ACTION_TYPES.NOTIFY_ACTION,
        case: NOTIFY_ACTIONS.NOTIFY_USER_TO_RECONNECT,
        level: level,
        msg: msg,
        secondaryAction: {
            text: "Reconnect",
            type: ACTION_TYPES.NETWORK_ACTION,
            case: "connectToServer",
            args: {}
        }
    };
}

/**
 * 
 * @param {boolean} enabled
 */
export function enableNotifications(enabled) {
    writeSetting("enableNotifications", enabled);
    return {
        type: ACTION_TYPES.NOTIFY_ACTION,
        case: NOTIFY_ACTIONS.ENABLE_NOTIFICATIONS,
        enabled: enabled
    };
}