import ObjectStore from "./ObjectStore";

/** @typedef {{name: string, params: IDBIndexParameters}} IndexSchema */

/** @typedef {{name: string, params: IDBObjectStoreParameters, indexSchemes: IndexSchema[]}} ObjectStoreSchema */

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
        this._schema = [];
    }

    /**
     * @param {ObjectStoreSchema} schema 
     */
    addSchema(schema) {
        this._schema.push(schema);
    }

    connect() {
        return new Promise( (resolve, reject) => {
            // Check if supported
            if (!window.indexedDB) {
                reject("This browser does not support a stable version of IndexedDB.");
            }
            
            // open request
            const openDbRequest = window.indexedDB.open(this._name, this._version);
            
            // check version
            openDbRequest.onupgradeneeded = (event) =>  { 
            
                /** @type {IDBDatabase} */
                const indexedDB = event.target.result;

                this._schema.forEach( (objectStoreSchema) => {

                    // clear old entries
                    if(indexedDB.objectStoreNames.contains(objectStoreSchema.name)) indexedDB.deleteObjectStore(objectStoreSchema.name);
                    
                    // create new store in database
                    const store = indexedDB.createObjectStore(objectStoreSchema.name, objectStoreSchema.params);

                    // create instance of store handler class
                    const objectStore = new ObjectStore(store);
                    
                    // create indices and wait for transaction complete
                    objectStore.createIndices(objectStoreSchema.indexSchemes);
                });
            };

            openDbRequest.onerror = (event) => {
                reject("Could not open db connection: ", event.target.errorCode);
            };

            openDbRequest.onsuccess = (event) => {
                this._indexedDB = event.target.result;
                this._indexedDB.onerror = (event) => { console.error(event.target.errorCode); };
                resolve();
            };
        });
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
    _getObjectStore(name, mode) {
        const store =  this._indexedDB.transaction(name, mode).objectStore(name); 
        return new ObjectStore(store);
    }
}