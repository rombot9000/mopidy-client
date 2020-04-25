import {combineReducers} from "redux";

import library from "./LibraryReducer";
import network from "./NetworkReducer";
import notify from "./NotifyReducer";

export default combineReducers({
    library,
    network,
    notify
});
