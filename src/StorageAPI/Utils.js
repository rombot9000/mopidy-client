import { SettingsDB, LibraryDB } from ".";

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
        NotifyActions.notifyUser("error", error);

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
        NotifyActions.notifyUser("error", error);

    }
}

export async function getAlbumsFromDB() {
    let albums = [];

    try {

        const albumObjectStoreReader = await LibraryDB.getObjectStoreReader("Albums"); 
        albums = await albumObjectStoreReader.getAll();
    
    } catch(error) {

        console.error(error);
        NotifyActions.notifyUser("error", error);
        
    }

    return albums;
}

/**
 * 
 * @param {import("ViewModel/Album").Album[]} albums 
 */
export async function writeAlbumsToDB(albums) {
    try {
        
        const albumObjectStoreWriter = await LibraryDB.getObjectStoreWriter("Albums"); 
        await albumObjectStoreWriter.clear();
        await albumObjectStoreWriter.add(albums);

    } catch(error) {

        console.error(error);
        NotifyActions.notifyUser("error", error);

    }
}