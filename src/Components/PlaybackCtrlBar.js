import React from "react";

import {makeStyles} from "@material-ui/core"
import {AppBar} from "@material-ui/core"
import {ButtonGroup, IconButton} from "@material-ui/core";
import {PlayArrow, Pause, SkipNext, SkipPrevious} from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";
import {PlaybackCmds} from "MopidyHandler/PlaybackHandler";

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    }
}));

function PlaybackCtrlBar() {
    const classes = useStyles();
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <ButtonGroup>
                <IconButton onClick={() => MopidyHandler.playback.sendCmd(PlaybackCmds.PREV)}>
                    <SkipPrevious/>
                </IconButton>
                <IconButton onClick={() => MopidyHandler.playback.sendCmd(PlaybackCmds.PAUSE)}>
                    <Pause/>
                </IconButton>
                <IconButton onClick={() => MopidyHandler.playback.sendCmd(PlaybackCmds.RESUME)}>
                    <PlayArrow/>
                </IconButton>
                <IconButton onClick={() => MopidyHandler.playback.sendCmd(PlaybackCmds.NEXT)}>
                    <SkipNext/>
                </IconButton>
            </ButtonGroup>
        </AppBar>
    );
};

export default PlaybackCtrlBar;