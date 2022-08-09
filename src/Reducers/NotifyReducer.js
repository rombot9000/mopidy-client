import { ACTION_TYPES, NOTIFY_ACTIONS } from "Actions";

/**
 * @typedef NotifyState
 * @property {boolean} enabled 
 * @property {"info"|"warn"|"error"} level 
 * @property {string} msg 
 * @property {{text: string, creator: Function}} action 
 */

 /** @type {NotifyState} */
const initialState = {
    enabled: true,
    level: undefined,
    msg: undefined,
    action: {
        text: undefined,
        creator: undefined
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
            return {
                ...state,
                level: action.level,
                msg: action.msg,
                action: {
                    text: action.action ? action.action.text: undefined,
                    creator: action.action ? action.action.creator : undefined
                }
            };

        default:
            return state;
    }
};

export default NotifyReducer;