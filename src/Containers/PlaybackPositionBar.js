import { connect } from "react-redux";

import selectPlaybackTimePosition from "Selectors/selectPlaybackTimePosition";
import selectPlaybackTrack from "Selectors/selectPlaybackTrack";

import TimePositionBar from "Components/TimePositionBar";

import { PlaybackActions } from "Actions";


/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    position: selectPlaybackTimePosition(state),
    length: selectPlaybackTrack(state).length,
    state: state.playback.state
});
  
const mapDispatchToProps = (dispatch) => ({
    onPositionClick: (position) => dispatch(PlaybackActions.seek(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimePositionBar);