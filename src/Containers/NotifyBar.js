import { connect } from "react-redux";

import { MsgSnackBar } from "Components";

import { NotifyActions } from "Actions";

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

const mapStateToProps = (state, ownProps) => ({
    className: ownProps.className,
    msg: state.notify.msg,
    autoHideDuration: autoHideDuration(state.notify.level),
    actionText: state.notify.action.text,
    actionCreator: state.notify.action.creator
});
    
const mapDispatchToProps = dispatch => ({
    onButtonClick: (actionCreator) => dispatch(actionCreator()),
    onClose: () => dispatch(NotifyActions.notifyUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(MsgSnackBar);
