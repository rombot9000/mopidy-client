import React from "react";
import { connect } from "react-redux";

import { PlaybackActions } from "Actions";

import { VirtualizedList } from "Components";

import AlbumTrack from "./AlbumTrack";

/**
 * @param {Object} props
 * @param {import("ViewModel/Album").Album} props.album 
 * @param {Function} props.onTrackClick
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {import("ViewModel/Track").Track} props.playbackTrack
 * @param {"auto"|"full"} props.height
 */
const AlbumTracks = ({album, onTrackClick, playbackTrack, height}) => {

    const renderFunction = ({index, style, data}) => (
        <AlbumTrack
            key={index}
            style={style}
            track={data[index]}
            onClick={() => {onTrackClick(data[index], data, data[index]._uri === playbackTrack._uri)}}
        />
    );

    return (
        <VirtualizedList
            disableHeight={height === "auto" ? false : true}
            itemData={album.tracks}
            itemHeight={35}
            itemRenderFunction={renderFunction}
        />
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