import { EventEmitter } from "events";

import { LIBRARY_ACTIONS } from "Actions/LibraryActions"

import { Album } from "ViewModel";

export default class LibraryStore extends EventEmitter {
    constructor() {
        super();

        /** @type {Object.<string, import("ViewModel/Album").Album[]>} */
        this._tokenToAlbumList = { "" : [] };
        /** @type {string} */
        this._filterToken = "";

        /** @type {IDBDatabase} */
        this._indexedDB = null;
        
        this._openDbConnection();
    }

    async _openDbConnection() {

        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB.");
            return;
        }
        
        const DATABASE_VERSION = 2;
        const dbRequest = window.indexedDB.open("LibraryStore", DATABASE_VERSION);
        console.log(dbRequest);

        dbRequest.onupgradeneeded = (event) =>  { 
            
            /** @type {IDBDatabase} */
            const indexedDB = event.target.result;
            if(indexedDB.objectStoreNames.contains("Albums")) {
                console.log("Deleting older version of album object store...");
                indexedDB.deleteObjectStore("Albums");
            }
            console.log("Creating new album object store...");
            const albumObjectStore = indexedDB.createObjectStore("Albums", {keyPath: "_uri" });
            for(const item in Album(null)) {
                albumObjectStore.createIndex(item, item, { unique: false });
            }

            albumObjectStore.transaction.oncomplete = (event) => {
                console.log("Creating album index complete")
            };
        };

        dbRequest.onsuccess = (event) => {
            this._indexedDB = event.target.result;
            this._indexedDB.onerror = (event) => { console.error(event.target.errorCode); };
            this._loadAlbumsFromDb();
        };

        dbRequest.onerror =  (event) => {
            console.error("Database error: " + event.target.errorCode);
        };
    }

    _saveAlbumsToDb() {
        const albumObjectStore = this._indexedDB.transaction("Albums", "readwrite").objectStore("Albums"); 
        const deleteAllRequest = albumObjectStore.clear();
        deleteAllRequest.onsuccess = (event) => {
            this._tokenToAlbumList[""].forEach( album => {
                const request = albumObjectStore.add(album);
                request.onerror = (event) => {console.log(event.target.errorCode)}
            });
        }
        deleteAllRequest.onerror = (event) => {
            console.error("Could not clear object store, error code:", event.target.errorCode);
        };
    }

    _loadAlbumsFromDb() {
        const albumObjectStore = this._indexedDB.transaction("Albums", "readonly").objectStore("Albums"); 
        const request = albumObjectStore.getAll();
        request.onerror = (event) => {console.log(event.target.errorCode)}
        request.onsuccess = (event) => {
            console.log("Got albums from object store");
            console.log(event.target.result);
            this._tokenToAlbumList = { "" : event.target.result};
            this.emit("update");
        }
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