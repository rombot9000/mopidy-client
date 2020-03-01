import { UnknownPlaybackStateError } from "./Errors";

import { Track } from "ViewModel";


/** @typedef {"play"|"pause"|"resume"|"stop"|"next"|"previous"} PlaybackCmd */
/** @typedef {"playing"|"paused"|"stopped"} PlaybackState */

export default class PlaybackAPI {
    /**
     * @param {import('mopidy')} mopidy 
     */
    constructor(mopidy) {
        // set mopidy connector
        this._mopidy = mopidy;

        /** @type {PlaybackState} */
        this._state = null;

        // Keep track of playback state
        this._mopidy.on("event:playbackStateChanged", args =>{
            this._state = args.new_state;
        });
    }

    /**
     * Fetch playback info from server
     * @returns {{state: string, track: Track, timePosition: number}}
     */
    async fetchInfo() {
        
        this._state = await this._mopidy.playback.getState({});

        if(this._state === "stopped") {
            return {
                state: this._state,
                track: Track(null),
                timePosition: 0,
                timePositionUpdated: 0
            }
        }

        /** @type {import('./TracklistAPI').mpd_tracklist_item} */
        const tltrack = await this._mopidy.playback.getCurrentTlTrack({});

        /** @type {number} */
        const timePosition = await this._mopidy.playback.getTimePosition({});

        return {
            state: this._state,
            track: Track(tltrack.track),
            timePosition: timePosition,
            timePositionUpdated: Date.now()
        };
    }


    /**
     * Toggles Playback: STOPPED -> PLAYING <-> PAUSED
     */
    togglePlayback() {
        switch(this._state) {
            case "stopped":
                return this._mopidy.playback.play({});

            case "paused":
                return this._mopidy.playback.resume({});
            
            case "playing":
                return this._mopidy.playback.pause({});
            
            default:
                throw new UnknownPlaybackStateError(this._state);
        }
    }
    
    /**
     * @param {number} tlid 
     */
    playTrack(tlid) {
        return this._mopidy.playback.play({tlid: tlid});
    }

    /**
     * Since most playback api calls do not require arguments, we use a single api wrapper frunction
     * @param {PlaybackCmd} cmd 
     * @param {Object.<string,any>} args Optional arguments for cmd
     */
    async sendCmd(cmd, args={}) {            
        return this._mopidy.playback[cmd](args);
    }

    /**
     * @param {number} timePosition 
     */
    seek(timePosition) {
        return this._mopidy.playback.seek({"time_position": timePosition});
    }
};