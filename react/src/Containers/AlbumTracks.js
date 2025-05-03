import React from "react";
import { connect } from "react-redux";

import { PlaybackActions } from "Actions";

import { GridList } from "Components";

import selectSortedAlbumTracks from "Selectors/selectSortedAlbumTracks";

import AlbumTrack from "./AlbumTrack";

/**
 * @typedef AlbumTracksProps
 * @property {import("Reducers/LibraryReducer").StoredAlbum} album
 * @property {import("Reducers/LibraryReducer").StoredTrack[]} tracks
 * @property {Function} onTrackClick
 * @property {string} playbackTrackUri
 */

/**
 * @param {AlbumTracksProps} props
 */
const AlbumTracks = ({album, tracks, onTrackClick, playbackTrackUri, ...forwardProps}) => {
    return (
        <GridList spacing={1} divider {...forwardProps}>
            {tracks.map((track, index) => (
                <AlbumTrack
                    key={index}
                    track={track}
                    showArtist={album.artist_uris.length > 1}
                    onClick={() => {
                        onTrackClick(track.uri, album.track_uris, track.uri === playbackTrackUri)
                    }}
                />
            ))}
        </GridList>
    );
};

/**
 * @param {State} state
 * @param {AlbumTracksProps} ownProps
 */
const mapStateToProps = (state, ownProps) => ({
    tracks: selectSortedAlbumTracks(state, ownProps.album),
    playbackTrackUri: state.playback.track_uri,
});

const mapDispatchToProps = (dispatch) => ({
    onTrackClick: (track_uri, track_uris, isActive) => dispatch(isActive ? PlaybackActions.toggle() : PlaybackActions.play(track_uri, track_uris))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumTracks);