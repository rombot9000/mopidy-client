import React from "react";
import { connect } from "react-redux";

import { PlaylistAdd as AddIcon, PlaylistPlay as NextIcon, PlayArrowSharp as PlayIcon } from "@mui/icons-material";

import ContextMenu from "../Components/ContextMenu";
import ContextMenuItem from "../Components/ContextMenuItem";

import { TracklistActions } from "Actions";

/**
 * 
 * @param {Object} props
 * @param {import("Reducers/LibraryReducer").StoredAlbum").StoredAlbum").StoredAlbum} props.album
 */
const AlbumContextMenu = ({album, anchorEl, onPlay, onPlayNext, onAddToTracklist}) => {
    //const classes = useStyles();

    return (
        <ContextMenu anchorEl={anchorEl}>
            <ContextMenuItem onClick={onPlay} text="Play" icon={<PlayIcon/>}/>
            <ContextMenuItem onClick={onPlayNext} text="Play next" icon={<NextIcon/>}/>
            <ContextMenuItem onClick={onAddToTracklist} text="Add to tracklist" icon={<AddIcon/>}/>
        </ContextMenu>
    )
};
  

const mapDispatchToProps = (dispatch, ownProps) => ({
    onPlay: () => dispatch(TracklistActions.set(ownProps.album.tracks)),
    onPlayNext: () => dispatch(TracklistActions.playNext(ownProps.album.tracks)),
    onAddToTracklist: () => dispatch(TracklistActions.add(ownProps.album.tracks))
});

export default connect(null, mapDispatchToProps)(AlbumContextMenu);
