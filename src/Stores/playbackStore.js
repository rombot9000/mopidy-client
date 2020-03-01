import { EventEmitter } from "events";

import { PLAYBACK_ACTIONS } from "Actions/PlaybackActions";
import { UnknownPlaybackStateError } from "MopidyAPI/Errors";
import { Track } from "ViewModel";

/** @typedef {"playing"|"paused"|"stopped"} PlaybackState */

export default class PlaybackStore extends EventEmitter {
    constructor() {
        super();
        /** @type {PlaybackState} */
        this._state = null;
        /** @type {import("ViewModel/Track").Track} */
        this._track = Track(null);
        /** @type {number} */
        this._timePosition = 0;
        /** @type {number} */
        this._timePositionUpdated = 0;

    }

    /**
     * 
     * @param {} action 
     */
    handleAction(action) {
        try {

            switch(action.type) {
                case PLAYBACK_ACTIONS.FETCH:
                    this._state = action.state;
                    this._timePosition = action.timePosition;
                    this._timePositionUpdated = action.timePositionUpdated;
                    this._track = action.track;
                    this.emit("update");
                break;

                case PLAYBACK_ACTIONS.UPDATE:
                    if(action.state != null) this._state = action.state;
                    if(action.track != null) this._track = action.track;
                    if(action.timePosition != null) this._timePosition = action.timePosition;
                    if(action.timePositionUpdated != null) this._timePositionUpdated = action.timePositionUpdated;
                    this.emit("update");
                break;

                case PLAYBACK_ACTIONS.UPDATE_STATE:
                    this._state = action.state;
                    this.emit("update");
                break;

                case PLAYBACK_ACTIONS.UPDATE_TIME_POSITION:
                    this._timePosition = action.timePosition;
                    this._timePositionUpdated = action.timePositionUpdated;
                    this.emit("update");
                break;

                case PLAYBACK_ACTIONS.UPDATE_TRACK:
                    this._track = action.track;
                    this.emit("update");
                break;

                case PLAYBACK_ACTIONS.PLAY:
                case PLAYBACK_ACTIONS.PAUSE:
                case PLAYBACK_ACTIONS.RESUME:
                case PLAYBACK_ACTIONS.STOP:
                case PLAYBACK_ACTIONS.TOGGLE:
                case PLAYBACK_ACTIONS.NEXT:
                case PLAYBACK_ACTIONS.PREVIOUS:
                default:
                    //Nothing to be done here...
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
                console.warn(new UnknownPlaybackStateError(this._state));
                return null;
        }
    }

    /**
     * Get the current track
     * @readonly
     * @type {import("ViewModel/Track").Track}
     */
    get track() {
        return this._track;
    }
}