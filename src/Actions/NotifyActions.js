import { writeSetting, readSetting } from "StorageAPI/Utils";


/**
 * @readonly
 */
export const NOTIFY_ACTIONS = {
    INIT: "notifyActions.init",
    NOTIFY_USER: "notifyActions.NotifyUser",
    ENABLE_NOTIFICATIONS: "notifyActions.EnableNotifications"
};

export function init() {
    
    return async dispatch => dispatch({
        type: NOTIFY_ACTIONS.INIT,
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
        type: NOTIFY_ACTIONS.NOTIFY_USER,
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
        type: NOTIFY_ACTIONS.ENABLE_NOTIFICATIONS,
        enabled: enabled
    };
}