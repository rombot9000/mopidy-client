import { EventEmitter } from "events";

import Dispatcher from "Dispatcher";
import { TRACKLIST_ACTIONS } from "Actions/TracklistActions"

class TracklistStore extends EventEmitter {
    constructor() {
        super();

        /** @type {import("ViewModel/Track").Track[]} */
        this._tracks = [];
    }

    /**
     * 
     * @param {*} action 
     */
    async handleActions(action) {
        try {

            switch(action.type) {

                case TRACKLIST_ACTIONS.INIT:
                case TRACKLIST_ACTIONS.UPDATE:
                    this._tracks = action.tracks
                    this.emit("update");
                break;
                
                case TRACKLIST_ACTIONS.SET:
                default:
            }

        } catch(exception) {

            console.error("Caught exception", exception);
        
        }
    }

    /**
     * Get current tracklist
     * @readonly
     * @type {import("ViewModel/Track").Track[]}
     */
    get tracks() {
        return this._tracks;
    }
}

const tracklistStore = new TracklistStore();
Dispatcher.register(tracklistStore.handleActions.bind(tracklistStore));
export default tracklistStore