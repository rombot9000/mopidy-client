import { createSelector } from "reselect";

export default createSelector(
    [
        state => state.tracklist.items,
        state => state.library.tracks
    ],
    /**
     * @param {import("Reducers/TracklistReducer").StoredTracklistItem[]} tracklistItems
     * @param {import("Reducers/LibraryReducer").StoredTrack[]} storedTracks
     */
    (tracklistItems, storedTracks) => {
        return tracklistItems.map(item => {
            return {
                tlid: item.tlid,
                track: storedTracks.find(t => t.uri === item.track_uri) || {}
            };
        }) 
    }
);