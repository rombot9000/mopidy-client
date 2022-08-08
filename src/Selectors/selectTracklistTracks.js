import { createSelector } from "reselect";

export default createSelector(
    [
        state => state.tracklist.items,
        state => state.library.tracks
    ],
    /**
     * @param {import("ViewModel/Track").TracklistItem[]} tracklistItems
     * @param {import("ViewModel/Track").Track[]} libraryTracks
     */
    (tracklistItems, libraryTracks) => {
        return tracklistItems.map(item => {
            return {
                tlid: item.tlid,
                track: libraryTracks.find(t => t._uri === item.track._uri) || item.track
            };
        }) 
    }
);