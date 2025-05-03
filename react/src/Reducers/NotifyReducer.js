import { ACTION_TYPES, NOTIFY_ACTIONS } from "Actions";

/**
 * @typedef NotifyState
 * @property {boolean} enabled 
 * @property {"info"|"warn"|"error"} level 
 * @property {string} msg 
 * @property {{text: string, type: ACTION_TYPES, case: string}} secondaryAction 
 */

 /** @type {NotifyState} */
const initialState = {
    enabled: true,
    level: undefined,
    msg: undefined,
    secondaryAction: {
        text: undefined,
        type: undefined,
        case: undefined
    }
}

/**
 * @param {NotifyState} state
 * @param {import("Actions").NotifyAction} action
 * @returns {NotifyState}
 */
const NotifyReducer = (state = initialState, action) => {

    if(action.type !== ACTION_TYPES.NOTIFY_ACTION) return state;

    switch (action.case) {
        case NOTIFY_ACTIONS.INIT:
        case NOTIFY_ACTIONS.ENABLE_NOTIFICATIONS:
            return {
                ...state, 
                enabled: action.enabled
            };
        
        case NOTIFY_ACTIONS.NOTIFY_USER:
        case NOTIFY_ACTIONS.NOTIFY_USER_TO_RECONNECT:
            return {
                ...state,
                level: action.level,
                msg: action.msg,
                secondaryAction: action.secondaryAction || {}
            };

        default:
            return state;
    }
};

export default NotifyReducer;