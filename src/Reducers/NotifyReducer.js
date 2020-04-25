import { NOTIFY_ACTIONS } from "Actions/NotifyActions";

const initialState = {
    serverState: undefined,
    socketState: undefined
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
                arg: action.arg
            };

        default:
            return state;
    }
};