import EventEmitter from "events";
import Mopidy from "mopidy";

import LibraryHandler from "./LibraryHandler";
import TracklistHandler from "./TracklistHandler";

 /** Instance of mopidy connector object */
const mopidy = new Mopidy({
    webSocketUrl: "ws://raspberrypi.fritz.box:6680/mopidy/ws/"
});

class MopidyHandler extends EventEmitter {
    constructor() {
        super();

        // Init api handlers
        this._library = new LibraryHandler(mopidy);
        this._tracklist = new TracklistHandler(mopidy);


        /** @type {import('./LibraryHandler').mpd_album[]} */
        this.albums = [];
        /** @type {Object.<string,import('./LibraryHandler').mpd_track[]>} */
        this.album_uri_to_tracks = {};
        /** @type {Object.<string,import('./LibraryHandler').mpd_image[]>} */
        this.album_uri_to_artwork = {};

        mopidy.on("state:online", this._getAlbums.bind(this));
    }
    
    /**
     * Get all albums, tracks and artwork from library
     */
    async _getAlbums() {
        if(this._gettingAlbums) return;
        this._gettingAlbums = true;

        try {

            this.albums = await this._library.browse("local:directory?type=album");
            
            this.album_uri_to_tracks = await this._library.lookup(this.albums.map(ref => ref.uri));
    
            this.album_uri_to_artwork = await this._library.getImages(this.albums.map(ref => ref.uri));

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
    async playTrack(track) {
        try {

            await this._tracklist.set(this.album_uri_to_tracks[track.album.uri]);
            
            this._tracklist.play(track);

        } catch(err) {

            console.error(`Caught exception: ${err}`);

        }
    }
};

/** Mopidy handler singleton */
const instance = new MopidyHandler();
export default instance;