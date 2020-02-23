import { EventEmitter } from "events";

import Dispatcher from "Dispatcher";
import { VIEW_ACTIONS } from "Actions/ViewActions";

class ViewStore extends EventEmitter {
    constructor() {
        super();

        /** @type {import("ViewModel/Album").Alnum} */
        this._album = null;
    }

    handleAction(action) {
        switch(action.type) {
            case VIEW_ACTIONS.OPEN_ALBUM_DETAILS_MODAL:

        }
    }
}


const viewStore = new ViewStore();
Dispatcher.register(viewStore.handleAction.bind(viewStore));
export default viewStore;