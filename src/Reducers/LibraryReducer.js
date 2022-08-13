import { ACTION_TYPES, LIBRARY_ACTIONS } from "Actions";

/** 
 * @typedef {object} StoredArtist
 * @property {string} uri
 * @property {string} name
 * @property {string[]} album_uris
 */

/** 
 * @typedef {object} StoredAlbum
 * @property {string} uri
 * @property {string} name
 * @property {string} year
 * @property {string} length
 * @property {string} artist_uri
 * @property {string[]} track_uris
 * @property {string} cover_uri
 */

/**
 * @typedef {object} StoredTrack
 * @property {string} uri
 * @property {string} name
 * @property {number} disc_no
 * @property {number} track_no
 * @property {string} artist_uri
 * @property {string} album_uri
 * @property {string} year
 * @property {number} length
 */

/**
 * @typedef {Object} LibraryState
 * @property {StoredAlbum[]} albums
 * @property {StoredArtist[]} artists
 * @property {StoredTrack[]} tracks
 * @property {string[]} albumSortKeys
 * @property {string} filterToken
 */

 /** @type {LibraryState} */
const initialState = {
    artists: [],
    albums: [],
    tracks: [],
    albumSortKeys: [],
    filterToken: undefined
}

/**
 * @param {LibraryState} state
 * @param {import("Actions").LibraryAction} action
 * @returns {LibraryState}
 */
const LibraryReducer = (state = initialState, action) => {

    if(action.type !== ACTION_TYPES.LIBRARY_ACTION) return state;

    switch (action.case) {
        case LIBRARY_ACTIONS.INIT:
            return {
                ...state, 
                artists: action.artists,
                albums: action.albums, 
                tracks: action.tracks,
                albumSortKeys: action.albumSortKeys || [],
            };

        case LIBRARY_ACTIONS.FETCH:
            return {
                ...state, 
                artists: action.artists,
                albums: action.albums,
                tracks: action.tracks
            };
        
        case LIBRARY_ACTIONS.SET_FILTER:
            return {
                ...state,
                filterToken: action.token
            };
        
        case LIBRARY_ACTIONS.SET_SORT_KEY:
            return {
                ...state,
                albumSortKeys: action.albumSortKeys || []
            };

        default:
            return state;
    }
};

export default LibraryReducer;