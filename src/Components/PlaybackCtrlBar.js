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
 */
function PlaybackButton(props) {

    // remove warning msg
    const { to, fullWidth, children, ...filteredProps } = props;
    filteredProps.fullwidth = props.fullWidth.toString();
    
    return (
        <IconButton {...filteredProps} color="secondary">
            {children}
        </IconButton>
    );
};

const PlaybackCtrlBar = React.forwardRef((props, ref) => {
    const classes = useStyles();

    const [track, setTrack] = React.useState(MopidyHandler.currentTrack);
    const [playbackState, setPlaybackState] = React.useState(MopidyHandler.playback.state);
   
    React.useEffect(() => {
        const handleTrackInfoUpdate = setTrack.bind(this);
        MopidyHandler.playback.on("trackInfoUpdated", handleTrackInfoUpdate);

        const handlePlaybackStateChanged = setPlaybackState.bind(this);
        MopidyHandler.playback.on("playbackStateChanged", handlePlaybackStateChanged);

        // return clean up function
        return () => {
            MopidyHandler.playback.removeListener("trackInfoUpdated", handleTrackInfoUpdate);
            MopidyHandler.playback.removeListener("playbackStateChanged", handlePlaybackStateChanged);
        }
    }, []); // prevents call on each render

    return (
        <AppBar {...props} ref={ref} position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <ButtonGroup>
                    <PlaybackButton onClick={() => MopidyHandler.previous()}>
                        <SkipPrevious/>
                    </PlaybackButton>
                    <PlaybackButton onClick={() => MopidyHandler.togglePlayback()}>
                        {playbackState === "playing" ? <Pause/> : <PlayArrow/>}
                    </PlaybackButton>
                    <PlaybackButton onClick={() => MopidyHandler.next()}>
                        <SkipNext/>
                    </PlaybackButton>
                </ButtonGroup>
                <Box flexGrow={2}>
                    <Typography variant="body1" color="inherit">{track.name}</Typography>
                    <Typography variant="body2" color="inherit">{track.artist}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default PlaybackCtrlBar;