import { createSelector } from "reselect";

export default createSelector(
    [
        state => state.playback.state,
        state => state.playback.timePosition,
        state => Date.now() - state.playback.timePositionUpdated
    ],
    (playbackState, timePosition, timeDiff) => {
        return playbackState === "stopped" ? timePosition : timePosition + timeDiff
    }
);