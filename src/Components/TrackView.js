import React from "react";

import VirtualizedList from "./VirtualizedList";

import TrackViewItem from "./TrackViewItem";

/** 
 * @param {Function} props.onTrackClick
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {import("Reducers/LibraryReducer").StoredTrack} props.playbackTrack
 */
     

 const TrackView = ({artists, albums, tracks, ...forwardProps}) => {
    
    return (
        <VirtualizedList
            {...forwardProps}
            itemData={tracks}
            itemHeight={35}
            listItem={TrackViewItem}
        />
    );
};

export default TrackView;