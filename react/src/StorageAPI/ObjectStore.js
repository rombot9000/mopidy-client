/** @typedef {{index: string, params: IDBIndexParameters}} IndexSchema */

export default class ObjectStore {
    /**
     * 
     * @param {IDBObjectStore} store 
     */
    constructor(store) {
        this._store = store;
    }

    /**
     * @param {IndexSchema[]} scheme 
     */
    createIndices(scheme) {
        
        // create indices from schema
        scheme.forEach(index => {
            this._store.createIndex(index.index, index.index, index.params);
        });

        // resolve on sucess
        this._store.transaction.oncomplete = event => {
            console.log("Created indices for store.");
        };
        
        // reject on error 
        this._store.transaction.onerror = event => {
            console.log("Error creating indices:", event.target.errorCode);
        };

    };

    clear() {
        return new Promise( (resolve, reject) => {
            const request = this._store.clear();
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    /**
     * 
     * @param {any[]} entries 
     */
    add(entries) {
        
        return Promise.all(entries.map(entry => new Promise( (resolve, reject) => {
            const request = this._store.add(entry);
            request.onsuccess = resolve;
            request.onerror = reject;
        })));
    }

    put(entry) {
        return new Promise((resolve, reject) => {
            const request = this._store.put(entry);
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const request = this._store.getAll();
            request.onsuccess = (event) => { resolve(event.target.result) };
            request.onerror = reject;
        });
    }

    /**
     * Get object from store by key
     * @param {string} key 
     */
    get(key) {
        return new Promise((resolve, reject) => {
            const request = this._store.get(key);
            request.onsuccess = (event) => { resolve(event.target.result) };
            request.onerror = reject;
        });
    }
};