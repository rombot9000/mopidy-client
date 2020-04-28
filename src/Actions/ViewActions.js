import { ACTION_TYPES } from ".";

export const VIEW_ACTIONS = {
    TOGGLE_SETTINGS_MENU:       0,
    TOGGLE_MENU_DRAWER:         1,
    TOGGLE_ALBUM_DETAILS_MODAL: 2
};

/**
 * 
 * @param {import("ViewModel/Album").Album} album 
 */
export function togggleAlbumDetailsModal(album) {
    return {
        type: ACTION_TYPES.VIEW_ACTION,
        case: VIEW_ACTIONS.TOGGLE_ALBUM_DETAILS_MODAL,
        album: album
    }
};

export function toggleMenuDrawer() {
    return {
        type: ACTION_TYPES.VIEW_ACTION,
        case: VIEW_ACTIONS.TOGGLE_MENU_DRAWER
    }
};

export function toggleSettingModal() {
    return {
        type: ACTION_TYPES.VIEW_ACTION,
        case: VIEW_ACTIONS.TOGGLE_SETTINGS_MENU
    }
}