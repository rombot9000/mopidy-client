import { NOTIFY_ACTIONS } from "Actions/NotifyActions";

const initialState = {
    enabled: true,
    level: undefined,
    msg: undefined,
    action: {
        text: undefined,
        creator: undefined
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
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