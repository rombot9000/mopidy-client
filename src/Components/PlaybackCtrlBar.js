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

    const [currentTrack, setCurrentTrack] = React.useState(PlaybackStore.track);
    const [playbackState, setPlaybackState] = React.useState(PlaybackStore.state);
    React.useEffect(() => {

        const handleTrackUpdate = () => { setCurrentTrack(PlaybackStore.track) };
        PlaybackStore.on("update:track", handleTrackUpdate);

        const handleStateUpdate = () => { setPlaybackState(PlaybackStore.state) };
        PlaybackStore.on("update:state", handleStateUpdate);

        // return clean up method
        return () => {
            PlaybackStore.removeListener("update:track", handleTrackUpdate);
            PlaybackStore.removeListener("update:state", handleStateUpdate);
        }
        
    }, []); // prevents call on each render

    console.log(currentTrack);

    return (
        <AppBar {...props} ref={ref} position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <ButtonGroup>
                    <PlaybackButton onClick={() => PlaybackActions.previous()}>
                        <SkipPrevious/>
                    </PlaybackButton>
                    <PlaybackButton onClick={() => PlaybackActions.toggle()}>
                        {playbackState === "playing" ? <Pause/> : <PlayArrow/>}
                    </PlaybackButton>
                    <PlaybackButton onClick={() => PlaybackActions.next()}>
                        <SkipNext/>
                    </PlaybackButton>
                </ButtonGroup>
                <Box flexGrow={2}>
                    <Typography variant="body1" color="inherit">{currentTrack.name}</Typography>
                    <Typography variant="body2" color="inherit">{currentTrack.artist}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default PlaybackCtrlBar;