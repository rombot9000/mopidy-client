import { LibraryActions } from "Actions";

const emptyLibrary = {
    albums: [],
    albumSortKey: undefined,
    filterToken: ""
}

export default (library = emptyLibrary, action) => {
    switch (action.type) {
        case LibraryActions.LIBRARY_ACTIONS.SET_ALBUMS:
            return {
                ...library, 
                albums: action.albums, 
                albumSortKey: action.albumSortKey,
            };
        
        case LibraryActions.LIBRARY_ACTIONS.SET_FILTER:
            return {
                ...library,
                filterToken: action.token
            };
        
        case LibraryActions.LIBRARY_ACTIONS.SET_SORT_KEY:
            return {
                ...library,
                albumSortKey: action.albumSortKey
            };

        default:
            return library;
    }
};