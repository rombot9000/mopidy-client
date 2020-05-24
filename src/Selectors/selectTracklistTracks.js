import { createSelector } from "reselect";

export default createSelector(
    [
        state => state.tracklist.tracks,
        state => state.library.tracks
    ],
    /**
     * @param {import("ViewModel/Track").Track[]} tracklistTracks
     * @param {import("ViewModel/Track").Track[]} libraryTracks
     */
    (tracklistTracks, libraryTracks) => {
        return tracklistTracks.map(tlt => libraryTracks.find(lbt => lbt._uri === tlt._uri) || tlt)
    }
);