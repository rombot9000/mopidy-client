import * as LibraryActions from "./LibraryActions";
import * as PlaybackActions from "./PlaybackActions";
import * as TracklistActions from "./TracklistActions";
import * as ViewActions from "./ViewActions";
import * as NetworkActions from "./NetworkActions"
import * as NotifyActions from "./NotifyActions"

const ACTION_TYPES = {
    LIBRARY_ACTION: 1,
    PLAYBACK_ACTION: 2,
    TRACKLIST_ACTION: 3,
    VIEW_ACTION: 4,
    NETWORK_ACTION: 5,
    NOTIFY_ACTION: 6
}

const NETWORK_ACTIONS = NetworkActions.NETWORK_ACTIONS;
const LIBRARY_ACTIONS = LibraryActions.LIBRARY_ACTIONS;
const PLAYBACK_ACTIONS = PlaybackActions.PLAYBACK_ACTIONS;
const TRACKLIST_ACTIONS = TracklistActions.TRACKLIST_ACTIONS;
const VIEW_ACTIONS = ViewActions.VIEW_ACTIONS;
const NOTIFY_ACTIONS = NotifyActions.NOTIFY_ACTIONS;

export {
    ACTION_TYPES,
    
    NETWORK_ACTIONS,
    LIBRARY_ACTIONS,
    PLAYBACK_ACTIONS,
    TRACKLIST_ACTIONS,
    VIEW_ACTIONS,
    NOTIFY_ACTIONS,
    
    NetworkActions,
    LibraryActions,
    PlaybackActions,
    TracklistActions,
    ViewActions,
    NotifyActions
};