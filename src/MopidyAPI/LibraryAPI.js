import BaseAPI from "./BaseAPI";

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
 * @property {mpd_artist[]} artists 
 * @property {mpd_artist[]} composers
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

import { Album } from "ViewModel";

/** Handler for mopidy library API */
class LibraryAPI extends BaseAPI {
    constructor(mopidy) {
        super(mopidy, "library");

        /** promise */
        this._fetchPromise = null;
    }

    async fetchAll() {
        if( !this._fetchPromise ) {
            this._fetchPromise = this._fetchAll();
            this._fetchPromise.finally(() => {
                this._fetchPromise = null;
            })
        }
        return await this._fetchPromise;
    }

    async _fetchAll() {
        try {

            // Get data from server
            const mpd_albums = await this._browse("local:directory?type=album");             
            const album_uri_to_tracks = await this._lookup(mpd_albums.map(ref => ref.uri));
            const album_uri_to_artwork_list = await this._getImages(mpd_albums.map(ref => ref.uri));

            // Map data onto view model
            const albums = mpd_albums.map(mpd_album =>
                Album(
                    mpd_album,
                    album_uri_to_tracks[mpd_album.uri],
                    album_uri_to_artwork_list[mpd_album.uri]
                )
            );

            return albums;

        } catch(err) {

            console.error("Caught exception:", err);
            return [];
        }
    }
    
    /**
     * Wrapper for mopidy.library.browse
     * @param {string} uri
     * @returns {Promise.<mpd_ref[]>}
     */
    async _browse(uri) {
        await this._initApi();
        return this._api.browse({"uri": uri});
    }

    /**
     * Wrapper for mopidy.library.lookup
     * @param {string[]} uris
     * @returns {Promise.<Object.<string,mpd_track[]>>}
     */
    async _lookup(uris) {
        await this._initApi();
        return this._api.lookup({"uris": uris});
    }

    /**
     * Wrapper for mopidy.library.getImages
     * @param {string[]} uris
     * @returns {Promise.<Object.<string,mpd_image[]>>}
     */
    async _getImages(uris) {
        await this._initApi();
        return this._api.getImages({"uris": uris});
    }
}

export default LibraryAPI;