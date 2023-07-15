import { connect } from "react-redux";

import { TrackView } from "Components";

/** 
 * @param {Function} props.onTrackClick
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {import("Reducers/LibraryReducer").StoredTrack} props.playbackTrack
 */

const mapStateToProps = (state) => ({
    artists: state.library.artists,
    albums: state.library.artists,
    tracks: state.library.tracks
});

export default connect(mapStateToProps)(TrackView);