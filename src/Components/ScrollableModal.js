import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Modal, Container, Fab } from "@material-ui/core";
import { Close } from "@material-ui/icons";

// Note: for now we use an absolute top padding of 50px
// since the percentual padding is relative to the width of the outer component!
const useStyles = makeStyles(theme => ({
    container: {
        outline: 0,
    },
    fab: {
        position: "absolute",
        top: 50,
        right: "10%",
        transform: "translate(50%,-50%)",
    },
    content: {
        position: "absolute",
        overflowX: "hidden",
        overflowY: "scroll",
        maxHeight: "100%",
        maxWidth: "80%",
        left: "50%",
        top: 0,
        transform: "translate(-50%,0%)",
        paddingTop: 50,
        "&::-webkit-scrollbar": {
            display: "none"
        },
        "-msOverflowStyle": "none"
    }
}));


function ScrollableModal(props) {

    const classes = useStyles();

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Container className={classes.container} disableGutters={true}>
                <Container className={classes.content} disableGutters={true}>
                    {props.children}
                </Container>
                <Fab color="primary" size="small" className={classes.fab} onClick={props.onClose}>
                    <Close />
                </Fab>
            </Container>
        </Modal>
    );
}

export default ScrollableModal;