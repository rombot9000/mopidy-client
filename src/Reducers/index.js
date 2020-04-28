import {combineReducers} from "redux";

import library from "./LibraryReducer";
import network from "./NetworkReducer";
import notify from "./NotifyReducer";
import view from "./ViewReducer"

/**
 * @typedef {Object} State
 * @property {import("./LibraryReducer").LibraryState} library
 * @property {import("./NetworkReducer").NetworkState} network
 * @property {import("./NotifyReducer").NotifyState} notify
 * @property {import("./ViewReducer").ViewState} view
 */

export default combineReducers({
    library,
    network,
    notify,
    view
});
