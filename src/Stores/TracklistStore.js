import { EventEmitter } from "events";

import Dispatcher from "Dispatcher";
import { TRACKLIST_ACTIONS } from "Actions/TracklistActions"

import Mopidy from "Mopidy";

class TracklistStore extends EventEmitter {
    constructor() {
        super();
    
        /** @type {mpd_tracklist} */
        this._currentTracklist = [];
        /** @type {import('./LibraryHandler').mpd_album} */
        this._currentAlbum = null;
        
        // handle events
        Mopidy.on("event", this._onEvent.bind(this));
    }

    /**
     * Init handler when server is online
     */
    init() {
        this._getTracklist();
    }

    /**
     * 
     * @param {*} action 
     */
    async handleActions(action) {
        try {

            switch(action) {

                case TRACKLIST_ACTIONS.SET:
                    await Mopidy.tracklist.clear({});
                    this._currentTracklist = await Mopidy.tracklist.add({
                        "tracks": null,
                        "at_position": null,
                        "uris": action.uris
                    });
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
        return this._currentTracklist;
    }

    /**
     * @param {string} event 
     * @param {any} args 
     */
    _onEvent(event, args) {

        switch(event) {
            case "event:tracklistChanged":
                this._getTracklist();
            break;
            
            default:
                // console.debug("Event not handled here:", eventType);
                // console.debug(args);
                break;
        }
    }

    /**
     * Get current tracklist from server and store in member var
     */
    async _getTracklist() {
        this._currentTracklist = await Mopidy.tracklist.getTlTracks({});
    }
}

const tracklistStore = new TracklistStore();
Dispatcher.register(tracklistStore.handleActions.bind(tracklistStore));
export default tracklistStore