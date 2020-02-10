import EventEmitter from "events";
import Mopidy from "mopidy";

import LibraryHandler from "./LibraryHandler";
import TracklistHandler from "./TracklistHandler";
import PlaybackHandler from "./PlaybackHandler";

import { UnknownPlaybackStateError } from "./Errors";

import { Album, Track } from "ViewModel";

/** @typedef {"state:online"|"state:offline"|"state:reconnectionPending"|"state:reconnecting"} mpd_state */


const MPD_ARGS = {
    autoConnect: false
};
if(process.env.NODE_ENV !== "production") {
    MPD_ARGS.webSocketUrl = "ws://raspberrypi.fritz.box:8080/mopidy/ws/";
}

class MopidyHandler extends EventEmitter {
    constructor() {
        super();

         /** Instance of mopidy connector object */
        this._mopidy = new Mopidy(MPD_ARGS);

        // Init api handlers
        this._library = new LibraryHandler(this._mopidy);
        this._tracklist = new TracklistHandler(this._mopidy);
        // make playback api public
        this.playback = new PlaybackHandler(this._mopidy);

        // Init model view objects
        /** @type {import('ViewModel/Album').Album[]} */
        this._fullAlbumList = [];
        /** @type {Object.<string, import('ViewModel/Album').Album[]>} */
        this._tokenToAlbumList = {};
        /** @type {import('ViewModel/Album').Album} */
        this.Albums = [];

        // Init mpd model objects
        /** @type {import('./LibraryHandler').mpd_album[]} */
        this._mpd_albums = [];
        /** @type {Object.<string,import('./LibraryHandler').mpd_track[]>} */
        this._album_uri_to_tracks = {};
        /** @type {Object.<string,import('./LibraryHandler').mpd_image[]>} */
        this.album_uri_to_artwork = {};

        // Set event handlers
        this._mopidy.on("state", this._handleStateEvent.bind(this));
        this._mopidy.on("websocket:open", this._handleWebsocketEvent.bind(this));
        this._mopidy.on("websocket:close", this._handleWebsocketEvent.bind(this));
        this._mopidy.on("websocket:error", this._handleWebsocketEvent.bind(this));

        // Connect
        this._mopidy.connect();
    }

    /**
     * 
     * @param {mpd_state} state 
     * @param {any} args 
     */
    _handleStateEvent(state, args) {
        const [,stateType] = state.split(':');

        switch(stateType) {
            case "online":
                this.playback.init();
                this._tracklist.init();
                this._getAlbums();
            break;

            default:
                console.warn("State not handled:", state);
                console.log(args);
        }
    }

    _handleWebsocketEvent(event, args) {
        console.log("Websocket event:", event)
        console.log(args);
    }
    
    /**
     * Get all albums, tracks and artwork from library
     */
    async _getAlbums() {

        // only run one fetch at a time
        if(this._gettingAlbums) return;
        
        // lock
        this._gettingAlbums = true;

        try {

            // Get data from server
            this._mpd_albums = await this._library.browse("local:directory?type=album");             
            this._album_uri_to_tracks = await this._library.lookup(this._mpd_albums.map(ref => ref.uri));
            this._album_uri_to_artwork_list = await this._library.getImages(this._mpd_albums.map(ref => ref.uri));

            // Map data onto view model
            this._fullAlbumList = this._mpd_albums.map(mpd_album =>
                Album(
                    mpd_album,
                    this._album_uri_to_tracks[mpd_album.uri],
                    this._album_uri_to_artwork_list[mpd_album.uri]
                )
            );
            
            // Visible albums
            this.Albums = this._fullAlbumList;
            
            // Done
            this.emit("state", "state:albums_fetched");

        } catch(err) {

            console.error("Caught exception:", err);

        }

        // unlock
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
    async filterAlbums(token) {
        
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
     * @readonly
     * @type {import('ViewModel/Track').Track[]} The current tracklist
     */
    get currentTracklist() {
        return this._tracklist.currentTracklist.map(tl_track => Track(tl_track.track));
    }

    /**
     * @readonly
     * @type {import('ViewModel/Track').Track} The current track
     */
    get currentTrack() {
        return Track(this.playback.track);
    }

    /**
     * @readonly
     * @type {import('./PlaybackHandler').PlaybackState} The current playback state
     */
    get playbackState() {
        return this.playback.state;
    }

    /**
     * 
     * @param {import('ViewModel/Track').Track[]} tracks 
     * @param {import('ViewModel/Track').Track} track 
     */
    async playTracklist(tracks, track=null) {
        try {

            await this._tracklist.set(tracks.map(t => t._uri));
            
            let tlid = track ? this._tracklist.getTrackId(track._uri) : null;

            await this.playback.sendCmd("play", {tlid: tlid});

        } catch(err) {
            console.error("Caught exception:", err);
        }
    }

    /**
     * Toggles Playback: STOPPED -> PLAYING <-> PAUSED
     */
    async togglePlayback() {
        try {
            switch(this.playback.state) {
                case "stopped":
                    await this.playback.sendCmd("play")
                break;
    
                case "paused":
                    await this.playback.sendCmd("resume");
                break;
                
                case "playing":
                    await this.playback.sendCmd("pause");
                break;
                
                default:
                    throw new UnknownPlaybackStateError(this._state);
            }
        } catch(err) {
            console.error("Caught exception:", err);
        }
    }

    /**
     * Play next song
     */
    async next() {
        try {
            await this.playback.sendCmd("next");  
        } catch(err) {
            console.error("Caught exception:", err);
        }
    }

    /**
     * 
     */
    async previous() {
        try {
            await this.playback.sendCmd("previous");  
        } catch(err) {
            console.error("Caught exception:", err);
        }
    }
};

/** Mopidy handler singleton */
const instance = new MopidyHandler();
export default instance;