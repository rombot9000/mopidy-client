import React from "react";
import { connect } from "react-redux";

import { VirtualizedList } from "Components";

import TrackViewItem from "./TrackViewItem";

/** 
 * @param {Function} props.onTrackClick
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {import("ViewModel/Track").Track} props.playbackTrack
 */
     

 const TrackView = ({artists, albums, tracks, ...forwardProps}) => {
    
    const renderFunction = ({index, style, data}) => (
        <TrackViewItem
            key={index}
            style={style}
            track={data[index]}
            // onClick={() => {onTrackClick(data[index], data, data[index]._uri === playbackTrack._uri)}}
        />
    );

    return (
        <VirtualizedList
            {...forwardProps}
            itemData={tracks}
            itemHeight={35}
            itemRenderFunction={renderFunction}
        />
    );
};

const mapStateToProps = (state) => ({
    artists: state.library.artists,
    albums: state.library.artists,
    tracks: state.library.tracks
});

export default connect(mapStateToProps)(TrackView);