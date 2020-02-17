import { EventEmitter } from "events";

import Dispatcher from "Dispatcher";
import { LIBRARY_ACTIONS } from "Actions/LibraryActions"

import Mopidy from "Mopidy";

class LibraryStore extends EventEmitter {
    constructor() {
        super();
    }

    async init() {

    }

    handleActions(action) {
        
    }

    /**
     * Wrapper for mopidy.library.browse
     * @param {string} uri
     * @returns {Promise.<mpd_ref[]>}
     */
    async browse(uri) {
        return Mopidy.library.browse({"uri": uri});
    }

    /**
     * Wrapper for mopidy.library.lookup
     * @param {string[]} uris
     * @returns {Promise.<Object.<string,mpd_track[]>>}
     */
    async lookup(uris) {
        return Mopidy.library.lookup({"uris": uris});
    }

    /**
     * Wrapper for mopidy.library.getImages
     * @param {string[]} uris
     * @returns {Promise.<Object.<string,mpd_image[]>>}
     */
    async getImages(uris) {
        return Mopidy.library.getImages({"uris": uris});
    }
}

const libraryStore = new LibraryStore();
Dispatcher.register(libraryStore.handleActions.bind(libraryStore));
export default libraryStore;