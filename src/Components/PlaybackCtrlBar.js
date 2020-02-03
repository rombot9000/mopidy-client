import React from "react";

import {makeStyles} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {AppBar, Toolbar, Box} from "@material-ui/core";

import {ButtonGroup, IconButton} from "@material-ui/core";
import {PlayArrow, Pause, SkipNext, SkipPrevious} from "@material-ui/icons";

import SearchField from "./SearchField";

import MopidyHandler from "MopidyHandler/MopidyHandler";
import {PlaybackCmds} from "MopidyHandler/PlaybackHandler";

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    }
}));

/**
 * 
 * @param {Object} props
 * @param {string} cmd
 */
function PlaybackButton(props) {

    // remove warning msg
    const { to, fullWidth, ...filteredProps } = props;
    filteredProps.fullwidth = props.fullWidth.toString();
    
    return (
        <IconButton {...filteredProps} color="secondary" onClick={() => MopidyHandler.playback.sendCmd(props.cmd)}>
            {props.children}
        </IconButton>
    );
};

const PlaybackCtrlBar = React.forwardRef((props, ref) => {
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
        <AppBar {...props} ref={ref} position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <ButtonGroup>
                    <PlaybackButton cmd={PlaybackCmds.PREV}>
                        <SkipPrevious/>
                    </PlaybackButton>
                    <PlaybackButton cmd={PlaybackCmds.PAUSE}>
                        <Pause/>
                    </PlaybackButton>
                    <PlaybackButton cmd={PlaybackCmds.RESUME}>
                        <PlayArrow/>
                    </PlaybackButton>
                    <PlaybackButton cmd={PlaybackCmds.NEXT}>
                        <SkipNext/>
                    </PlaybackButton>
                </ButtonGroup>
                <Box flexGrow={2}>
                    <Typography variant="body1" color="inherit">{state.track}</Typography>
                    <Typography variant="body2" color="inherit">{state.artist}</Typography>
                </Box>
                <Box flexShrink={1}>
                    <SearchField/>
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default PlaybackCtrlBar;