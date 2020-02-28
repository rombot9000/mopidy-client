// Storage API
import IndexedDB from "./IndexedDB";

// View Model
import { Album } from "ViewModel";

// Library
export const LibraryDB = new IndexedDB("Library", 3);
LibraryDB.addSchema({
    store: "Albums",
    params: {keyPath: "_uri"},
    indexSchemes: Object.keys(Album(null)).map(key => {
        return {index: key, params: null};
    })
});

// Settings
export const SettingsDB = new IndexedDB("Settings", 3);
SettingsDB.addSchema({
    store: "Settings",
    params: { keyPath : "name" },
    indexSchemes: [
        { index: "value", params: null }
    ]
});