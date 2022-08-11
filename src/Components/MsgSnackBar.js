import React from "react";

import { Snackbar, Button } from '@mui/material';

/**
 * 
 * @param {Object} props
 * @param {string} props.msg
 * @param {number} props.autoHideDuration
 * @param {Function} props.onClose
 * @param {string} props.actionText
 * @param {Function} props.onButtonClick
 */
const MsgSnackBar = ({msg, autoHideDuration, onClose, actionText, onActionClick, ...props}) => (
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
                onClick={onActionClick}
            >
                {actionText}
            </Button>
        ) : null
        }
    />
);

export default MsgSnackBar;