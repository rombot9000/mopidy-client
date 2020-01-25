import { EventEmitter } from "events";

/**
 * Enum for mopidy playback cmds
 * @readonly
 */
export const PlaybackCmds = {
    PLAY: "play",
    PAUSE: "pause",
    RESUME: "resume",
    STOP: "stop",
    NEXT: "next",
    PREV: "previous"
};

/**
 * Enum for mopidy playback states
 * @readonly
 */
export const PlaybackStates = {
    PLAYING: "playing",
    PAUSED: "paused",
    STOPPED: "stopped"
}

export class PlaybackHandler extends EventEmitter {
    /**
     * @param {import('mopidy')} mopidy 
     */
    constructor(mopidy) {
        super();
        // set mopidy connector
        this._mopidy = mopidy;

        /** @type {import('./TracklistHandler').mpd_tracklist_item} */
        this.tl_track = null;
        /** @type {string} */
        this.state = null;

        // handle state changes
        this._mopidy.on("state", this._onStateChange.bind(this));

        // handle events
        this._mopidy.on("event", this._onEvent.bind(this));
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
        this.state = await this._mopidy.playback.getState({});

        if(this.state !== PlaybackStates.STOPPED) {
            this.tl_track = await this._mopidy.playback.getCurrentTlTrack({});
            this.time_position = await this._mopidy.playback.getTimePosition({});
        }

        this.emit("trackInfoUpdated");
    }

    /**
     * @param {string} event 
     * @param {any} args 
     */
    _onEvent(event, args) {

        const [,eventType] = event.split(':');
        
        switch(eventType) {
            case "playbackStateChanged":
                this.state = args.new_state;
            break;
            
            case "trackPlaybackStarted":
            case "trackPlaybackResumed":
            case "trackPlaybackPaused":            
                this.tl_track = args.tl_track;
                this.emit("trackInfoUpdated");
            break;

            case "trackPlaybackEnded":
            case "trackPlaybackStopped":
                if(this.state === PlaybackStates.STOPPED) this.tl_track = null;
                this.emit("trackInfoUpdated");
            break;

            default:
                console.debug(`Event not handled here: ${event}`);
        }
    }

    /**
     * Since most playback api calls do not require arguments, we use a single api wrapper frunction
     * @param {*} cmd 
     * @param {Object.<string,any>} args Optional arguments for cmd
     */
    async sendCmd(cmd, args={}) {
        try {

            if(!Object.values(PlaybackCmds).includes(cmd)) throw new Error(`Unknown playback command ${cmd}`);
            
            await this._mopidy.playback[cmd](args);

        } catch(err) {
            console.error(err);
        }
    }
};