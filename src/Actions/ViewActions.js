import Dispatcher from "Dispatcher";

export const VIEW_ACTIONS = {
    OPEN_ALBUM_DETAILS_MODAL: "viewActions.OpenAlbumDetailsModal"
};

export function openAlbumDetailsModal(album) {
    Dispatcher.dispatch({
        type: VIEW_ACTIONS.OPEN_ALBUM_DETAILS_MODAL,
        album: album
    });
};

