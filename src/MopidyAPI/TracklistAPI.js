/**
 * Mopidy tracklist item
 * @typedef mpd_tracklist_item
 * @property {string} _model_
 * @property {number} tlid
 * @property {import('./LibraryHandler').mpd_track} track
 */

/**
 * Mopidy tracklist object
 * @typedef {mpd_tracklist_item[]} mpd_tracklist
 */

/**
 * Handler for mopidy tracklist and playback API
 */
class TracklistHandler {
    /**
     * @param {import('mopidy')} mopidy 
     */
    constructor(mopidy) {
        this._mopidy = mopidy;

        /** @type {mpd_tracklist} */
        this._currentTracklist = [];
        /** @type {import('./LibraryHandler').mpd_album} */
        this._currentAlbum = null;
        
        // handle events
        this._mopidy.on("event", this._onEvent.bind(this));
    }

    /**
     * Init handler when server is online
     */
    init() {
        this._getTracklist();
    }

    /**
     * @param {string} event 
     * @param {any} args 
     */
    _onEvent(event, args) {

        const [,eventType] = event.split(':');

        switch(eventType) {
            case "tracklistChanged":
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
        this._currentTracklist = await this._mopidy.tracklist.getTlTracks({});
    }
    
    /**
     * Sets tracklist on server to album
     * Does nothing if album is already set
     * @param {string[]} uris
     */
    async set(uris) {
        
        await this._mopidy.tracklist.clear({})
        
        this._currentTracklist = await this._mopidy.tracklist.add({
            "tracks": null,
            "at_position": null,
            "uris": uris
        });
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
};

export default TracklistHandler;