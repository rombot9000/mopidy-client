import { connect } from "react-redux";

import selectPlaybackTimePosition from "Selectors/selectPlaybackTimePosition";

import TimePositionBar from "Components/TimePositionBar";

import { PlaybackActions } from "Actions";


/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    position: selectPlaybackTimePosition(state),
    length: state.playback.track.length,
    state: state.playback.state
});
  
const mapDispatchToProps = (dispatch) => ({
    onPositionClick: (position) => dispatch(PlaybackActions.seek(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimePositionBar);