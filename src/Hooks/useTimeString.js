import React from "react";

const THRESHOLD_FOR_HOURS = 3*3600;

/**
 * @param {number} seconds
 */
const useTimeString = (seconds) => {

    const [timeString, setTimeString] = React.useState("");

    React.useEffect(() => {
        if(seconds > THRESHOLD_FOR_HOURS){
            setTimeString(`${Math.floor(seconds/3600)}:${`00${Math.floor((seconds%3600)/60)}`.slice(-2)}:${`00${seconds%60}`.slice(-2)} Hours`);
        }
        else{
            setTimeString(`${Math.floor(seconds/60)}:${`00${seconds%60}`.slice(-2)} Minutes`);
        }

        return () => {};
    }, [seconds]);

    return timeString;
};

export default useTimeString;