import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { AppBar, Toolbar, Box } from "@material-ui/core";

import { ButtonGroup } from "@material-ui/core";
import { PlayArrow, Pause, SkipNext, SkipPrevious } from "@material-ui/icons";

import { TimePositionBar, PlaybackButton } from "Components";

import { PlaybackActions } from "Actions";

const useStyles = makeStyles(theme => ({
    appbar: {
        top: 'auto',
        bottom: 0,
    },
    slider: {
        position: "absolute",
        top: 0,
        transform: "translate(0,-100%)",
        padding: theme.spacing(0, 0.5),
        width: "100%",
        height: theme.spacing(0.5),
        zIndex: theme.zIndex["appBar"],
    }
}));

const PlaybackCtrlBar = React.forwardRef(({ onNext, onPrev, onPlay, playbackState, playbackTrack, ...appBarProps }, ref) => {
    const classes = useStyles();
    return (
        <AppBar {...appBarProps} ref={ref} position="fixed" color="primary" className={classes.appbar}>
            <div className={classes.slider}>
                <TimePositionBar/>
            </div>
            <Toolbar>
                <ButtonGroup>
                    <PlaybackButton onClick={onPrev}>
                        <SkipPrevious/>
                    </PlaybackButton>
                    <PlaybackButton onClick={onPlay}>
                        {playbackState === "playing" ? <Pause/> : <PlayArrow/>}
                    </PlaybackButton>
                    <PlaybackButton onClick={onNext}>
                        <SkipNext/>
                    </PlaybackButton>
                </ButtonGroup>
                <Box flexGrow={2}>
                    <Typography variant="body1" color="inherit">{playbackTrack.name}</Typography>
                    <Typography variant="body2" color="inherit">{playbackTrack.artist}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
});

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    playbackState: state.playback.state,
    playbackTrack: state.playback.track
});

const mapDispatchToProps = (dispatch) => ({
    onPrev: () => dispatch(PlaybackActions.previous()),
    onPlay: () => dispatch(PlaybackActions.toggle()),
    onNext: () => dispatch(PlaybackActions.next()),
});

const options = {
    forwardRef: true
}

export default connect(mapStateToProps, mapDispatchToProps, null, options)(PlaybackCtrlBar);