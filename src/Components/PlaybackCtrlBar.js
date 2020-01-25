import React from "react";

import {makeStyles} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {AppBar, Toolbar} from "@material-ui/core";
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

    const [state, setState] = React.useState({
        /** @type {string} */
        artist: null,
        /** @type {string} */
        album: null,
        /** @type {string} */
        track: null
    });
   

    React.useEffect(() => {
        function onTrackInfoUpdate() {
            if(MopidyHandler.playback.tl_track != null) {
                setState({
                    artist: MopidyHandler.playback.tl_track.track.artists[0].name,
                    album: MopidyHandler.playback.tl_track.track.album.name,
                    track: MopidyHandler.playback.tl_track.track.name
                });
            } else {
                setState({
                    artist: null,
                    album: null,
                    track: null
                });
            }
        }
        MopidyHandler.playback.on("trackInfoUpdated", onTrackInfoUpdate);
        // return clean up function
        return () => {
            MopidyHandler.playback.removeListener("trackInfoUpdated", onTrackInfoUpdate);
        }
    }, []); // prevents call on each render


    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <ButtonGroup>
                    <IconButton color="secondary" onClick={() => MopidyHandler.playback.sendCmd(PlaybackCmds.PREV)}>
                        <SkipPrevious/>
                    </IconButton>
                    <IconButton color="secondary" onClick={() => MopidyHandler.playback.sendCmd(PlaybackCmds.PAUSE)}>
                        <Pause/>
                    </IconButton>
                    <IconButton color="secondary" onClick={() => MopidyHandler.playback.sendCmd(PlaybackCmds.RESUME)}>
                        <PlayArrow/>
                    </IconButton>
                    <IconButton color="secondary" onClick={() => MopidyHandler.playback.sendCmd(PlaybackCmds.NEXT)}>
                        <SkipNext/>
                    </IconButton>
                </ButtonGroup>
                <div>
                    <Typography variant="body1" color="inherit">{state.track}</Typography>
                    <Typography variant="body2" color="inherit">{state.artist}</Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default PlaybackCtrlBar;