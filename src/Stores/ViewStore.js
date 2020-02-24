import { EventEmitter } from "events";

import { VIEW_ACTIONS } from "Actions/ViewActions";

import { Album } from "ViewModel";

export default class ViewStore extends EventEmitter {
    constructor() {
        super();

        /** @type {import("ViewModel/Album").Album} */
        this._detailsModalAlbum = Album(null);
    }

    handleAction(action) {
        switch(action.type) {
            case VIEW_ACTIONS.OPEN_ALBUM_DETAILS_MODAL:
                this._detailsModalAlbum = action.album;
                this.emit("openAlbumDetailsModal");
            break;

            case VIEW_ACTIONS.TOGGLE_MENU_DRAWER:
                this.emit("toggleMenuDrawer")
            break;

            default:
        }
    }

    /**
     * @readonly
     * @type {import("ViewModel/Album").Album}
     */
    get detailsModalAlbum() {
        return this._detailsModalAlbum;
    }
}