import Artist from "./Artist";

var SERVER_IP = process.env.NODE_ENV === "production" ? "" : "http://raspberrypi.fritz.box:8080";


/**
 * @typedef Album
 * @property {string} _uri
 * @property {string} name
 * @property {string} year
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
            _uri: "",
            name: "",
            year: "",
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
    
    // get album artist
    // TODO: write mechanism to get base artist or set to various artist if not possible
    const artist = tracks[0].artist;

    const cover = mpd_images[0] ? `${SERVER_IP}${mpd_images[0].uri}` : null;
    const year = tracks[0].year;

    return {
        _uri: mpd_album.uri,
        name: mpd_album.name,
        year: year,
        artist: artist,
        tracks: tracks,
        cover: cover
    }
}

export default Album;