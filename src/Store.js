import { configureStore } from '@reduxjs/toolkit'

import libraryReducer from "./Reducers/LibraryReducer";
import networkReducer from "./Reducers/NetworkReducer";
import notifyReducer from "./Reducers/NotifyReducer";
import viewReducer from "./Reducers/ViewReducer";
import tracklistReducer from "./Reducers/TracklistReducer";
import playbackReducer from "./Reducers/PlaybackReducer";

export default configureStore({ 
    reducer: {
        library: libraryReducer,
        network: networkReducer,
        notify: notifyReducer,
        view: viewReducer,
        tracklist: tracklistReducer,
        playback: playbackReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})