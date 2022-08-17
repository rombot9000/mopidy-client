import React from "react";
import { connect } from "react-redux";

import selectTracklistTracks from "Selectors/selectTracklistTracks";

import { GridList } from "Components";

import TracklistItem from "./TracklistItem";

/**
 * @param {Object} props
 * @param {import("Reducers/TracklistReducer").StoredTracklistItem[]} props.items 
 * @param {Function} props.onTrackClick
 * @param {import("Reducers/LibraryReducer").StoredTrack").StoredTrack").StoredTrack} props.playbackTrack
 * @param {boolean} props.scrollToActive
 * @param {*} props.dispatch Filter out redux dispatch from forwardProps
 */
const Tracklist = ({items, onTrackClick, playbackTrack, scrollToActive, dispatch, ...gridProps}) => {

    return (
        <GridList spacing={1} divider {...gridProps}>
            {items.map((item, index) => (
                <TracklistItem
                    key={index}
                    item={item}
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

export default connect(mapStateToProps)(Tracklist);