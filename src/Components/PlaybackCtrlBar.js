import React from "react";

import {makeStyles} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {AppBar, Toolbar, Box} from "@material-ui/core";

import {ButtonGroup, IconButton} from "@material-ui/core";
import {PlayArrow, Pause, SkipNext, SkipPrevious} from "@material-ui/icons";

import * as PlaybackActions from "Actions/PlaybackActions";
import PlaybackStore from "Stores/PlaybackStore";

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

    const [playbackInfo, setPlaybackInfo] = React.useState({
        state: PlaybackStore.state,
        track: PlaybackStore.track
    });
    React.useEffect(() => {

        const handlePlaybackUpdate = () => {
            setPlaybackInfo({
                state: PlaybackStore.state,
                track: PlaybackStore.track
            });
        };
        PlaybackStore.on("update", handlePlaybackUpdate);

        // return clean up method
        return () => {
            PlaybackStore.removeListener("update", handlePlaybackUpdate);
        }
        
    }, []); // prevents call on each render

    return (
        <AppBar {...props} ref={ref} position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <ButtonGroup>
                    <PlaybackButton onClick={() => PlaybackActions.previous()}>
                        <SkipPrevious/>
                    </PlaybackButton>
                    <PlaybackButton onClick={() => PlaybackActions.toggle()}>
                        {playbackInfo.state === "playing" ? <Pause/> : <PlayArrow/>}
                    </PlaybackButton>
                    <PlaybackButton onClick={() => PlaybackActions.next()}>
                        <SkipNext/>
                    </PlaybackButton>
                </ButtonGroup>
                <Box flexGrow={2}>
                    <Typography variant="body1" color="inherit">{playbackInfo.track.name}</Typography>
                    <Typography variant="body2" color="inherit">{playbackInfo.track.artist}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default PlaybackCtrlBar;