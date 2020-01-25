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
    }


    
    /**
     * Sets tracklist on server to album
     * Does nothing if album is already set
     * @param {import('./LibraryHandler').mpd_track[]} tracks
     */
    async set(tracks) {

        let uris = tracks.map(t => t.uri);
        
        await this._mopidy.tracklist.clear({})
        
        this._currentTracklist = await this._mopidy.tracklist.add({
            "tracks": null,
            "at_position": null,
            "uris": uris
        });
    }

    /**
     * 
     * @param {import('./LibraryHandler').mpd_track} track
     * @returns {number} id of tracklist item
     */
    getTrackId(track) {
        let tl_item = this._currentTracklist.find(ti => ti.track.uri === track.uri);

        if(tl_item == null) throw new Error(`Track '${track.name}' not in current tracklist!`);

        return tl_item.tlid;
    }
};

export default TracklistHandler;