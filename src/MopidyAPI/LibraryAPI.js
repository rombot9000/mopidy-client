import BaseAPI from "./BaseAPI";

import PREVAL from "preval.macro";
const SERVER_IP = PREVAL`module.exports = process.env.NODE_ENV === "production" ? "" : "http://raspberrypi.fritz.box:8080"`;

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

/** Handler for mopidy library API */
class LibraryAPI extends BaseAPI {
    constructor(mopidy) {
        super(mopidy, "library");

        /** promise */
        this._fetchPromise = null;
    }

    /**
     * @returns {Promise<[import("Reducers/LibraryReducer").StoredArtist[], import("Reducers/LibraryReducer").StoredAlbum[], import("Reducers/LibraryReducer").StoredTrack[]]>}
     */
    async fetchAll() {
        if( !this._fetchPromise ) {
            this._fetchPromise = this._fetchAll();
            this._fetchPromise.finally(this._resetFetchPromise.bind(this));
        }
        return await this._fetchPromise;
    }

    _resetFetchPromise() {
        this._fetchPromise = null;
    }

    /**
     * @returns {Promise<[import("Reducers/LibraryReducer").StoredArtist[], import("Reducers/LibraryReducer").StoredAlbum[], import("Reducers/LibraryReducer").StoredTrack[]]>}
     */
    async _fetchAll() {
        try {

            // Get data from server
            /** @type {mpd_album} */
            const mpdAlbums = await this._browse("local:directory?type=album");             
            const albumUriToTracks = await this._lookup(mpdAlbums.map(ref => ref.uri));
            const albumUriToArtworkList = await this._getImages(mpdAlbums.map(ref => ref.uri));

            // Map artists onto view model
            /** @type {{[uri: string] : import("Reducers/LibraryReducer").StoredArtist}} */
            const uriToArtist = {};

            // artist undefined
            //const unknownArtist =  Artist(null);
            //unknownArtist.name = "Unknown Artist";

            /** @type {import("Reducers/LibraryReducer").StoredAlbum[]} */
            const albums = [];
            /** @type {import("Reducers/LibraryReducer").StoredTrack[]} */
            const tracks = [];

            mpdAlbums.forEach(mpdAlbum => {
                // Add album
                albums.push(this.toStoredAlbum(mpdAlbum, albumUriToTracks[mpdAlbum.uri], albumUriToArtworkList[mpdAlbum.uri]));
                // Add tracks
                albumUriToTracks[mpdAlbum.uri].forEach(mpdTrack => {
                    tracks.push(this.toStoredTrack(mpdTrack));
                    // Add or complete artists
                    if(!uriToArtist[mpdTrack.artists[0].uri])  {
                        uriToArtist[mpdTrack.artists[0].uri] = this.toStoredArtist(mpdTrack.artists[0]);
                    }
                    uriToArtist[mpdTrack.artists[0].uri].album_uris.push(mpdTrack.album.uri);
                })
            });

            // Get artist list
            const artists = Object.values(uriToArtist);

            // make list of uris unique
            artists.forEach(a => {
                a.album_uris = [...new Set(a.album_uris)];
            });
            albums.forEach(a => {
                a.track_uris = [...new Set(a.track_uris)];
            })

            return [artists, albums, tracks];

        } catch(err) {

            console.error("Caught exception:", err);
            return [];
        }
    }

    /**
     * 
     * @param {mpd_artist} mpdArtist
     * @param {mpd_album[]} mpdAlbums
     * @returns {import("Reducers/LibraryReducer").StoredArtist}
     */
    toStoredArtist(mpdArtist, mpdAlbums = []) {
        return {
            uri: mpdArtist.uri,
            name: mpdArtist.name,
            album_uris: mpdAlbums.map(a => a.uri)
        }
    }

    /**
     * 
     * @param {mpd_album} mpdAlbum
     * @param {mpd_track[]} mpdTracks
     * @param {mpd_image[]} mpdImages
     * @returns {import("Reducers/LibraryReducer").StoredAlbum}
     */
    toStoredAlbum(mpdAlbum, mpdTracks = [], mpdImages = []) {
        return {
            uri: mpdAlbum.uri,
            name: mpdAlbum.name,
            artistName: mpdTracks.length ? mpdTracks[0].artists[0].name : "",
            year: mpdTracks.length ? mpdTracks[0].date.slice(0,4) : "",
            length: Math.floor(mpdTracks.reduce((l,t) => l+t.length, 0)/1000),
            artist_uri: mpdTracks.length ? mpdTracks[0].artists[0].uri : "",
            track_uris: mpdTracks.map(t => t.uri),
            cover_uri: mpdImages.length ? `${SERVER_IP}${mpdImages[0].uri}` : null,
        }
    }

    /**
     * 
     * @param {mpd_track} mpdTrack
     * @returns {import("Reducers/LibraryReducer").StoredTrack}
     */
    toStoredTrack(mpdTrack) {
        return {
            uri: mpdTrack.uri,
            name: mpdTrack.name,
            track_no: mpdTrack.track_no,
            disc_no: mpdTrack.disc_no,
            length: mpdTrack.length,
            year: mpdTrack.date.slice(0,4),
            artistName: mpdTrack.artists[0].name,
            albumName: mpdTrack.album.name,
            artist_uri: mpdTrack.artists[0].uri,
            album_uri: mpdTrack.album.uri
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