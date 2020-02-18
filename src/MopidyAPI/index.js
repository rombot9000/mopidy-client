import Mopidy from "mopidy";

import LibraryAPI from "./LibraryAPI";
import TracklistAPI from "./TracklistAPI";
import PlaybackAPI from "./PlaybackAPI";


// Creat instance of Mopidy API class
const MPD_ARGS = {
    autoConnect: false
};
if(process.env.NODE_ENV !== "production") {
    MPD_ARGS.webSocketUrl = "ws://raspberrypi.fritz.box:8080/mopidy/ws/";
}
export const mopidy = new Mopidy(MPD_ARGS);

// Create instances of API wrapper classes and export
export const Library = new LibraryAPI(mopidy);
export const Tracklist = new TracklistAPI(mopidy);
export const Playback = new PlaybackAPI(mopidy);