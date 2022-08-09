import React from "react";

import { makeStyles } from "@mui/styles";

import { Modal, Container, Fab } from "@mui/material";
import { Close } from "@mui/icons-material";

// NOTE: we calc the width and height instead of using padding
// since the translate function does not work well with paddings or margins
const PADDING = 2;
const useStyles = makeStyles(theme => ({
    container: {
        outline: 0,
        position: "absolute",
        overflowX: "visible",
        overflowY: "visible",
        [theme.breakpoints.down('sm')]: {
            top: `calc(50% + ${0.5*theme.spacing(PADDING)}px)`,
            height: `calc(100% - ${theme.spacing(PADDING)}px)`,
            width: `calc(100% - ${2*theme.spacing(PADDING)}px)`,
            maxWidth: 0.5*theme.breakpoints.width("md") - theme.spacing(PADDING),
        },
        [theme.breakpoints.up('md')]: {
            top: "50%",
            height: 0.5*theme.breakpoints.width("md") - theme.spacing(PADDING),
            width: theme.breakpoints.width("md") - 2*theme.spacing(PADDING),
        },
        left: "50%",
        transform: "translate(-50%,-50%)",
    },
    fab: {
        position: "absolute",
        right: 0,
        top: 0,
        transform: "translate(25%,-25%)",
        zIndex: 10,
    }
}));


function ScrollableModal(props) {

    const classes = useStyles();

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Container className={classes.container} disableGutters>
                <Container disableGutters>
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