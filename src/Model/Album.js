import Track from "./Track"

var SERVER_IP = ""
if(process.env.NODE_ENV !== "production") {
    SERVER_IP = "http://raspberrypi.fritz.box:8080";
}


/**
 * @typedef Album
 * @property {string} _uri
 * @property {string} name
 * @property {string} year
 * @property {string} artist
 * @property {import('./Track').Track[]} tracks
 * @property {string} cover
 */

/**
 * 
 * @param {import('MopidyHandler/LibraryHandler').mpd_album} mpd_album
 * @param {import('MopidyHandler/LibraryHandler').mpd_track[]} mpd_tracks
 * @param {import('MopidyHandler/LibraryHandler').mpd_image[]} mpd_images
 * @returns {Album}
 */
function Album(mpd_album, mpd_tracks, mpd_images) {

    let tracks = mpd_tracks.map(
        mpd_track => Track(mpd_track)
    ).sort((a,b) => {
        if(a.disc_no === b.disc_no) return a.track_no > b.track_no ? 1 : -1;
        return a.disc_no > b.disc_no ? 1 : -1;
    })
    
    let artist = tracks[0].artist;
    let cover = mpd_images[0] ? `${SERVER_IP}${mpd_images[0].uri}` : null;
    let year = tracks[0].year;

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