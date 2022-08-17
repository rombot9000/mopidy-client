import { connect } from "react-redux";

import selectPlaybackTimePosition from "Selectors/selectPlaybackTimePosition";

import { AlbumTrack } from "Components";

/**
 * @param {import("Reducers").State} state
 */
const mapStateToProps = (state, {track}) => ({
    playbackState: track.uri === state.playback.track_uri ? state.playback.state : "stopped",
    playbackTimePosition: selectPlaybackTimePosition(state)
});


export default connect(mapStateToProps, null)(AlbumTrack);