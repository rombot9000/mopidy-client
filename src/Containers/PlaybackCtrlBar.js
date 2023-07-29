import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { AppBar, Toolbar, Box, ButtonGroup } from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious } from "@mui/icons-material";

import { PlaybackButton } from "Components";
import { PlaybackActions } from "Actions";
import { styledNoTextSelection } from "Styles";

import selectPlaybackTrack from "Selectors/selectPlaybackTrack";
import PlaybackPositionBar from "./PlaybackPositionBar";

const NoTextSelection = styledNoTextSelection(Typography);

const useStyles = makeStyles(theme => ({
    appbar: {
        top: 'auto',
        bottom: 0,
    },
    track: {
        fontWeight: "normal"
    },
    artist: {
        fontWeight: "normal"
    },
    slider: {
        position: "absolute",
        top: 0,
        transform: "translate(0,-100%)",
        padding: theme.spacing(0, 0.5),
        width: "100%",
        height: theme.spacing(0.5),
        zIndex: theme.zIndex["appBar"],
    },
    restrictSize: {
        overflowX: "hidden"
    },
}));

const PlaybackCtrlBar = React.forwardRef(({ onNext, onPrev, onPlay, playbackState, playbackTrack, ...appBarProps }, ref) => {
    const classes = useStyles();
    return (
        <AppBar {...appBarProps} ref={ref} position="fixed" color="primary" className={classes.appbar}>
            <div className={classes.slider}>
                <PlaybackPositionBar/>
            </div>
            <Toolbar >
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
                <Box flexGrow={2} className={classes.restrictSize}>
                    <NoTextSelection className={classes.track} variant="subtitle1" color="inherit" noWrap>{playbackTrack.name}</NoTextSelection>
                    <NoTextSelection className={classes.artist} variant="subtitle2" color="inherit" noWrap>{playbackTrack.artistName}</NoTextSelection>
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