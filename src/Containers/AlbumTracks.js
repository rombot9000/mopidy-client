import React from "react";
import { connect } from "react-redux";

import { PlaybackActions } from "Actions";

import { GridList } from "Components";

import AlbumTrack from "./AlbumTrack";

/**
 * @param {Object} props
 * @param {import("ViewModel/Album").Album} props.album 
 * @param {Function} props.onTrackClick
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {import("ViewModel/Track").Track} props.playbackTrack
 */
const AlbumTracks = ({album, onTrackClick, playbackTrack}) => {
    return (
        <GridList>
            {album.tracks.map((track, index) => (
                <AlbumTrack
                    key={index}
                    track={track}
                    onClick={() => {
                        onTrackClick(track, album.tracks, track._uri === playbackTrack._uri)
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
    playbackTrack: state.playback.track,
});

const mapDispatchToProps = (dispatch) => ({
    onTrackClick: (track, tracks, isActive) => dispatch(isActive ? PlaybackActions.toggle() : PlaybackActions.play(track, tracks))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumTracks);