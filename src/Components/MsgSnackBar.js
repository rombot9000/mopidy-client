import React from "react";

import { Snackbar, Button } from '@material-ui/core';

/**
 * 
 * @param {Object} props
 * @param {string} props.msg
 * @param {number} props.autoHideDuration
 * @param {Function} props.onClose
 * @param {string} props.actionText
 * @param {Function} props.actionCreator
 * @param {Function} props.onButtonClick
 */
export default ({msg, autoHideDuration, onClose, actionText, actionCreator, onButtonClick, ...props}) => (
    <Snackbar
        {...props}
        open={!!msg}
        message={msg}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        action={actionText ? (
            <Button 
                color="secondary" 
                size="small" 
                onClick={() => onButtonClick(actionCreator)}
            >
                {actionText}
            </Button>
        ) : null
        }
    />
)