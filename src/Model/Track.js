/**
 * @typedef Track
 * @property {string} _uri
 * @property {string} name
 * @property {number} disc_no
 * @property {number} track_no
 * @property {string} artist
 * @property {string} year
 * @property {number} length
 */

/** @type {Track} */
const emptyTrack = {
    _uri: null,
    name: null,
    track_no: null,
    length: null,
    year: null,
    artist: null,
}

/**
 * 
 * @param {import('MopidyHandler/LibraryHandler').mpd_track} mpd_track
 * @returns {Track}
 */
function Track(mpd_track) {

    if(!mpd_track) return emptyTrack;

    const artist = mpd_track.artists[0].name;
    const year = mpd_track.date.slice(0,4);

    return {
        _uri: mpd_track.uri,
        name: mpd_track.name,
        disc_no: mpd_track.disc_no,
        track_no: mpd_track.track_no,
        length: mpd_track.length,
        year: year,
        artist: artist,
    }
}

export default Track;