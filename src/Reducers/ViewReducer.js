import { ACTION_TYPES, VIEW_ACTIONS } from "Actions";

/**
 * @typedef ViewState
 * @property {boolean} menuDrawerOpen 
 * @property {boolean} albumDetailsModalOpen 
 * @property {import("ViewModel/Album").Album} albumDetailsAlbum 
 * @property {boolean} settingsMenuOpen 
 */

 /** @type {ViewState} */
const initialState = {
    menuDrawerOpen: false,
    albumDetailsModalOpen: false,
    albumDetailsAlbum: undefined,
    settingsMenuOpen: false
}

/**
 * @param {ViewState} state
 * @param {import("Actions").ViewAction} action
 * @returns {ViewState}
 */
const ViewReducer = (state = initialState, action) => {
    
    if(action.type !== ACTION_TYPES.VIEW_ACTION) return state;

    switch (action.case) {
        case VIEW_ACTIONS.TOGGLE_MENU_DRAWER:
            return {
                ...state,
                menuDrawerOpen: !state.menuDrawerOpen
            };
        
        case VIEW_ACTIONS.TOGGLE_ALBUM_DETAILS_MODAL:
            return {
                ...state,
                albumDetailsModalOpen: !state.albumDetailsModalOpen,
                albumDetailsAlbum: action.album
            };

        case VIEW_ACTIONS.TOGGLE_SETTINGS_MENU:
            return {
                ...state,
                settingsMenuOpen: !state.settingsMenuOpen
            };

        default:
            return state;
    }
};

export default ViewReducer;