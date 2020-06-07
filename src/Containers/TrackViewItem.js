import { connect } from "react-redux";

import selectPlaybackTimePosition from "Selectors/selectPlaybackTimePosition";

import { TrackViewItem } from "Components";

/**
 * @param {import("Reducers").State} state
 */
const mapStateToProps = (state, {track}) => ({
    playbackState: track._uri === state.playback.track._uri ? state.playback.state : "stopped",
    playbackTimePosition: selectPlaybackTimePosition(state)
});


export default connect(mapStateToProps, null)(TrackViewItem);