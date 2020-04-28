import { writeSetting, readSetting } from "StorageAPI/Utils";

import { ACTION_TYPES } from ".";

/**
 * @readonly
 */
export const NOTIFY_ACTIONS = {
    INIT: 0,
    NOTIFY_USER: 1,
    ENABLE_NOTIFICATIONS: 2
};

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
export function notifyUser(level, msg, action) {
    return {
        type: ACTION_TYPES.NOTIFY_ACTION,
        case: NOTIFY_ACTIONS.NOTIFY_USER,
        level: level,
        msg: msg,
        action: action
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