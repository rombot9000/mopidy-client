import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { AppBar, Toolbar, Box, ButtonGroup } from "@material-ui/core";

import { PlayArrow, Pause, SkipNext, SkipPrevious } from "@material-ui/icons";

import { PlaybackButton } from "Components";
import PlaybackPositionBar from "./PlaybackPositionBar";

import { PlaybackActions } from "Actions";

import selectPlaybackTrack from "Selectors/selectPlaybackTrack";

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
    console.log(playbackTrack);
    return (
        <AppBar {...appBarProps} ref={ref} position="fixed" color="primary" className={classes.appbar}>
            <div className={classes.slider}>
                <PlaybackPositionBar/>
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
                    <Typography variant="body2" color="inherit">{playbackTrack.artist.name}</Typography>
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
    playbackTrack: selectPlaybackTrack(state)
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