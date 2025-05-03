// Storage API
import IndexedDB from "./IndexedDB";

// View Model
import { EmptyAlbum, EmptyArtist, EmptyTrack } from "Reducers/StoreModel";

console.log("Prepare Library");
// Library
const LibraryDB = new IndexedDB("Library", 10);
LibraryDB.addStore({
    name: "Albums",
    params: {keyPath: "uri"},
    indexSchemes: Object.keys(EmptyAlbum()).map(key => { return {index: key, params: null}; })
});
LibraryDB.addStore({
    name: "Artists",
    params: {keyPath: "uri"},
    indexSchemes: Object.keys(EmptyArtist()).map(key => { return {index: key, params: null}; })

});
LibraryDB.addStore({
    name: "Tracks",
    params: {keyPath: "uri"},
    indexSchemes: Object.keys(EmptyTrack()).map(key => { return {index: key, params: null}; })

});
console.log("Init Library");
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