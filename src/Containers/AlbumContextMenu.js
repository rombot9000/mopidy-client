import React from "react";
import { connect } from "react-redux";

import { IconButton } from "@material-ui/core";
import { MoreVert as MenuIcon, PlaylistAdd as AddIcon, PlaylistPlay as NextIcon } from "@material-ui/icons";

import ContextMenu from "../Components/ContextMenu";
import ContextMenuItem from "../Components/ContextMenuItem";

import { TracklistActions } from "Actions";

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Album").Album} props.album
 */
const AlbumContextMenu = ({album, onPlayNext, onAddToTracklist}) => {
    //const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        event.stopPropagation()
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <MenuIcon onClick={handleClick}/>
            <ContextMenu
                anchorEl={anchorEl}
                open={open}
                onClick={handleClose}
            >
                <ContextMenuItem onClick={onPlayNext} text="Play next" icon={<NextIcon/>}/>
                <ContextMenuItem onClick={onAddToTracklist} text="Add to tracklist" icon={<AddIcon/>}/>
            </ContextMenu>
        </React.Fragment>
    )
};
  

const mapDispatchToProps = (dispatch, ownProps) => ({
    onPlayNext: () => dispatch(TracklistActions.playNext(ownProps.album.tracks)),
    onAddToTracklist: () => dispatch(TracklistActions.add(ownProps.album.tracks))
});

export default connect(null, mapDispatchToProps)(AlbumContextMenu);
