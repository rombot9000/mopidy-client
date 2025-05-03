import PREVAL from "preval.macro";

import Artist from "./Artist";

const SERVER_IP = PREVAL`module.exports = process.env.NODE_ENV === "production" ? "" : "http://raspberrypi.fritz.box:8080"`;

/**
 * @typedef Album
 * @property {string} name
 * @property {string} year
 * @property {string} length
 * @property {import("./Artist").Artist} artist
 * @property {import("./Track").Track[]} tracks
 * @property {string} cover
 */

/**
 * 
 * @param {import("MopidyAPI/LibraryAPI").mpd_album} mpd_album
 * @param {import("./Track").Track[]} tracks
 * @param {import("MopidyAPI/LibraryAPI").mpd_image[]} mpd_images
 * @returns {Album}
 */
function Album(mpd_album, tracks = [], mpd_images = []) {

    if(!mpd_album) {
        return {
            name: "",
            year: "",
            length: "",
            artist: Artist(null),
            tracks: [],
            cover: ""
        }
    }

    // sort tracks
    tracks.sort((a,b) => {
        if(a.disc_no === b.disc_no) return a.track_no > b.track_no ? 1 : -1;
        return a.disc_no > b.disc_no ? 1 : -1;
    })
    const totalSecs = Math.floor(tracks.reduce((l,t) => l+t.length, 0)/1000);
    
    // get album artist
    // TODO: write mechanism to get base artist or set to various artist if not possible
    const artist = tracks.length ? tracks[0].artist : "";
    const year = tracks.length ? tracks[0].year : "";
    const cover = mpd_images[0] ? `${SERVER_IP}${mpd_images[0].uri}` : null;
    /** @type {Album} */
    const album =  {
        name: mpd_album.name,
        year: year,
        length: `${Math.floor(totalSecs/60)}:${`00${totalSecs%60}`.slice(-2)}`,
        artist: artist,
        tracks: tracks,
        cover: cover
    }

    // set album for tracks
    tracks.forEach(t => t.album = album);

    return album;
}

export default Album;