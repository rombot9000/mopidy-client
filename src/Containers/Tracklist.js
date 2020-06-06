import React from "react";
import { connect } from "react-redux";

import selectTracklistTracks from "Selectors/selectTracklistTracks";

import { PlaybackActions } from "Actions";

import { GridList } from "Components";

import TracklistTrack from "./TracklistTrack";

/**
 * @param {Object} props
 * @param {import("ViewModel/Track").Track[]} props.tracks 
 * @param {Function} props.onTrackClick
 * @param {import("ViewModel/Track").Track} props.playbackTrack
 */
const Tracklist = ({tracks, onTrackClick, playbackTrack, ...forwardProps}) => {
    return (
        <GridList spacing={1} divider {...forwardProps}>
            {tracks.map((track, index) => (
                <TracklistTrack
                    key={index}
                    track={track}
                    onClick={() => {
                        onTrackClick(track, tracks, track._uri === playbackTrack._uri)
                    }}
                />
            ))}
        </GridList>
    );
};

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    tracks: selectTracklistTracks(state),
    playbackTrack: state.playback.track,
});

const mapDispatchToProps = (dispatch) => ({
    onTrackClick: (track, tracks, isActive) => dispatch(isActive ? PlaybackActions.toggle() : PlaybackActions.play(track, tracks))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);