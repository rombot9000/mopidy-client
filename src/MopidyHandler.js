import EventEmitter from "events";
import Mopidy from "mopidy";

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

class MopidyHandler extends EventEmitter {
    constructor() {
        super();

        /** @type {mpd_album[]} */
        this.albums = [];
        /** @type {Object.<string,mpd_track[]>} */
        this.album_uri_to_tracks = {};
        /** @type {Object.<string,mpd_image[]>} */
        this.album_uri_to_artwork = {};

        this._socketOpen = false;
        mopidy.on("state:online", () => {this._socketOpen = true;});
        mopidy.on("state:online", this._getAlbums.bind(this));

        mopidy.on("state:offline", () => {this._socketOpen = false;});

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
    async _getAlbums() {
        if(this._gettingAlbums) return;
        this._gettingAlbums = true;

        try {

            let albums = await this._browseLibrary("local:directory?type=album");
            
            this.album_uri_to_tracks = await this._lookupLibrary(albums.map(ref => ref.uri));
    
            this.album_uri_to_artwork = await this._getImages(albums.map(ref => ref.uri));

            this.albums = albums
            this.emit("state", "state:albums_fetched");

            // albums.forEach(a => {
            //     console.log(a);
            //     console.log(this.album_uri_to_tracks[a.uri]);
            //     console.log(this.album_uri_to_artwork[a.uri]);
            // });

        } catch(err) {

            console.error(`Caught exception: ${err}`);

        }

        this._gettingAlbums = false;
    }
};

/** Mopidy handler singleton */
const instance = new MopidyHandler();
export default instance;