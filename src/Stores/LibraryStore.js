import { EventEmitter } from "events";
import { LIBRARY_ACTIONS } from "Actions/LibraryActions"


export default class LibraryStore extends EventEmitter {
    constructor() {
        super();

        /** @type {Object.<string, import("ViewModel/Album").Album[]>} */
        this._tokenToAlbumList = { "" : [] };
        /** @type {string} */
        this._filterToken = "";

    }

    /**
     * 
     * @param {Object} action
     * @param {string} action.type 
     * @param {import("ViewModel/Album").Album[]} [action.albums] list of album view model objects
     * @param {string} [action.token] Filter token
     * @param {string} [action.key] Sort key
     * 
     */
    handleAction(action) {
        try {

            switch(action.type) {
                case LIBRARY_ACTIONS.INIT:
                case LIBRARY_ACTIONS.FETCH:
                    this._tokenToAlbumList = { "" : action.albums};
                    this.emit("update");
                break;
    
                case LIBRARY_ACTIONS.FILTER:
                    this._filterToken = action.token.toLowerCase()
                    this._filterAlbumsByLowercaseToken(this._filterToken);
                    this.emit("update");
                break;

                case LIBRARY_ACTIONS.SORT_ALBUMS:
                    this._sortByKey = action.key;
                    this._sortAlbums();
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
        return this._filterAlbumsByLowercaseToken(this._filterToken);
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

    _sortAlbums() {
        if(!this._sortByKey) return;

        const sortedAlbumList = this._tokenToAlbumList[""].sort((a,b) => {
            return ('' +  a[this._sortByKey]).localeCompare(b[this._sortByKey]);
        });

        this._tokenToAlbumList = { "" : sortedAlbumList};
    }
}