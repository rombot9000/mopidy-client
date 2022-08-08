import { connect } from "react-redux";

import selectPlaybackTimePosition from "Selectors/selectPlaybackTimePosition";

import { TracklistItem } from "Components";
import { TracklistActions, PlaybackActions } from "Actions";

/**
 * @param {import("Reducers").State} state
 */
const mapStateToProps = (state, {item}) => ({
    playbackState: item.track._uri === state.playback.track._uri ? state.playback.state : "stopped",
    playbackTimePosition: selectPlaybackTimePosition(state)
});

/**
 * 
 * @param {*} dispatch 
 * @param {import("Components/TracklistItem").TracklistItemProps} ownProps 
 * @returns 
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    onTrackClick: () => dispatch(ownProps.playbackState !== "stopped" ? PlaybackActions.toggle() : PlaybackActions.playTracklistItem(ownProps.item)),
    onRemoveClick: () => dispatch(TracklistActions.removeTrack(ownProps.item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracklistItem);