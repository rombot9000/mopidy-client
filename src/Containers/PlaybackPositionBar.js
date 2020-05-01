import { connect } from "react-redux";

import TimePositionBar from "Components/TimePositionBar";

import { PlaybackActions } from "Actions";

/**
 * @param {import("Reducers/PlaybackReducer").PlaybackState} playbackState
 */
function extrapolateTimePosition(playbackState) {

    if(playbackState !== "playing" ) return playbackState.timePosition;

    return playbackState.timePosition + Date.now() - playbackState.timePositionUpdated;
    
}

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    position: extrapolateTimePosition(state.playback),
    length: state.playback.track.length,
    state: state.playback.state
});
  
const mapDispatchToProps = (dispatch) => ({
    onPositionClick: (position) => dispatch(PlaybackActions.seek(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimePositionBar);