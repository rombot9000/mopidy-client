import Dispatcher from "Dispatcher";

export const VIEW_ACTIONS = {
    OPEN_ALBUM_DETAILS_MODAL: "viewActions.OpenAlbumDetailsModal",
    TOGGLE_MENU_DRAWER: "viewActions.ToggleMenuDrawer"
};

/**
 * 
 * @param {import("ViewModel/Album").Album} album 
 */
export function openAlbumDetailsModal(album) {
    Dispatcher.dispatch({
        type: VIEW_ACTIONS.OPEN_ALBUM_DETAILS_MODAL,
        album: album
    });
};

export function toggleMenuDrawer() {
    Dispatcher.dispatch({
        type: VIEW_ACTIONS.TOGGLE_MENU_DRAWER
    });
};