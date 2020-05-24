import React from "react";

/**
 * @param {number} length Track length in msecs
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} playbackState
 * @param {number} playbackTimePosition current time position in mesecs
 */
export default (length, playbackState, playbackTimePosition) => {

    const [seconds, incrementSeconds] = React.useReducer(
        seconds => seconds+1,
        Math.floor((playbackState === "stopped" ? length/1000: playbackTimePosition/1000))
    );

    React.useEffect(() => {
        
       if(playbackState === "playing") {

            const interval = setInterval(incrementSeconds, 1000);
            return () => clearInterval(interval);
            
        }

    }, [playbackState, playbackTimePosition]);

    return `${Math.floor(seconds/60)}:${`00${seconds%60}`.slice(-2)}`;
};