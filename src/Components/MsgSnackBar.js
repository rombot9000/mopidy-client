import React from "react";

import { Snackbar, Button } from '@material-ui/core';

import { NotifyStore } from "Stores";
import { NetworkActions } from "Actions";


export default function(props) {

    const [state, setState] = React.useState({
        open: false,
        msg: null,
        autoHideDuration: null,
        action: null
    });
    React.useEffect(() => {
        const connectButton = (<Button color="secondary" size="small" onClick={NetworkActions.connectToServer}>Connect</Button>)
        
        /**
         * 
         * @param {import("Stores/notifyStore").NotifyLevel} level 
         */
        function handleUpdate(level) {
            switch(level) {
                case "error":
                    setState({
                        open: true,
                        msg: NotifyStore.notifyMsg,
                        action: connectButton
                    });
                break;

                case "warn":
                    setState({
                        open: true,
                        msg: NotifyStore.notifyMsg,
                        autoHideDuration: 4000,
                    });
                break;

                case "info":
                    setState({
                        open: true,
                        msg: NotifyStore.notifyMsg,
                        autoHideDuration: 2000,
                        //action: connectButton
                    });
                break;

                default:
            }
        }

        NotifyStore.on("update", handleUpdate);

        return () => {
            NotifyStore.removeListener("update", handleUpdate);
        };

    },[]);

    return (
        <Snackbar
            {...props}
            open={state.open}
            message={state.msg}
            autoHideDuration={state.autoHideDuration}
            onClose={() => setState({open: false})}
            action={state.action}
        />
    );
}