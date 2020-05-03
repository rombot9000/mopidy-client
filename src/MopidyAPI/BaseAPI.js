export default class BaseAPI {
    constructor(mopidy, component) {
        this._mopidy = mopidy;
        this._component = component;

        this._api = null;
        this._initApi();
    }

    _initApi() {
        if(!this._initPromise) this._initPromise = new Promise(resolve => {

            // check if already ready
            if(this._mopidy[this._component]) {
                this._api = this._mopidy[this._component];
                resolve();
                return;
            }
            
            // check every 500 ms
            let interval = setInterval(() => {
                if(this._mopidy[this._component]) {
                    clearInterval(interval);
                    this._api = this._mopidy[this._component];
                    resolve();
                }
            }, 500);
            
            // check on state online
            this._mopidy.on("state:online", () => {
                if(this._mopidy[this._component]) {
                    clearInterval(interval);
                    this._api = this._mopidy[this._component];
                    resolve();
                }
            });

        });

        return this._initPromise;
    }
}