import React from "react";
import { connect } from "react-redux";

import { PlaybackActions } from "Actions";

import { VirtualizedList } from "Components";

import TracklistItem from "Components/TracklistItem";

/**
 * @param {Object} props
 * @param {import("ViewModel/Track").Track[]} props.tracks 
 * @param {Function} props.onTrackClick
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {import("ViewModel/Track").Track} props.playbackTrack
 * @param {"auto"|"full"} props.height
 */
const Tracklist = ({tracks, onTrackClick, playbackState, playbackTrack, playbackTimePosition, height}) => {

    const renderFunction = ({index, style, data}) => (
        <TracklistItem
            key={index}
            style={style}
            track={data[index]}
            playbackState={data[index]._uri === playbackTrack._uri ? playbackState : "stopped"}
            playbackTimePosition={playbackTimePosition}
            onClick={() => {onTrackClick(data[index], data, data[index]._uri === playbackTrack._uri)}}
        />
    );

    return (
        <VirtualizedList
            disableHeight={height === "auto" ? false : true}
            itemData={tracks}
            itemHeight={35}
            itemRenderFunction={renderFunction}
        />
    );
};

/**
 * @param {import("Reducers/PlaybackReducer").PlaybackState} playbackState
 */
function extrapolateTimePosition(playbackState) {

    if(playbackState !== "playing" ) return playbackState.timePosition;

    return playbackState.timePosition + Date.now() - playbackState.timePositionUpdated;
    
}

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    playbackState: state.playback.state,
    playbackTrack: state.playback.track,
    playbackTimePosition: extrapolateTimePosition(state.playback)
});

const mapDispatchToProps = (dispatch) => ({
    onTrackClick: (track, tracks, isActive) => dispatch(isActive ? PlaybackActions.toggle() : PlaybackActions.play(track, tracks))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);