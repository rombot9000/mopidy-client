import { EventEmitter } from "events";

import { LIBRARY_ACTIONS } from "Actions/LibraryActions"

import { Album } from "ViewModel";

import IndexedDB from "IDBDatabaseAPI/IndexedDB";

export default class LibraryStore extends EventEmitter {
    constructor() {
        super();

        /** @type {Object.<string, import("ViewModel/Album").Album[]>} */
        this._tokenToAlbumList = { "" : [] };
        /** @type {string} */
        this._filterToken = "";

        /** @type {IndexedDB} */
        this._indexedDB = new IndexedDB("Library", 3);
        this._indexedDB.addSchema({
            name: "Albums",
            params: {keyPath: "_uri"},
            indexSchemes: Object.keys(Album(null)).map(key => {
                return {"name": key, "params": null};
            })
        });
        this._loadAlbumsFromDb();
    }

    async _saveAlbumsToDb() {
        const albumObjectStoreWriter = this._indexedDB.getObjectStoreWriter("Albums"); 
        await albumObjectStoreWriter.clear();
        await albumObjectStoreWriter.add(this._tokenToAlbumList[""]);
    }

    async _loadAlbumsFromDb() {
        await this._indexedDB.connect();
        const albumObjectStoreWriter = this._indexedDB.getObjectStoreWriter("Albums"); 
        const albums = await albumObjectStoreWriter.getAll();
        this._tokenToAlbumList = { "" : albums };
        this.emit("update");
    }

    handleAction(action) {
        try {

            switch(action.type) {
                case LIBRARY_ACTIONS.INIT:
                case LIBRARY_ACTIONS.FETCH_ALL:
                    this._tokenToAlbumList = { "" : action.albums};
                    this.emit("update");
                    this._saveAlbumsToDb();
                break;
    
                case LIBRARY_ACTIONS.FILTER:
                    this._filterToken = action.token.toLowerCase()
                    this._filterAlbumsByLowercaseToken(this._filterToken);
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
        return this._tokenToAlbumList[this._filterToken];
    }


    /**
     * Internal search function, uses cached results
     * @param {string} lowerCaseToken
     */
    _filterAlbumsByLowercaseToken(lowerCaseToken) {

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