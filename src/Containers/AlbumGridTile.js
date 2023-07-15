import React from "react";
import { connect } from "react-redux";

import { BrowserView } from 'react-device-detect';

// Matrial ui
import { Typography, Fab, Fade, IconButton, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PlayArrow as PlayIcon, MoreVert as MenuIcon } from "@mui/icons-material";

// Own
import SquareImage from "Components/SquareImage";
import AlbumContextMenu from "./AlbumContextMenu";
import { PlaybackActions, ViewActions } from "Actions";
import { useLongPress } from "Hooks";
import StopPropagation from "Components/StopPropagation";

/** 
 * @typedef {Object} AlbumProp
 * @property {import("Reducers/LibraryReducer").StoredAlbum} album
 * @property {Function} onClick
 * @property {Function} onPlayIconClick
 *
 * @typedef {AlbumProp & import("@mui/material").GridProps} AlbumGridTileProps
 */

const useStyles = makeStyles(theme => ({
    cover: {
        position: "relative"
    },
    iconLeft: {
        position: "absolute",
        bottom: theme.spacing(0.5),
        left: theme.spacing(0.5)
    },
    iconRight: {
        position: "absolute",
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5)
    },
    artistName: {
        fontWeight: "normal"
    },
    albumName: {
        fontWeight: 500
    },
    disableTextSelection: {
        "-moz-user-select": "none", /* firefox */
        "-webkit-user-select":"none", /* Safari */
        "-ms-user-select": "none", /* IE*/
        "user-select": "none", /* Standard syntax */
     }
}));


/**
 * @param {AlbumGridTileProps} props
 */
const AlbumGridTile = ({album, onClick, onPlayIconClick}) => {

    const classes = useStyles();

    const [highlight, setHighlight] = React.useState(false);

    const[menuAnchorEl, setMenuAnchorEl] = React.useState(null);
    const handleRef = React.useCallback(node => {
        if (node !== null) setMenuAnchorEl(node);
    }, []);

    const[menuDialogOpen, setMenuDialogOpen] = React.useState(false);
    const onLongPress = () => {
        setMenuDialogOpen(true);
    }


    return (
        <div 
            onMouseOver={() => {setHighlight(true)}}
            onMouseOut={() => {setHighlight(false)}}
            className={classes.disableTextSelection}
        >
            <SquareImage
                className={classes.cover}
                src={album.cover_uri}
                {...useLongPress(onLongPress, onClick)}
            >
                <BrowserView>
                    <StopPropagation>
                        <Fade in={highlight}>
                            <Fab
                                className={classes.iconLeft}
                                size="small"
                                onClick={onPlayIconClick}
                            >
                                <PlayIcon/>
                            </Fab>
                        </Fade>
                    </StopPropagation>
                </BrowserView>
            </SquareImage>
            <Grid container direction="row">
                <Grid item xs zeroMinWidth>
                    <Typography variant="subtitle2" className={classes.albumName} noWrap>{album.name}</Typography>
                    <Typography variant="subtitle2" className={classes.artistName} noWrap>{album.artistName}</Typography>
                </Grid>
                <BrowserView>
                    <Grid item xs="auto">
                        <Fade in={highlight}><IconButton ref={handleRef}><MenuIcon/></IconButton></Fade>
                    </Grid>
                </BrowserView>
            </Grid>
            <AlbumContextMenu
                album={album}
                open={menuDialogOpen}
                onClose={() => {setMenuDialogOpen(false)}}
                anchorEl={menuAnchorEl}
            />
        </div>
    );

};
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(ViewActions.toggleAlbumDetailsModal(ownProps.album)),
    onPlayIconClick: () => dispatch(PlaybackActions.playAlbum(ownProps.album))
});

export default connect(null, mapDispatchToProps)(AlbumGridTile);