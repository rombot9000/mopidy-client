import { EventEmitter } from "events";

import Dispatcher from "Dispatcher";
import { LIBRARY_ACTIONS } from "Actions/LibraryActions"

import { Album } from "ViewModel";

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
        /** @type {import("ViewModel/Album").Album[]} */
        this._filteredAlbums = [];
    }

    async init() {
        // Get data from server
        await this._fetchAllAlbums();
    }

    async handleActions(action) {
        try {

            switch(action.type) {
                case LIBRARY_ACTIONS.FETCH_ALL:
                    await this._fetchAllAlbums();
                    this.emit("update");
                break;
    
                case LIBRARY_ACTIONS.FILTER:
                    this._filteredAlbums = this._filterAlbumsByLowercaseToken(action.token.toLowerCase());
                    this.emit("update");
                break;
    
                default:
            }

        } catch(exception) {

            console.error("Caught exception:", exception);

        }
    }

    /**
     * @readonly
     */
    get albums() {
        return this._filteredAlbums;
    }

    /**
     * Get all album and track data from music server
     */
    async _fetchAllAlbums() {

        // // only run one fetch at a time
        // if(this._gettingAlbums) return;

        // // lock
        // this._gettingAlbums = true;
        
        // try {

        //     // Fetch albums, tracks, and artwork from server
        //     this._mpd_albums = await this._browse("local:directory?type=album");             
        //     this._album_uri_to_tracks = await this._lookup(this._mpd_albums.map(ref => ref.uri));
        //     this._album_uri_to_artwork_list = await this._getImages(this._mpd_albums.map(ref => ref.uri));

        //     // Map data onto view model
        //     this._fullAlbumList = this._mpd_albums.map(mpd_album =>
        //         Album(
        //             mpd_album,
        //             this._album_uri_to_tracks[mpd_album.uri],
        //             this._album_uri_to_artwork_list[mpd_album.uri]
        //         )
        //     );

        // } catch(exception) {

        //     console.error("Error getting albums:", exception);
        // }

        // this._gettingAlbums = false;

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
}

const libraryStore = new LibraryStore();
Dispatcher.register(libraryStore.handleActions.bind(libraryStore));
export default libraryStore;