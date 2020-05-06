import { createSelector } from "reselect";

export default createSelector(
    [
        state => state.playback.state,
        state => state.playback.timePosition,
        state => state.playback.timePositionUpdated
    ],
    (playbackState, timePosition, timePositionUpdated) => 
        playbackState === "stopped" ? timePosition : timePosition + Date.now() - timePositionUpdated
);