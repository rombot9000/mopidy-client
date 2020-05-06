import { ACTION_TYPES, LIBRARY_ACTIONS } from "Actions";

/**
 * @typedef {Object} LibraryState
 * @property {import("ViewModel/Album").Album[]} albums
 * @property {import("ViewModel/Artist").Artist[]} artists
 * @property {import("ViewModel/Track").Track[]} tracks
 * @property {string} albumSortKey
 * @property {string} filterToken
 */

 /** @type {LibraryState} */
const initialState = {
    artists: [],
    albums: [],
    tracks: [],
    albumSortKey: undefined,
    filterToken: undefined
}

/**
 * @param {LibraryState} state
 * @param {import("Actions").LibraryAction} action
 * @returns {LibraryState}
 */
export default (state = initialState, action) => {

    if(action.type !== ACTION_TYPES.LIBRARY_ACTION) return state;

    switch (action.case) {
        case LIBRARY_ACTIONS.INIT:
            return {
                ...state, 
                artists: action.artists,
                albums: action.albums, 
                tracks: action.tracks,
                albumSortKey: action.albumSortKey,
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
                albumSortKey: action.albumSortKey
            };

        default:
            return state;
    }
};