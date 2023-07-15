import React from "react";
import { connect } from "react-redux";

import { PlaylistAdd as AddIcon, PlaylistPlay as NextIcon, PlayArrowSharp as PlayIcon } from "@mui/icons-material";

import ContextMenu from "../Components/ContextMenu";
import ContextMenuItem from "../Components/ContextMenuItem";

import { TracklistActions } from "Actions";

/**
 * @typedef AlbumContextMenuProps
 * @property {import("Reducers/LibraryReducer").StoredAlbum} album
 * @property {Function} onPlay
 * @property {Function} onPlayNext
 * @property {Function} onAddToTracklist
 */

/**
 * 
 * @param {AlbumContextMenuProps} props
 */
const AlbumContextMenu = ({album, onPlay, onPlayNext, onAddToTracklist, ...contextMenuProps}) => {
    return (
        <ContextMenu {...contextMenuProps}>
            <ContextMenuItem onClick={onPlay} text="Play" icon={<PlayIcon/>}/>
            <ContextMenuItem onClick={onPlayNext} text="Play next" icon={<NextIcon/>}/>
            <ContextMenuItem onClick={onAddToTracklist} text="Add to tracklist" icon={<AddIcon/>}/>
        </ContextMenu>
    )
};
  
/**
 * 
 * @param {*} dispatch 
 * @param {AlbumContextMenuProps} ownProps 
 * @returns 
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    onPlay: () => dispatch(TracklistActions.set(ownProps.album.track_uris)),
    onPlayNext: () => dispatch(TracklistActions.playNext(ownProps.album.track_uris)),
    onAddToTracklist: () => dispatch(TracklistActions.add(ownProps.album.track_uris))
});

export default connect(null, mapDispatchToProps)(AlbumContextMenu);
