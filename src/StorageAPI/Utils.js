import { SettingsDB, LibraryDB } from ".";

import Store from "Store";
import { NotifyActions } from "Actions";

/**
 * 
 * @param {string} name 
 * @param {number|string|boolean} value 
 */
export async function writeSetting(name, value) {
    try {
        
        const settingsObjectStoreWriter = await SettingsDB.getObjectStoreWriter("Settings");
        await settingsObjectStoreWriter.put({name: name, value: value});

    } catch(error) {

        console.error(error);
        Store.dispatch(NotifyActions.notifyUser("error", error));

    }
}

/**
 * 
 * @param {string} name
 * @param {number|string|boolean} defaultValue
 * @returns {Promise<number|string|boolean>} 
 */
export async function readSetting(name, defaultValue) {
    try {
        
        const settingsObjectStoreReader = await SettingsDB.getObjectStoreReader("Settings");
        const settingObject = await settingsObjectStoreReader.get(name);
        return settingObject ? settingObject.value : defaultValue;

    } catch(error) {

        console.error(error);
        Store.dispatch(NotifyActions.notifyUser("error", error));

    }
}

export async function getAlbumsFromDB() {

    try {

        const albumObjectStoreReader = await LibraryDB.getObjectStoreReader("Albums"); 
        return await albumObjectStoreReader.getAll();
    
    } catch(error) {

        console.error(error);
        Store.dispatch(NotifyActions.notifyUser("error", error));
        
    }

    return [];
}

/**
 * 
 * @param {import("Reducers/LibraryReducer").StoredAlbum[]} albums 
 */
export async function writeAlbumsToDB(albums) {
    try {
        
        const albumObjectStoreWriter = await LibraryDB.getObjectStoreWriter("Albums"); 
        await albumObjectStoreWriter.clear();
        await albumObjectStoreWriter.add(albums);

    } catch(error) {

        console.error(error);
        Store.dispatch(NotifyActions.notifyUser("error", error));

    }
}

// /**
//  * 
//  * @param {Object} obj 
//  */
// function createShallowCopy(obj) {

//     const objOut = Array.isArray(obj) ? [] : {};
    
//     Object.entries(obj).forEach(([key,value]) => {

//         if(typeof value !== "object" || value === null) {
            
//             objOut[key] = value;

//         } else if(value._uri != null) {
            
//             objOut[key] = { _uri: value._uri };

//         } else {
            
//             objOut[key] = createShallowCopy(value);

//         }
//     })

//     return objOut;
// }

// /**
//  * 
//  * @param {Object} obj 
//  * @param {Object.<string, Object>} references 
//  */
// function insertReferences(obj, references) {
//     Object.keys(obj).forEach(key => {
        
//         if(typeof obj[key] !== "object" || obj[key] === null) {
            
//             return;

//         } else if(obj[key]._uri != null) {
            
//             obj[key] = references[obj[key]._uri];

//         } else {
            
//             insertReferences(obj[key], references);

//         }

//     });

// }

/**
 * 
 * @param {import("Reducers/LibraryReducer").LibraryState} library 
 */
export async function writeLibraryToDB(library) {
    
    try {
        
        const albumObjectStoreWriter = await LibraryDB.getObjectStoreWriter("Albums");
        await albumObjectStoreWriter.clear();
        await albumObjectStoreWriter.add(library.albums);


        const artistObjectStoreWriter = await LibraryDB.getObjectStoreWriter("Artists");
        await artistObjectStoreWriter.clear();
        await artistObjectStoreWriter.add(library.artists);

        const trackObjectStoreWriter = await LibraryDB.getObjectStoreWriter("Tracks");
        await trackObjectStoreWriter.clear();
        await trackObjectStoreWriter.add(library.tracks);

        
    } catch(error) {

        console.error(error);
        Store.dispatch(NotifyActions.notifyUser("error", error));

    }

}

export async function readLibraryFromDB() {

    try {

        
        const albumObjectStoreReader = await LibraryDB.getObjectStoreReader("Albums"); 
        const albums = await albumObjectStoreReader.getAll();
        
        const artistObjectStoreReader = await LibraryDB.getObjectStoreReader("Artists"); 
        const artists = await artistObjectStoreReader.getAll();
        
        const trackObjectStoreReader = await LibraryDB.getObjectStoreReader("Tracks"); 
        const tracks = await trackObjectStoreReader.getAll();
        
        // const mapUriToObject = {};
        // [albums, tracks, artists].forEach(arr => arr.forEach(obj => {
        //     mapUriToObject[obj._uri] = obj;
        // }));

        // [albums, tracks, artists].forEach(arr => arr.forEach(obj => {
        //     insertReferences(obj, mapUriToObject);
        // }));

        return {
            albums: albums,
            tracks: tracks,
            artists: artists
        };

    
    } catch(error) {

        console.error(error);
        Store.dispatch(NotifyActions.notifyUser("error", error));
        
    }

    return {
        albums: [],
        tracks: [],
        artists: []
    };

}