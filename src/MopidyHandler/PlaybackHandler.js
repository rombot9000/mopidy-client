import { EventEmitter } from "events";

import { UnknownPlaybackCmdError, UnknownPlaybackStateError } from "./Errors";

/** @typedef {"play"|"pause"|"resume"|"stop"|"next"|"previous"} PlaybackCmd */
/** @typedef {"playing"|"paused"|"stopped"} PlaybackState */

/** @readonly A list of available playback commands */
const PlaybackCmds = ["play", "pause", "resume", "stop", "next", "previous"];
Object.freeze(PlaybackCmds);



class PlaybackHandler extends EventEmitter {
    /**
     * @param {import('mopidy')} mopidy 
     */
    constructor(mopidy) {
        super();
        // set mopidy connector
        this._mopidy = mopidy;

        /** @type {import('./TracklistHandler').mpd_tracklist_item} */
        this.tl_track = null;
        /** @type {import('./LibraryHandler').mpd_track} */
        this.track = null;
        /** @type {PlaybackState} */
        this._state = null;
        /** @type {number} */
        this._timePosition = 0;
        /** @type {number} */
        this._timePositionUpdated = 0;

        // handle state changes
        this._mopidy.on("state", this._onStateChange.bind(this));

        // handle events
        this._mopidy.on("event", this._onEvent.bind(this));
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
     * 
     * @param {string} state 
     * @param {any} args 
     */
    _onStateChange(state, args) {
        const [,stateType] = state.split(':');

        switch(stateType) {
            case "online":
                this._getPlaybackInfo();
            break;

            default:
                console.debug(`State not handled here: ${state}`);
        }
    }

    /**
     * Get current playback info
     */
    async _getPlaybackInfo() {
        this._updateState(await this._mopidy.playback.getState({}));

        if(this.state !== "stopped") {
            this._updateTrackInfo(await this._mopidy.playback.getCurrentTlTrack({}));
            this._updateTimePosition(await this._mopidy.playback.getTimePosition({}));
        }
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
     * @param {import('./TracklistHandler').mpd_tracklist_item} tl_track 
     */
    _updateTrackInfo(tl_track) {
        
        this.tl_track = tl_track;
        
        this.track = tl_track ? tl_track.track : null;

        this.emit("trackInfoUpdated", this.track);
    }

    /**
     * @param {string} event 
     * @param {any} args 
     */
    _onEvent(event, args) {

        const [,eventType] = event.split(':');
        
        switch(eventType) {
            case "playbackStateChanged":
                this._updateState(args.new_state);
            break;
            
            case "trackPlaybackStarted":
                this._updateTimePosition(0);     
                this._updateTrackInfo(args.tl_track);
            break;

            case "trackPlaybackResumed":
            case "trackPlaybackPaused":
                this._updateTimePosition(args.time_position);     
            break;

            case "trackPlaybackEnded":
            case "trackPlaybackStopped":
                if(this.state === "stopped") this._updateTrackInfo(null)
            break;

            default:
                console.debug(`Event not handled here: ${event}`);
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
     * Since most playback api calls do not require arguments, we use a single api wrapper frunction
     * @param {PlaybackCmd} cmd 
     * @param {Object.<string,any>} args Optional arguments for cmd
     */
    async sendCmd(cmd, args={}) {
        try {

            if(!PlaybackCmds.includes(cmd)) throw new UnknownPlaybackCmdError(cmd);
            
            await this._mopidy.playback[cmd](args);

        } catch(err) {
            console.error(err);
        }
    }
};

export default PlaybackHandler;