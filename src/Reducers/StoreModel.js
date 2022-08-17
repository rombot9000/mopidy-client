/**
 * @typedef {Object} State
 * @property {import("./LibraryReducer").LibraryState} library
 * @property {import("./NetworkReducer").NetworkState} network
 * @property {import("./NotifyReducer").NotifyState} notify
 * @property {import("./ViewReducer").ViewState} view
 * @property {import("./TracklistReducer").TracklistState} tracklist
 * @property {import("./PlaybackReducer").PlaybackState} playback
 */

/** @returns {StoredArtist} */
export const EmptyArtist = () => {
    return {
        uri: null,
        name: null,
        album_uris: []
    }
};

/** @returns {StoredAlbum} */
export const EmptyAlbum = () => {
    return {
        uri: null,
        name: null,
        artistName: null,
        year: null,
        length: null,
        artist_uri: null,
        track_uris: [],
        cover_uri: null
    }
};

/** @returns {StoredTrack} */
export const EmptyTrack = () => {
    return {
        uri: null,
        name: null,
        albumName: null,
        artistName: null,
        disc_no: null,
        track_no: null,
        year: null,
        length: null,
        artist_uri: null,
        album_uri: null
    }
};