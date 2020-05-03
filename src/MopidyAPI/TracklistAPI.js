import BaseAPI from "./BaseAPI";

import { Track } from 'ViewModel';

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

        return this._tracklist.map(tl_item => Track(tl_item.track));
    }

    
    /**
     * Sets tracklist on server to album
     * Does nothing if album is already set
     * @param {import("ViewModel/Track").Track[]} tracks
     */
    async set(tracks) {

        await this._initApi();
        
        await this._api.clear({})
        
        this._tracklist = await this._api.add({
            "tracks": null,
            "at_position": null,
            "uris": tracks.map(t => t._uri)
        });
    }

    /**
     * 
     * @param {import("ViewModel/Track").Track} track
     * @returns {number} id of tracklist item
     */
    getTrackId(track) {

        const track_tl_item = this._tracklist.find(tl_item => tl_item.track.uri === track._uri);

        if(track_tl_item == null) throw new Error(`Track ${track.name} not in tracklist!`);

        return track_tl_item.tlid;

    }

    /**
     * Get current tracklist
     * @readonly
     * @type {mpd_tracklist}
     */
    get tracklist() {
        return this._tracklist.map(tl_item => Track(tl_item.track));
    }
};