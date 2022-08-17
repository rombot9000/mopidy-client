import { createSelector } from "reselect";

export default createSelector(
    [
        state => state.playback.track_uri,
        state => state.library.tracks
    ],
    /**
     * @param {string} track_uri
     * @param {import("Reducers/LibraryReducer").StoredTrack[]} storedTracks
     */
    (track_uri, storedTracks) => {

        return storedTracks.find(t => t.uri === track_uri) || {};
    }
);