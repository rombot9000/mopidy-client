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
        return new Promise( (resolve, reject) => {
            // create indices from schema
            scheme.forEach(index => {
                this._store.createIndex(index.index, index.index, index.params);
            })
            // resolve on sucess
            this._store.transaction.oncomplete = (event) => { resolve() };
            // reject on error 
            this._store.transaction.onerror = (event) => {
                reject("Error creating indices:", event.target.errorCode);
            };
        });
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