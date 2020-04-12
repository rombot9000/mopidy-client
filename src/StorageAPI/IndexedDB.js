import ObjectStore from "./ObjectStore";


/** @typedef {{name: string, params: IDBObjectStoreParameters, indexSchemes: import("./ObjectStore").IndexSchema[]}} ObjectStoreSchema */

/**
 * This class is basically just a promise wrapper for the IndexedDB API
 */
export default class IndexedDB {
    /**
     * @param {string} name 
     * @param {number} version 
     */
    constructor(name, version) {
        this._name = name;
        this._version = version;
        /** @type {IDBDatabase} */
        this._indexedDB = null;
        /** @type {ObjectStoreSchema[]}} */
        this._schemaList = [];
        /** @type {Promise} */
        this._connected = null;
    }

    /**
     * @param {ObjectStoreSchema} schema 
     */
    addStore(schema) {
        this._schemaList.push(schema);
    }

    async init() {
        try {
            
            console.log(`connecting to ${this._name} v${this._version}...`);
            await this._connect();

        } catch (error) {
            
            this._connected = null;
            console.log(error);

        }
    }

    _connect() {
        // create connection promise if null
        if(!this._connected) this._connected = new Promise( (resolve, reject) => {
            // Check if supported
            if (!window.indexedDB) {
                reject("This browser does not support a stable version of IndexedDB.");
            }
            
            // open request
            const openDbRequest = window.indexedDB.open(this._name, this._version);
            
            // check version
            openDbRequest.onupgradeneeded = async (event) =>  {
                await this._upgradeObjectStores(event.target.result, this._schemaList);
            };

            openDbRequest.onerror = (event) => {
                
                // create new database if unknown error
                if(event.target.error.code === 0) window.indexedDB.deleteDatabase(this._name);
                
                // reject connection
                reject("Could not open db connection: ", event.target.error.message);

            };

            openDbRequest.onsuccess = (event) => {
                this._indexedDB = event.target.result;
                this._indexedDB.onerror = (event) => { console.error(event.target.error.message); };
                resolve();
            };
        });

        // return connection promise
        return this._connected;
    }

    /**
     * @param {IDBDatabase} indexedDB 
     * @param {ObjectStoreSchema[]} schemaList
     */
    async _upgradeObjectStores(indexedDB, schemaList) {
        console.log(indexedDB);
        console.log(schemaList);
        for(let objectStoreSchema of schemaList) {

            // clear old entries
            if(indexedDB.objectStoreNames.contains(objectStoreSchema.name)) indexedDB.deleteObjectStore(objectStoreSchema.name);
            
            // create new store in database
            const store = indexedDB.createObjectStore(objectStoreSchema.name, objectStoreSchema.params);

            // create instance of store handler class
            const objectStore = new ObjectStore(store);
            
            // create indices and wait for transaction complete
            await objectStore.createIndices(objectStoreSchema.indexSchemes);

        };
    }

    /**
     * @param {string} name 
     */
    getObjectStoreWriter(name) {
        return this._getObjectStore(name, "readwrite");
    }

    /**
     * @param {string} name 
     */
    getObjectStoreReader(name) {
        return this._getObjectStore(name, "readonly");
    }

    /**
     * @param {string} name 
     * @param {IDBTransactionMode} mode 
     */
    async _getObjectStore(name, mode) {
        try {
            
            await this._connect();
            const store = this._indexedDB.transaction(name, mode).objectStore(name); 
            return new ObjectStore(store);

        } catch (error) {
            
            this._connected = null;
            throw error;

        }
    }
}