import { connect } from "react-redux";

import selectPlaybackTimePosition from "Selectors/selectPlaybackTimePosition";
import selectAlbumCover from "Selectors/selectAlbumCover";

import { TracklistItem } from "Components";
import { TracklistActions, PlaybackActions } from "Actions";

/**
 * @param {import("Reducers").State} state
 * @param {import("Components/TracklistItem").TracklistItemProps} ownProps 
 */
const mapStateToProps = (state, ownProps) => ({
    albumCover: selectAlbumCover(state, ownProps.item.track.album_uri),
    playbackState: ownProps.item.track.uri === state.playback.track_uri ? state.playback.state : "stopped",
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