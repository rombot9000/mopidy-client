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

import { Album, Artist, Track } from "ViewModel";

/** Handler for mopidy library API */
class LibraryAPI extends BaseAPI {
    constructor(mopidy) {
        super(mopidy, "library");

        /** promise */
        this._fetchPromise = null;
    }

    /**
     * @returns {Promise<[import("ViewModel/Artist").Artist[], import("ViewModel/Track").Track[], import("ViewModel/Album").Album[]]>}
     */
    async fetchAll() {
        if( !this._fetchPromise ) {
            this._fetchPromise = this._fetchAll();
            this._fetchPromise.finally(this._resetFetchPromise);
        }
        return await this._fetchPromise;
    }

    _resetFetchPromise() {
        this._fetchPromise = null;
    }
    /**
     * @returns {Promise<[import("ViewModel/Artist").Artist[], import("ViewModel/Track").Track[], import("ViewModel/Album").Album[]]>}
     */
    async _fetchAll() {
        try {

            // Get data from server
            const mpd_albums = await this._browse("local:directory?type=album");             
            const albumUriToTracks = await this._lookup(mpd_albums.map(ref => ref.uri));
            const albumUriToArtworkList = await this._getImages(mpd_albums.map(ref => ref.uri));

            // Map artists onto view model
            /** @type {Object.<string, import("ViewModel/Artist").Artist>} */
            const uriToArtist = {};
            /** @type {import("ViewModel/Track").Track[]} */
            const tracks = [];

            // artist undefined
            const unknownArtist =  Artist(null);
            unknownArtist.name = "Unknown Artist";


            const albums = mpd_albums.map(mpd_album => {
                

                // handle tracks and get all distinct artists
                const albumTracks = albumUriToTracks[mpd_album.uri].map(mpd_track => {
                    // handle tracks without artists
                    if(!mpd_track.artists.length) return Track(mpd_track, unknownArtist);

                    if(!uriToArtist[mpd_track.artists[0].uri])  {
                        uriToArtist[mpd_track.artists[0].uri] = Artist(mpd_track.artists[0]);
                    }
                    
                    return Track(mpd_track, uriToArtist[mpd_track.artists[0].uri]);
                });
                tracks.push(albumTracks);

                // album
                return Album(
                    mpd_album,
                    albumTracks,
                    albumUriToArtworkList[mpd_album.uri]
                );
            });

            return [Object.values(uriToArtist), albums, tracks];

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