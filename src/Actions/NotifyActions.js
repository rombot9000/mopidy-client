import Dispatcher from "Dispatcher";

/**
 * @readonly
 */
export const NOTIFY_ACTIONS = {
    NOTFY_USER: "networkActions.NotifyUser"
};

/**
 * 
 * @param {string} level
 * @param {*} arg 
 */
export function notifyUser(level, arg) {
    Dispatcher.dispatch({
        type: NOTIFY_ACTIONS.NOTFY_USER,
        level: level,
        arg: arg
    })
}