import Dispatcher from "Dispatcher";

import viewStore from "./viewStore";
import tracklistStore from "./tracklistStore";
import playbackStore from "./playbackStore";

export const ViewStore = new viewStore();
Dispatcher.register(ViewStore.handleAction.bind(ViewStore));

export const TracklistStore = new tracklistStore();
Dispatcher.register(TracklistStore.handleAction.bind(TracklistStore));

export const PlaybackStore = new playbackStore();
Dispatcher.register(PlaybackStore.handleAction.bind(PlaybackStore));