import React from "react";

/**
 * @param {number} length Track length in msecs
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} playbackState
 * @param {number} playbackTimePosition current time position in mesecs
 */
export default (length, playbackState, playbackTimePosition) => {
    
    const [seconds, setSeconds] = React.useReducer(
        (seconds, action) => {
            switch(action.type) {
                case "setMillisecs": return Math.floor(action.value/1000);
                case "increment": return seconds + 1;
                default: return seconds;
            }
        },
        Math.floor((playbackState === "stopped" ? length/1000: playbackTimePosition/1000))
    );

    React.useEffect(() => {
        
        switch(playbackState) {

            case "stopped":
                setSeconds({type: "setMillisecs", value: length});
                return;

            case "paused":
                setSeconds({type: "setMillisecs", value: playbackTimePosition});
                return;
            
            case "playing":
                setSeconds({type: "setMillisecs", value: playbackTimePosition});
                const interval = setInterval(() => setSeconds({type: "increment"}), 1000);
                return () => clearInterval(interval);

            default: console.warn("Unknonw playback state:", playbackState);
        }

    }, [length, playbackState, playbackTimePosition]);

    return `${Math.floor(seconds/60)}:${`00${seconds%60}`.slice(-2)}`;
};