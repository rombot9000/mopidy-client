import BaseAPI from "./BaseAPI";

/**
 * Mopidy tracklist item
 * @typedef mpd_tracklist_item
 * @property {string} _model_
 * @property {number} tlid
 * @property {import('./LibraryAPI').mpd_track} track
 */

/**
 * Mopidy tracklist object
 * @typedef {mpd_tracklist_item[]} mpd_tracklist
 */

/**
 * Handler for mopidy tracklist API
 */
export default class TracklistAPI extends BaseAPI {
    /**
     * @param {import('mopidy')} mopidy 
     */
    constructor(mopidy) {
        super(mopidy, "tracklist");

        /** @type {mpd_tracklist} */
        this._tracklist = [];
    }

    /**
     * Ifetch tracklist info from server
     */
    async fetch() {
        await this._initApi();

        this._tracklist = await this._api.getTlTracks({});

        return this.tracklist;
    }

    
    /**
     * Sets tracklist on server to album
     * Does nothing if album is already set
     * @param {import("Reducers/LibraryReducer").StoredTrack[]} tracks
     */
    async set(tracks) {

        if(!this.clear()) return;
        
        return await this.add(tracks);
    }   


    /**
     * Clears current tracklist
     * @returns true on success, false otherwise
     */
    async clear() {

        if(!this._api) return false;
        
        await this._api.clear({});

        return true;
    }

    /**
     * Add Tracks to tracklist at given position.
     * If position is undefined or larger than tracklist size, tracks are added to back
     * Supports negative indexing 
     * @param {import("Reducers/LibraryReducer").StoredTrack[]} tracks 
     * @param {Number?} position Position in tracklist to insert
     * @returns 
     */
    async add(tracks, position) {

        if(!this._api) return false;
        
        if(position) {
            if(position < 0)position = this._tracklist.length + position;
            if(position > this._tracklist.length) position = this._tracklist.length;
            else if(position < 0) position = 0;
        }
        
        this._tracklist = await this._api.add({
            "tracks": null,
            "at_position": position,
            "uris": tracks.map(t => t._uri)
        });

        return true;
    }

    /**
     * 
     * @param {import("Reducers/TracklistReducer").StoredTracklistItem} item 
     * @returns 
     */
    async remove(item) {
        console.log(item);

        if(!this._api) return false;
        
        if(!item) return false;

        await this._api.remove({criteria: {tlid: [item.tlid]}});
    }

    /**
     * 
     * @returns The track id of the current track playing
     */
    async getCurrentTrackId() {
        if(!this._api) return null;

        return await this._api.index({});
    }

    /**
     * 
     * @param {import("Reducers/LibraryReducer").StoredTrack} track
     * @returns {number} id of tracklist item
     */
    getTrackId(track) {

        console.warn("DEPRACTED FUNCTIONS!")

        const track_tl_item = this._tracklist.find(tl_item => tl_item.track.uri === track._uri);

        if(track_tl_item) return track_tl_item.tlid;
        
        return null;
    }

    /**
     * Get current tracklist
     * @readonly
     * @type {mpd_tracklist}
     */
    get tracklist() {
        return this._tracklist.map(tl_item => {
            return {
                track_uri: tl_item.track.uri,
                tlid: tl_item.tlid
            }
        });
    }
};