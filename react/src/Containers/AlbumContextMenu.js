import React from "react";
import { connect } from "react-redux";

import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PlaylistAdd as AddIcon, PlaylistPlay as NextIcon, PlayArrowSharp as PlayIcon } from "@mui/icons-material";

import { PlaybackActions, TracklistActions } from "Actions";
import { ContextMenu, ContextMenuItem, ContextMenuTitle } from "Components";

const useStyles = makeStyles(theme => ({
    artistName: {
        fontWeight: "normal"
    },
    albumName: {
        fontWeight: 500
    }
}));

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
const AlbumContextMenu = ({album, onPlay, onPlayNext, onPlayAfter, onAddToTracklist, ...contextMenuProps}) => {

    const classes = useStyles();

    return (
        <ContextMenu {...contextMenuProps}>
            <ContextMenuTitle>
                <Typography className={classes.albumName}>{album.name}</Typography>
                <Typography className={classes.artistName}>{album.artistName}</Typography>
            </ContextMenuTitle>
            <ContextMenuItem onClick={onPlay} text="Play" icon={<PlayIcon/>}/>
            <ContextMenuItem onClick={onPlayNext} text="Play next" icon={<NextIcon/>}/>
            <ContextMenuItem onClick={onPlayAfter} text="Play after current album" icon={<NextIcon/>}/>
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
    onPlay: () => dispatch(PlaybackActions.playAlbum(ownProps.album)),
    onPlayNext: () => dispatch(TracklistActions.playNext(ownProps.album.track_uris)),
    onPlayAfter: () => dispatch(TracklistActions.playAfterCurrentAlbum(ownProps.album.track_uris)),
    onAddToTracklist: () => dispatch(TracklistActions.add(ownProps.album.track_uris))
});

export default connect(null, mapDispatchToProps)(AlbumContextMenu);
