import React from "react";
import { connect } from "react-redux";

import selectTracklistTracks from "Selectors/selectTracklistTracks";

import { PlaybackActions } from "Actions";

import { VirtualizedList } from "Components";

import TracklistTrack from "./TracklistTrack";

/**
 * @param {Object} props
 * @param {import("ViewModel/Track").Track[]} props.tracks 
 * @param {Function} props.onTrackClick
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {import("ViewModel/Track").Track} props.playbackTrack
 * @param {"auto"|"full"} props.height
 */
const Tracklist = ({tracks, onTrackClick, playbackTrack, height}) => {

    const renderFunction = ({index, style, data}) => (
        <TracklistTrack
            key={index}
            style={style}
            track={data[index]}
            onClick={() => {onTrackClick(data[index], data, data[index]._uri === playbackTrack._uri)}}
        />
    );

    return (
        <VirtualizedList
            disableHeight={height === "auto" ? false : true}
            itemData={tracks}
            itemHeight={60}
            itemRenderFunction={renderFunction}
        />
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