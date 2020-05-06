// Storage API
import IndexedDB from "./IndexedDB";

// View Model
import { Album, Artist, Track } from "ViewModel";

// Library
const LibraryDB = new IndexedDB("Library", 5);
LibraryDB.addStore({
    name: "Albums",
    params: {keyPath: "_uri"},
    indexSchemes: Object.keys(Album(null)).map(key => {
        return {index: key, params: null};
    })
});
LibraryDB.addStore({
    name: "Artists",
    params: {keyPath: "_uri"},
    indexSchemes: Object.keys(Artist(null)).map(key => {
        return {index: key, params: null};
    })
});
LibraryDB.addStore({
    name: "Tracks",
    params: {keyPath: "_uri"},
    indexSchemes: Object.keys(Track(null)).map(key => {
        return {index: key, params: null};
    })
});
LibraryDB.init();

// Settings
const SettingsDB = new IndexedDB("Settings", 4);
SettingsDB.addStore({
    name: "Settings",
    params: { keyPath : "name" },
    indexSchemes: [
        { index: "value", params: null }
    ]
});
SettingsDB.init();

export {LibraryDB, SettingsDB};