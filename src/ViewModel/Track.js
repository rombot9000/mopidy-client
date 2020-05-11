import Artist from "./Artist";

/**
 * @typedef Track
 * @property {string} _uri
 * @property {string} name
 * @property {number} disc_no
 * @property {number} track_no
 * @property {import("./Artist").Artist} artist
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
    artist: Artist(null),
}

/**
 * 
 * @param {import("MopidyAPI/LibraryAPI").mpd_track} mpd_track
 * @param {import("./Artist").Artist} artist
 * @returns {Track}
 */
function Track(mpd_track, artist) {

    if(!mpd_track) return emptyTrack;

    const year = mpd_track.date.slice(0,4);

    return {
        _uri: mpd_track.uri,
        name: mpd_track.name,
        disc_no: mpd_track.disc_no,
        track_no: mpd_track.track_no,
        length: mpd_track.length,
        year: year,
        artist: artist || Artist(mpd_track.artists[0]),
    }
}

export default Track;