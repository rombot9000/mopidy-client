/**
 * @typedef Artist
 * @property {string} _uri
 * @property {string} name
 * @property {import('./Album').Album[]} albums
 */

/**
 * @param {import('MopidyHandler/LibraryHandler').mpd_artist} mpd_artist 
 * @returns {Artist}
 */
function Artist(mpd_artist) {

    let albums = []
    
    return {
        _uri: mpd_artist.uri,
        name: mpd_artist.name,
        albums: albums,
    }
}

export default Artist;