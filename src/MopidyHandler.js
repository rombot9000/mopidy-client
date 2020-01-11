import Mopidy from 'mopidy';

/** 
 * Mopidy reference object
 * @typedef mpd_ref
 * @property {string} _model_
 * @property {string} name
 * @property {string} uri
 * @property {string} type
 */

/**
 * Mopidy artist object
 * @typedef mpd_artist
 * @property {string} _model_
 * @property {string} name
 * @property {string} uri
 */

/**
 * Mopidy album object
 * @typedef mpd_album
 * @property {string} _model_
 * @property {string} name
 * @property {string} uri
 * @property {string} date
 * @property {number} num_discs
 * @property {number} num_tracks
 */

/**
 * Mopidy track object
 * @typedef mpd_track
 * @property {string} _model_
 * @property {string} name
 * @property {string} uri
 * @property {mpd_album} album 
 * @property {mpd_artist} artists 
 * @property {mpd_artist} composers
 * @property {string} date
 * @property {string} genre
 * @property {number} length
 * @property {number} disc_no
 * @property {number} track_no
 * @property {number} bitrate 
 * @property {number} last_modified
 */

/**
 * Mopidy image object
 * @typedef mpd_image
 * @property {string} _model_
 * @property {string} uri
 * @property {number} height
 * @property {number} width
 */

const mopidy = new Mopidy({
    webSocketUrl: "ws://raspberrypi.fritz.box:6680/mopidy/ws/"
});

class MopidyHandler {
    constructor() {
        /** @type {mpd_album[]} */
        this.albums = [];
        /** @type {Object.<string,mpd_track[]>} */
        this.album_uri_to_tracks = {};
        /** @type {Object.<string,mpd_image[]>} */
        this.album_uri_to_artwork = {};
        return;
    }

    /**
     * Wrapper for mopidy.library.browse
     * @param {string} uri
     * @returns {Promise.<mpd_ref[]>}
     */
    async _browseLibrary(uri) {
        return mopidy.library.browse({"uri": uri});
    }

    /**
     * Wrapper for mopidy.library.lookup
     * @param {string[]} uris
     * @returns {Promise.<Object.<string,mpd_track[]>>}
     */
    async _lookupLibrary(uris) {
        return mopidy.library.lookup({"uris": uris});
    }

    /**
     * Wrapper for mopidy.library.getImages
     * @param {string[]} uris
     * @returns {Promise.<Object.<string,mpd_image[]>>}
     */
    async _getImages(uris) {
        return mopidy.library.getImages({"uris": uris});
    }
    
    /**
     * Get all albums, tracks and artwork from library
     */
    async getAlbums() {
        this.albums = await this._browseLibrary("local:directory?type=album");
        console.log(this.albums);
        
        this.album_uri_to_tracks = await this._lookupLibrary(this.albums.map(ref => ref.uri));
        console.log(this.album_uri_to_tracks);

        this.album_uri_to_artwork = await this._getImages(this.albums.map(ref => ref.uri));
        console.log(this.album_uri_to_artwork);
    }
};

export default MopidyHandler;