export class UnknownPlaybackCmdError extends Error {
    /**
     * @param {string} cmd 
     */
    constructor(cmd) {
        super(`Unknown Playback state: ${cmd}`);
        this.name = this.constructor.name;
        if(Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    }
}


export class UnknownPlaybackStateError extends Error {
    /**
     * @param {string} state 
     */
    constructor(state) {
        super(`Unknown Playback state: ${state}`);
        this.name = this.constructor.name;
        if(Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    }
}