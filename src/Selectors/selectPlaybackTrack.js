import { createSelector } from "reselect";

export default createSelector(
    [
        state => state.playback.track,
        state => state.library.tracks,
        state => state.library.artists,
        state => state.library.albums,
    ],
    /**
     * @param {import("Reducers/LibraryReducer").StoredTrack} playbackTrack
     * @param {import("Reducers/LibraryReducer").StoredTrack[]} storedTracks
     * @param {import("Reducers/LibraryReducer").StoredAlbum[]} storedAlbums
     * @param {import("Reducers/LibraryReducer").StoredArtist[]} storedArtists
     */
    (playbackTrack, storedTracks, storedAlbums, storedArtists) => {
        /** @type {import("Reducers/LibraryReducer").StoredTrack} */
        let track = {...storedTracks.find(t => t.uri === playbackTrack.uri)};
        track.album = storedAlbums.find(a => a.uri === playbackTrack.album_uri) || {};
        track.artist = storedArtists.find(a => a.uri === playbackTrack.artist_uri) || {};

        return track;
    }
);