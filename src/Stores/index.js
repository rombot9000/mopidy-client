import Dispatcher from "Dispatcher";

import networkStore from "./networkStore";
import viewStore from "./viewStore";
import libraryStore from "./libraryStore";
import tracklistStore from "./tracklistStore";
import playbackStore from "./playbackStore";

export const NetworkStore = new networkStore();
Dispatcher.register(NetworkStore.handleAction.bind(NetworkStore));

export const ViewStore = new viewStore();
Dispatcher.register(ViewStore.handleAction.bind(ViewStore));

export const LibraryStore = new libraryStore();
Dispatcher.register(LibraryStore.handleAction.bind(LibraryStore));

export const TracklistStore = new tracklistStore();
Dispatcher.register(TracklistStore.handleAction.bind(TracklistStore));

export const PlaybackStore = new playbackStore();
Dispatcher.register(PlaybackStore.handleAction.bind(PlaybackStore));