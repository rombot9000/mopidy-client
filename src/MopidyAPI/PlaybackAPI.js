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
    async togglePlayback() {
        switch(this._state) {
            case "stopped":
                await this._mopidy.playback.play({});
            break;

            case "paused":
                await this._mopidy.playback.resume({});
            break;
            
            case "playing":
                await this._mopidy.playback.pause({});
            break;
            
            default:
                throw new UnknownPlaybackStateError(this._state);
        }
    }

    async play(tlid) {
        await this._mopidy.playback.play({tlid: tlid});
    }

    async pause(tlid) {
        await this._mopidy.playback.pause({});
    }

    async resume(tlid) {
        await this._mopidy.playback.resume({});
    }

    async stop(tlid) {
        await this._mopidy.playback.stop({});
    }

    async next(tlid) {
        await this._mopidy.playback.next({});
    }

    async previous(tlid) {
        await this._mopidy.playback.previous({});
    }
};