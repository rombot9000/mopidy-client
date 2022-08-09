import React from "react";

import { PlayArrow, Pause } from "@mui/icons-material";

import AnimatedEq from "../Components/AnimatedEq";

/**
 * @param {string|number} trackNumber
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} playbackState
 */
const useTrackIcon = (trackNumber, playbackState) => {

    const [hover, setHover] = React.useState(false);

    const trackIconReducer = (trackIcon, action) => {
        switch(action.hover) {
            case true: return action.state === "playing" ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>;
            case false: return action.state === "stopped" ?  trackNumber : <AnimatedEq fontSize="inherit"/>;
            default: return trackIcon;
        }
    };
    const [trackIcon, setTrackIcon] = React.useReducer(
        trackIconReducer,
        playbackState === "stopped" ?  trackNumber : <AnimatedEq fontSize="inherit"/>
    );

    React.useEffect(() => setTrackIcon({hover: hover, state: playbackState}), [hover, playbackState]);

    return [trackIcon, setHover];
};

export default useTrackIcon;