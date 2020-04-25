import { writeSetting, readSetting } from "StorageAPI/Utils";


/**
 * @readonly
 */
export const NOTIFY_ACTIONS = {
    INIT: "notifyActions.init",
    NOTFY_USER: "notifyActions.NotifyUser",
    ENABLE_NOTIFICATIONS: "notifyActions.EnableNotifications"
};

export function init() {
    
    return async dispatch =>  {

        dispatch({
            type: NOTIFY_ACTIONS.INIT,
            enabled: await readSetting("enableNotifications", true)
        });

    };

};

/**
 * 
 * @param {import("Stores/notifyStore").NotifyLevel} level
 * @param {*} arg 
 */
export function notifyUser(level, arg) {
    return {
        type: NOTIFY_ACTIONS.NOTFY_USER,
        level: level,
        arg: arg
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