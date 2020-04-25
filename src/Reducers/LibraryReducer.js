import { LIBRARY_ACTIONS } from "Actions/LibraryActions";

const emptyLibrary = {
    albums: [],
    albumSortKey: undefined,
    filterToken: undefined
}

export default (library = emptyLibrary, action) => {
    switch (action.type) {
        case LIBRARY_ACTIONS.SET_ALBUMS:
            return {
                ...library, 
                albums: action.albums, 
                albumSortKey: action.albumSortKey,
            };
        
        case LIBRARY_ACTIONS.SET_FILTER:
            return {
                ...library,
                filterToken: action.token
            };
        
        case LIBRARY_ACTIONS.SET_SORT_KEY:
            return {
                ...library,
                albumSortKey: action.albumSortKey
            };

        default:
            return library;
    }
};