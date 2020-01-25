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

export class PlaybackHandler {
    /**
     * @param {import('mopidy')} mopidy 
     */
    constructor(mopidy) {
        this._mopidy = mopidy;
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