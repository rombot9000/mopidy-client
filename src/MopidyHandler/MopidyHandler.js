import EventEmitter from "events";
import Mopidy from "mopidy";

import LibraryHandler from "./LibraryHandler";
import TracklistHandler from "./TracklistHandler";
import { PlaybackHandler, PlaybackCmds } from "./PlaybackHandler";

var MPD_ARGS = {};
var SERVER_IP = "";
if(process.env.NODE_ENV !== "production") {
    MPD_ARGS = {
        webSocketUrl: "ws://raspberrypi.fritz.box:8080/mopidy/ws/"
    };
    SERVER_IP = "http://raspberrypi.fritz.box:8080";
}

 /** Instance of mopidy connector object */
const mopidy = new Mopidy(MPD_ARGS);

class MopidyHandler extends EventEmitter {
    constructor() {
        super();

        // Init api handlers
        this._library = new LibraryHandler(mopidy);
        this._tracklist = new TracklistHandler(mopidy);
        // make playback api public
        this.playback = new PlaybackHandler(mopidy);

        /** @type {import('./LibraryHandler').mpd_album[]} */
        this._fullAlbumList = [];

        /** @type {Object.<string, import('./LibraryHandler').mpd_album[]>} */
        this._tokenToAlbumList = {}

        /** @type {import('./LibraryHandler').mpd_album[]} */
        this.albums = [];
        /** @type {Object.<string,import('./LibraryHandler').mpd_track[]>} */
        this.album_uri_to_tracks = {};
        /** @type {Object.<string,import('./LibraryHandler').mpd_image[]>} */
        this.album_uri_to_artwork = {};

        mopidy.on("state:online", this._getAlbums.bind(this));
    }

    /**
     * 
     * @param {Object.<string,import('./LibraryHandler').mpd_image[]>} uri_to_artwork_list 
     */
    _getPrimaryAlbumArtwork(uri_to_artwork_list) {
        let album_uri_to_artwork_uri = [];
        Object.entries(uri_to_artwork_list).forEach(([uri, artworklist]) => {
            if(artworklist.length === 0) return;
            album_uri_to_artwork_uri[uri] = `${SERVER_IP}${artworklist[0].uri}`;
        });
        return album_uri_to_artwork_uri;
    }
    
    /**
     * Get all albums, tracks and artwork from library
     */
    async _getAlbums() {
        if(this._gettingAlbums) return;
        
        this._gettingAlbums = true;

        try {

            this._fullAlbumList = await this._library.browse("local:directory?type=album");

            this._tokenToAlbumList = {};

            this.albums = this._fullAlbumList;
            
            this.album_uri_to_tracks = await this._library.lookup(this._fullAlbumList.map(ref => ref.uri));
    
            this._uri_to_artwork_list = await this._library.getImages(this._fullAlbumList.map(ref => ref.uri));

            this.album_uri_to_artwork_uri = this._getPrimaryAlbumArtwork(this._uri_to_artwork_list);

            this.emit("state", "state:albums_fetched");

        } catch(err) {

            console.error(`Caught exception: ${err}`);

        }

        this._gettingAlbums = false;
    }

    /**
     * Play track, reset playlist if necessary
     * @param {import('./LibraryHandler').mpd_track} track 
     */
    async playAlbumTrack(track) {
        try {

            await this._tracklist.set(this.album_uri_to_tracks[track.album.uri]);
            
            let tlid = this._tracklist.getTrackId(track);

            await this.playback.sendCmd(PlaybackCmds.PLAY, {tlid: tlid});

        } catch(err) {

            console.error(`Caught exception: ${err}`);

        }
    }

    /**
     * 
     * @param {string|RegExp} token 
     */
    async filterAlbums(token) {
        const time_start = Date.now();
        if(!token || token === "") {
            this.albums = this._fullAlbumList;
            this.emit("state", "state:albums_not_filtered");
            return;
        }

        console.log(token);
        // check for cashed search results
        const lowerCaseToken = token.toLowerCase();
        if(!this._tokenToAlbumList[lowerCaseToken]){

            this._tokenToAlbumList[lowerCaseToken] = this.albums.filter(a => {
                return a.name.toLowerCase().search(lowerCaseToken) !== -1;
            });

        }

        this.albums = this._tokenToAlbumList[lowerCaseToken];
        this.emit("state", "state:albums_filtered");
        
        const time_end = Date.now();
        console.log("Filtering time: ", time_end - time_start);
    }
};

/** Mopidy handler singleton */
const instance = new MopidyHandler();
export default instance;