import Dispatcher from "Dispatcher";

import viewStore from "./ViewStore";
import libraryStore from "./LibraryStore";
import tracklistStore from "./TracklistStore";
import playbackStore from "./PlaybackStore";

export const ViewStore = new viewStore();
Dispatcher.register(ViewStore.handleAction.bind(ViewStore));

export const LibraryStore = new libraryStore();
Dispatcher.register(LibraryStore.handleAction.bind(LibraryStore));

export const TracklistStore = new tracklistStore();
Dispatcher.register(TracklistStore.handleAction.bind(TracklistStore));

export const PlaybackStore = new playbackStore();
Dispatcher.register(PlaybackStore.handleAction.bind(PlaybackStore));