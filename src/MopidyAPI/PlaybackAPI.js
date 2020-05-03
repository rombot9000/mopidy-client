import BaseAPI from "./BaseAPI";

import { UnknownPlaybackStateError } from "./Errors";

import { Track } from "ViewModel";


/** @typedef {"play"|"pause"|"resume"|"stop"|"next"|"previous"} PlaybackCmd */
/** @typedef {"playing"|"paused"|"stopped"} PlaybackState */

export default class PlaybackAPI extends BaseAPI {
    /**
     * @param {import('mopidy')} mopidy 
     */
    constructor(mopidy) {
        // set mopidy connector
        super(mopidy, "playback");

        /** @type {PlaybackState} */
        this._state = null;

        // Keep track of this._api state
        this._mopidy.on("event:this._apiStateChanged", args =>{
            this._state = args.new_state;
        });
    }

    /**
     * Fetch this._api info from server
     * @returns {{state: string, track: Track, timePosition: number}}
     */
    async fetchInfo() {

        await this._initApi();
        
        this._state = await this._api.getState({});

        if(this._state === "stopped") {
            return {
                state: this._state,
                track: Track(null),
                timePosition: 0,
                timePositionUpdated: 0
            }
        }

        /** @type {import('./TracklistAPI').mpd_tracklist_item} */
        const tltrack = await this._api.getCurrentTlTrack({});

        /** @type {number} */
        const timePosition = await this._api.getTimePosition({});

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

        if(!this._api) return;

        switch(this._state) {
            case "stopped":
                return this._api.play({});

            case "paused":
                return this._api.resume({});
            
            case "playing":
                return this._api.pause({});
            
            default:
                throw new UnknownPlaybackStateError(this._state);
        }
    }
    
    /**
     * @param {number} tlid 
     */
    playTrack(tlid) {

        if(!this._api) return;

        this._api.play({tlid: tlid});
    }

    /**
     * Since most this._api api calls do not require arguments, we use a single api wrapper frunction
     * @param {PlaybackCmd} cmd 
     * @param {Object.<string,any>} args Optional arguments for cmd
     */
    sendCmd(cmd, args={}) {

        if(!this._api) return;

        this._api[cmd](args);
    }

    /**
     * @param {number} timePosition 
     */
    seek(timePosition) {

        if(!this._api) return;

        this._api.seek({"time_position": timePosition});
    }
};