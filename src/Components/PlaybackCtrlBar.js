import React from "react";

import {makeStyles} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {AppBar, Toolbar, Box} from "@material-ui/core";

import {ButtonGroup, IconButton} from "@material-ui/core";
import {PlayArrow, Pause, SkipNext, SkipPrevious} from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    }
}));

/**
 * 
 * @param {Object} props
 * @param {import('MopidyHandler/PlaybackHandler').PlaybackCmd} props.cmd
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

    const [track, setTrack] = React.useState({
        /** @type {string} */
        artist: null,
        /** @type {string} */
        album: null,
        /** @type {string} */
        track: null
    });
    const [playbackState, setPlaybackState] = React.useState(MopidyHandler.playback.state);

    console.log(MopidyHandler.playback.state);
    console.log(playbackState);
   

    React.useEffect(() => {
        /**
         * @param {import('MopidyHandler/LibraryHandler').mpd_track} track 
         */
        function onTrackInfoUpdate(track) {
            if(track) {
                setTrack({
                    artist: track.artists[0].name,
                    album: track.album.name,
                    track: track.name
                });
            } else {
                setTrack({
                    artist: null,
                    album: null,
                    track: null
                });
            }
        }
        MopidyHandler.playback.on("trackInfoUpdated", onTrackInfoUpdate);

        const onPlaybackStateChanged = setPlaybackState.bind(this);
        MopidyHandler.playback.on("playbackStateChanged", onPlaybackStateChanged);

        // return clean up function
        return () => {
            MopidyHandler.playback.removeListener("trackInfoUpdated", onTrackInfoUpdate);
            MopidyHandler.playback.removeListener("playbackStateChanged", onPlaybackStateChanged);
        }
    }, []); // prevents call on each render

    return (
        <AppBar {...props} ref={ref} position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <ButtonGroup>
                    <PlaybackButton cmd="previous">
                        <SkipPrevious/>
                    </PlaybackButton>
                    <PlaybackButton cmd={playbackState === "playing" ? "pause" : "resume"}>
                        {playbackState === "playing" ? <Pause/> : <PlayArrow/>}
                    </PlaybackButton>
                    <PlaybackButton cmd="next">
                        <SkipNext/>
                    </PlaybackButton>
                </ButtonGroup>
                <Box flexGrow={2}>
                    <Typography variant="body1" color="inherit">{track.track}</Typography>
                    <Typography variant="body2" color="inherit">{track.artist}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default PlaybackCtrlBar;