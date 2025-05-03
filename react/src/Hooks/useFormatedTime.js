import React from "react";

/**
 * @param {number} length Track length in seconds
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} playbackState
 * @param {number} playbackTimePosition current time position in mesecs
 */
const useFormatedTime = (length, playbackState, playbackTimePosition) => {
    
    const [seconds, setSeconds] = React.useReducer(
        (seconds, action) => {
            switch(action.type) {
                case "set": return Math.floor(action.value/1000);
                
                case "inc": 
                    if(seconds < length/1000) return seconds + 1;
                    return seconds;

                default: return seconds;
            }
        },
        //initial value
        playbackState === "stopped" ? Math.floor(length/1000) : Math.floor(playbackTimePosition/1000)
    );

    React.useEffect(() => {
        
        switch(playbackState) {

            case "stopped":
                setSeconds({type: "set", value: length});
                return;

            case "paused":
                setSeconds({type: "set", value: playbackTimePosition});
                return;
            
            case "playing":
                setSeconds({type: "set", value: playbackTimePosition});
                const interval = setInterval(() => setSeconds({type: "inc"}), 1000);
                return () => clearInterval(interval);

            default: console.warn("Unknonw playback state:", playbackState);
        }

    }, [length, playbackState, playbackTimePosition]);

    return `${Math.floor(seconds/60)}:${`00${seconds%60}`.slice(-2)}`;
};

export default useFormatedTime;