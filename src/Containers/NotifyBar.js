import { connect } from "react-redux";

import { MsgSnackBar } from "Components";

import { NotifyActions, resolveAction } from "Actions";

/**
 * 
 * @param {import("Stores/notifyStore").NotifyLevel} level 
 */
const autoHideDuration = (level) => {
    switch(level) {
        case "error": return null;
        case "warn": return 4000;
        case "info": return 2000;
        default: return null
    }
}

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state, ownProps) => ({
    className: ownProps.className,
    msg: state.notify.msg,
    autoHideDuration: autoHideDuration(state.notify.level),
    actionText: state.notify.secondaryAction.text,
});
    
const mapDispatchToProps = (dispatch, ownProps) => ({
    onActionClick: () => dispatch(resolveAction(...ownProps.secondaryAction)),
    onClose: () => dispatch(NotifyActions.notifyUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(MsgSnackBar);
