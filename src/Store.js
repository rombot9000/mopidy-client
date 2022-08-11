// @preval
import { configureStore } from '@reduxjs/toolkit'

import libraryReducer from "./Reducers/LibraryReducer";
import networkReducer from "./Reducers/NetworkReducer";
import notifyReducer from "./Reducers/NotifyReducer";
import viewReducer from "./Reducers/ViewReducer";
import tracklistReducer from "./Reducers/TracklistReducer";
import playbackReducer from "./Reducers/PlaybackReducer";


/**
 * Logs all actions and states after they are dispatched.
 */
 const logger = store => next => action => {
    console.group(`${action.type} - ${action.case}`);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
}

const middleware = [];
if(process.env.NODE_ENV !== "production") {
    middleware.push(logger);
}

export default configureStore({ 
    reducer: {
        library: libraryReducer,
        network: networkReducer,
        notify: notifyReducer,
        view: viewReducer,
        tracklist: tracklistReducer,
        playback: playbackReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== 'production',
})