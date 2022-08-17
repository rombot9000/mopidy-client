import BaseAPI from "./BaseAPI";

import { UnknownPlaybackStateError } from "./Errors";


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
        this._mopidy.on("event:playbackStateChanged", args =>{
            this._state = args.new_state;
        });
    }

    /**
     * Fetch this._api info from server
     * @returns {{state: string, track_uri: string, timePosition: number}}
     */
    async fetchInfo() {

        await this._initApi();
        
        this._state = await this._api.getState({});

        if(this._state === "stopped") {
            return {
                state: this._state,
                track_uri: null,
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
            track_uri: tltrack.track.uri,
            timePosition: timePosition,
            timePositionUpdated: Date.now()
        };
    }


    /**
     * Toggles Playback: STOPPED -> PLAYING <-> PAUSED
     */
    async togglePlayback() {

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
    async playTrack(tlid) {

        if(!this._api) return;

        return this._api.play({tlid: tlid});
    }

    /**
     * Since most this._api api calls do not require arguments, we use a single api wrapper frunction
     * @param {PlaybackCmd} cmd 
     * @param {Object.<string,any>} args Optional arguments for cmd
     */
    async sendCmd(cmd, args={}) {

        if(!this._api) return;

        return this._api[cmd](args);
    }

    /**
     * @param {number} timePosition 
     */
    async seek(timePosition) {

        if(!this._api) return;

        return this._api.seek({"time_position": timePosition});
    }
};