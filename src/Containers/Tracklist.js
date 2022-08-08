import React from "react";
import { connect } from "react-redux";

import selectTracklistTracks from "Selectors/selectTracklistTracks";

import { PlaybackActions } from "Actions";

import { GridList } from "Components";

import TracklistItem from "./TracklistItem";

/**
 * @param {Object} props
 * @param {import("ViewModel/Track").TracklistItem[]} props.items 
 * @param {Function} props.onTrackClick
 * @param {import("ViewModel/Track").Track} props.playbackTrack
 * @param {boolean} props.scrollToActive
 */
const Tracklist = ({items, onTrackClick, playbackTrack, scrollToActive, ...forwardProps}) => {

    return (
        <GridList spacing={1} divider {...forwardProps}>
            {items.map((item, index) => (
                <TracklistItem
                    key={index}
                    item={item}
                    onClick={() => {
                        onTrackClick(item, items, item.track._uri === playbackTrack._uri)
                    }}
                    scrollToIfActive={scrollToActive}
                />
            ))}
        </GridList>
    );
};

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    items: selectTracklistTracks(state),
    playbackTrack: state.playback.track,
});

const mapDispatchToProps = (dispatch) => ({
    onTrackClick: (item, items, isActive) => dispatch(isActive ? PlaybackActions.toggle() : PlaybackActions.play(item.track, items))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);