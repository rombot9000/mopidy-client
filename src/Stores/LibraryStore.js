import { EventEmitter } from "events";

import Dispatcher from "Dispatcher";
import { LIBRARY_ACTIONS } from "Actions/LibraryActions"

import Mopidy from "Mopidy";

class LibraryStore extends EventEmitter {
    constructor() {
        super();

        // mpd model objects
        /** @type {import("./LibraryHandler").mpd_album[]} */
        this._mpd_albums = [];
        /** @type {Object.<string,import("./LibraryHandler").mpd_track[]>} */
        this._album_uri_to_tracks = {};
        /** @type {Object.<string,import("./LibraryHandler").mpd_image[]>} */
        this._album_uri_to_artwork_list = {};

        // view model object
        /** @type {import("ViewModel/Album").Album[]} */
        this._fullAlbumList = [];
        /** @type {Object.<string, import("ViewModel/Album").Album[]>} */
        this._tokenToAlbumList = {};
        /** @type {import("ViewModel/Album").Album} */
        this.Albums = [];
    }

    async init() {
        // Get data from server
        await this._fetchAllAlbums();
    }

    async handleActions(action) {
        try {

            switch(action) {
                case LIBRARY_ACTIONS.FETCH_ALL:
                    await this._fetchAllAlbums();
                break;
    
                case LIBRARY_ACTIONS.FILTER:
                    await this._filterAlbums(action.token);
                break;
    
                default:
            }

        } catch(exception) {

            console.error("Caught exception:", exception);

        }
    }

    async _fetchAllAlbums() {

        // only run one fetch at a time
        if(this._gettingAlbums) return;

        // lock
        this._gettingAlbums = true;
        
        try {

            this._mpd_albums = await this._browse("local:directory?type=album");             
            this._album_uri_to_tracks = await this._lookup(this._mpd_albums.map(ref => ref.uri));
            this._album_uri_to_artwork_list = await this._getImages(this._mpd_albums.map(ref => ref.uri));

        } catch(exception) {

            console.error("Error getting albums:", exception);
        }

        this._gettingAlbums = false;

    }

    /**
     * Internal search function, uses cached results
     * @param {string} lowerCaseToken 
     */
    _filterAlbumsByLowercaseToken(lowerCaseToken) {

        if(!lowerCaseToken || lowerCaseToken === "") return this._fullAlbumList;

        if(!this._tokenToAlbumList[lowerCaseToken]) {

            // Use prev search result as basis
            this._tokenToAlbumList[lowerCaseToken] = this._filterAlbumsByLowercaseToken(lowerCaseToken.slice(0,-1)).filter(album => {

                // check album name
                if(album.name.toLowerCase().search(lowerCaseToken) !== -1) return true;

                // check album artists
                if(album.artist.toLowerCase().search(lowerCaseToken) !== -1) return true;

                // check track artists
                for(let track of album.tracks) {
                    if(track.artist.toLowerCase().search(lowerCaseToken) !== -1) return true;
                };

                // No match found
                return false;

            });
        }

        return this._tokenToAlbumList[lowerCaseToken];
    }

    /**
     * Filter albums using the token string
     * Matching album name and artists
     * NOTE: search takes a couple of ms with 100+ albums, thus no optimization necessary atm
     * @param {string} token 
     */
    async _filterAlbums(token) {
        
        if(!token || token === "") {
            this.Albums = this._fullAlbumList;
            this.emit("state", "state:albums_not_filtered");
            return;
        }
        
        const time_start = Date.now();
        
        this.Albums = this._filterAlbumsByLowercaseToken(token.toLowerCase());
        this.emit("state", "state:albums_filtered");
        
        const time_end = Date.now();
        console.log("Filtering time: ", time_end - time_start);
    }

    /**
     * Wrapper for mopidy.library.browse
     * @param {string} uri
     * @returns {Promise.<mpd_ref[]>}
     */
    async _browse(uri) {
        return Mopidy.library.browse({"uri": uri});
    }

    /**
     * Wrapper for mopidy.library.lookup
     * @param {string[]} uris
     * @returns {Promise.<Object.<string,mpd_track[]>>}
     */
    async _lookup(uris) {
        return Mopidy.library.lookup({"uris": uris});
    }

    /**
     * Wrapper for mopidy.library.getImages
     * @param {string[]} uris
     * @returns {Promise.<Object.<string,mpd_image[]>>}
     */
    async _getImages(uris) {
        return Mopidy.library.getImages({"uris": uris});
    }
}

const libraryStore = new LibraryStore();
Dispatcher.register(libraryStore.handleActions.bind(libraryStore));
export default libraryStore;