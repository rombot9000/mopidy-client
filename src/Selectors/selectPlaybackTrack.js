import { createSelector } from "reselect";

export default createSelector(
    [
        state => state.playback.track,
        state => state.library.tracks
    ],
    /**
     * @param {import("ViewModel/Track").Track} playbackTrack
     * @param {import("ViewModel/Track").Track[]} libraryTracks
     */
    (playbackTrack, libraryTracks) => libraryTracks.find(lbt => lbt._uri === playbackTrack._uri) || playbackTrack
);