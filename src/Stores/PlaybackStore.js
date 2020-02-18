import { EventEmitter } from "events";

import Dispatcher from "Dispatcher";
import { PLAYBACK_ACTIONS } from "Actions/PlaybackActions";

import Mopidy from "Mopidy";

import { UnknownPlaybackStateError } from "MopidyHandler/Errors";

import { Track } from "ViewModel";

/** @typedef {"play"|"pause"|"resume"|"stop"|"next"|"previous"} PlaybackCmd */
/** @typedef {"playing"|"paused"|"stopped"} PlaybackState */

class PlaybackStore extends EventEmitter {
    constructor() {
        super();
        this._state = null;

        /** @type {import("MopidyHandler/TracklistHandler").mpd_tracklist_item} */
        this._tl_track = null;
        /** @type {import("MopidyHandler/LibraryHandler").mpd_track} */
        this._track = null;
        /** @type {PlaybackState} */
        this._state = null;
        /** @type {number} */
        this._timePosition = 0;
        /** @type {number} */
        this._timePositionUpdated = 0;

        // handle events
        Mopidy.on("event", this._handleEvent.bind(this)); 
    }

    /**
     * Init handler when server is online
     */
    async init() {
        this._updateState(await Mopidy.playback.getState({}));

        if(this._state !== "stopped") {
            this._updateTrackInfo(await Mopidy.playback.getCurrentTlTrack({}));
            this._updateTimePosition(await Mopidy.playback.getTimePosition({}));
        }
    }

    /**
     * 
     * @param {} action 
     */
    async handleActions(action) {
        try {

            switch(action.type) {
                case PLAYBACK_ACTIONS.PLAY:
                    console.warn("Action not yet implemented:", action.type);
                break;
                
                case PLAYBACK_ACTIONS.PAUSE:
                    await Mopidy.playback.pause({});
                break;
                
                case PLAYBACK_ACTIONS.RESUME:
                    await Mopidy.playback.resume({});
                break;
                
                case PLAYBACK_ACTIONS.STOP:
                    await Mopidy.playback.stop({});
                break;
                
                case PLAYBACK_ACTIONS.TOGGLE:
                    await this._togglePlayback();
                break;
                
                case PLAYBACK_ACTIONS.NEXT:
                    await Mopidy.playback.next({});
                break;
                
                case PLAYBACK_ACTIONS.PREVIOUS:
                    await Mopidy.playback.previous({});
                break;
    
                default:
            }

        } catch(exception) {
            
            console.error("Caught exception:", exception);

        }
    }
    
    /**
     * Current playback state
     * @readonly
     * @type {PlaybackState}
     */
    get state() {
        return this._state;
    }

    /**
     * The time postion of the current track
     * @readonly
     * @type {number}
     */
    get timePosition() {

        switch(this._state) {
            case "playing":
                return this._timePosition + Date.now() - this._timePositionUpdated;

            case "paused":
                return this._timePosition;

            case "stopped":
                return null;

            default:
                console.warn(UnknownPlaybackStateError(this._state));
                return null;
        }
    }

    /**
     * Get the current track
     * @readonly
     * @type {Track}
     */
    get currentTrack() {
        return Track(this._track);
    }

    /**
     * Update state and emit event
     * @param {PlaybackState} state 
     */
    _updateState(state) {
        this._state = state;
        this.emit("playbackStateChanged", this._state);
    }

    /**
     * Update current track and emit event
     * @param {import("MopidyHandler/TracklistHandler").mpd_tracklist_item} tl_track 
     */
    _updateTrackInfo(tl_track) {
        
        this._tl_track = tl_track;
        
        this._track = tl_track ? tl_track.track : null;

        this.emit("trackInfoUpdated", Track(this._track));
    }

    /**
     * @param {string} event 
     * @param {any} args 
     */
    _handleEvent(event, args) {
        
        switch(event) {
            case "event:playbackStateChanged":
                this._updateState(args.new_state);
            break;
            
            case "event:trackPlaybackStarted":
                this._updateTimePosition(0);     
                this._updateTrackInfo(args.tl_track);
            break;

            case "event:trackPlaybackResumed":
            case "event:trackPlaybackPaused":
                this._updateTimePosition(args.time_position);     
            break;

            case "event:trackPlaybackEnded":
            case "event:trackPlaybackStopped":
                if(this._state === "stopped") this._updateTrackInfo(null)
            break;

            default:
                console.debug(`Event not handled here: ${event}`);
                break;
        }
    }

    /**
     * @param {number} timePosition 
     */
    _updateTimePosition(timePosition) {
        this._timePositionUpdated = Date.now();
        this._timePosition = timePosition;
    }

    /**
     * Toggles Playback: STOPPED -> PLAYING <-> PAUSED
     */
    async _togglePlayback() {
        switch(this._state) {
            case "stopped":
                await Mopidy.playback.play({});
            break;

            case "paused":
                await Mopidy.playback.resume({});
            break;
            
            case "playing":
                await Mopidy.playback.pause({});
            break;
            
            default:
                throw new UnknownPlaybackStateError(this._state);
        }
    }
}

const playbackStore = new PlaybackStore();
Dispatcher.register(playbackStore.handleActions.bind(playbackStore));
export default playbackStore;