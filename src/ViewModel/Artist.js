/**
 * @typedef Artist
 * @property {string} name
 * @property {import('./Album').Album[]} albums
 */

/**
 * @param {import("MopidyAPI/LibraryAPI").mpd_artist} mpd_artist 
 * @param {import('./Album').Album[]} [albums]
 * @returns {Artist}
 */
function Artist(mpd_artist, albums, tracks) {
    
    if(!mpd_artist) {
        return {
            name: null,
            albums: [],
            tracks: []
        }
    }

    return {
        name: mpd_artist.name,
        albums: albums || [],
        tracks: tracks || []
    }
}

export default Artist;