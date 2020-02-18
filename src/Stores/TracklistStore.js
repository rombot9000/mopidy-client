import { EventEmitter } from "events";

import Dispatcher from "Dispatcher";
import { TRACKLIST_ACTIONS } from "Actions/TracklistActions"

import {Track} from "ViewModel";

class TracklistStore extends EventEmitter {
    constructor() {
        super();
    
        /** @type {mpd_tracklist} */
        this._currentTracklist = [];
        /** @type {import('./LibraryHandler').mpd_album} */
        this._currentAlbum = null;
    }

    /**
     * Init handler when server is online
     */
    init() {
        //this._getTracklist();
    }

    /**
     * 
     * @param {*} action 
     */
    async handleActions(action) {
        try {

            switch(action) {

                case TRACKLIST_ACTIONS.SET:
                break;

                default:
            }

        } catch(exception) {

            console.error("Caught exception", exception);
        
        }
    }

        /**
     * 
     * @param {string} uri
     * @returns {number} id of tracklist item
     */
    getTrackId(uri) {
        let tl_item = this._currentTracklist.find(ti => ti.track.uri === uri);

        if(tl_item == null) throw new Error(`Track with uri ${uri} not in current tracklist!`);

        return tl_item.tlid;
    }

    /**
     * Get current tracklist
     * @readonly
     * @type {mpd_tracklist}
     */
    get currentTracklist() {
        return this._currentTracklist.map(tl_track => Track(tl_track.track));;
    }
}

const tracklistStore = new TracklistStore();
Dispatcher.register(tracklistStore.handleActions.bind(tracklistStore));
export default tracklistStore