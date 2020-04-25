import Dispatcher from "Dispatcher";

import networkStore from "./networkStore";
import viewStore from "./viewStore";
import tracklistStore from "./tracklistStore";
import playbackStore from "./playbackStore";
import notifyStore from "./notifyStore";

export const NetworkStore = new networkStore();
Dispatcher.register(NetworkStore.handleAction.bind(NetworkStore));

export const NotifyStore = new notifyStore();
Dispatcher.register(NotifyStore.handleAction.bind(NotifyStore));

export const ViewStore = new viewStore();
Dispatcher.register(ViewStore.handleAction.bind(ViewStore));

export const TracklistStore = new tracklistStore();
Dispatcher.register(TracklistStore.handleAction.bind(TracklistStore));

export const PlaybackStore = new playbackStore();
Dispatcher.register(PlaybackStore.handleAction.bind(PlaybackStore));