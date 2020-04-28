import Dispatcher from "Dispatcher";

import playbackStore from "./playbackStore";

export const PlaybackStore = new playbackStore();
Dispatcher.register(PlaybackStore.handleAction.bind(PlaybackStore));