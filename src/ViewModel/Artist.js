/**
 * @typedef Artist
 * @property {string} _uri
 * @property {string} name
 * @property {import('./Album').Album[]} albums
 */

/**
 * @param {import('MopidyHandler/LibraryHandler').mpd_artist} mpd_artist 
 * @param {import('./Album').Album[]} [albums]
 * @returns {Artist}
 */
function Artist(mpd_artist, albums, tracks) {
    
    if(!mpd_artist) {
        return {
            _uri: null,
            name: null,
            albums: [],
            tracks: []
        }
    }

    return {
        _uri: mpd_artist.uri,
        name: mpd_artist.name,
        albums: albums || [],
        tracks: tracks || []
    }
}

export default Artist;