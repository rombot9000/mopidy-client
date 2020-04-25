import Dispatcher from "Dispatcher";

export const VIEW_ACTIONS = {
    OPEN_ALBUM_DETAILS_MODAL: "viewActions.OpenAlbumDetailsModal",
    TOGGLE_MENU_DRAWER: "viewActions.ToggleMenuDrawer",
    OPEN_SETTINGS_MODAL: "viewActions.OpenSettingsModal"
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
    return {
        type: VIEW_ACTIONS.OPEN_ALBUM_DETAILS_MODAL,
        album: album
    }
};

export function toggleMenuDrawer() {
    Dispatcher.dispatch({
        type: VIEW_ACTIONS.TOGGLE_MENU_DRAWER
    });
    return {
        type: VIEW_ACTIONS.TOGGLE_MENU_DRAWER
    }
};

export function openSettingsModal() {
    Dispatcher.dispatch({
        type: VIEW_ACTIONS.OPEN_SETTINGS_MODAL
    });
    return {
        type: VIEW_ACTIONS.OPEN_SETTINGS_MODAL
    }
}