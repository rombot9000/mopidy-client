import Artist from "./Artist";
import Album from "./Album";

/**
 * @typedef Track
 * @property {string} name
 * @property {number} disc_no
 * @property {number} track_no
 * @property {import("./Artist").Artist} artist
 * @property {import("./Album").Album} album
 * @property {string} year
 * @property {number} length
 */

/** @type {Track} */
const emptyTrack = {
    name: null,
    track_no: null,
    length: null,
    year: null,
    artist: Artist(null),
    album: Album(null)
}

/**
 * 
 * @param {import("MopidyAPI/LibraryAPI").mpd_track} mpd_track
 * @param {import("./Artist").Artist} [artist]
 * @param {import("./Album").Album} [album]
 * @returns {Track}
 */
function Track(mpd_track, artist, album) {

    if(!mpd_track) return emptyTrack;

    const year = mpd_track.date.slice(0,4);

    return {
        name: mpd_track.name,
        disc_no: mpd_track.disc_no,
        track_no: mpd_track.track_no,
        length: mpd_track.length,
        year: year,
        artist: artist || Artist(mpd_track.artists[0]),
        album: album || Album(mpd_track.album)
    }
}

export default Track;