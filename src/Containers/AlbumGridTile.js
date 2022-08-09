import React from "react";
import { connect } from "react-redux";

// Matrial ui
import { Typography, Fab, Fade, makeStyles, IconButton, Grid } from "@mui/material";
import { PlayArrow as PlayIcon, MoreVert as MenuIcon } from "@mui/icons-material";

// Own
import SquareImage from "Components/SquareImage";
import AlbumContextMenu from "./AlbumContextMenu";
import { PlaybackActions, ViewActions } from "Actions";

/** 
 * @typedef {Object} AlbumProp
 * @property {import("ViewModel/Album").Album} album
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
    }
}));


/**
 * @param {AlbumGridTileProps} props
 */
const AlbumGridTile = ({album, onClick, onPlayIconClick}) => {

    const classes = useStyles();

    const [highlight, setHighlight] = React.useState(false);

    const[anchorEl, setAnchorEl] = React.useState(null);
    const handleRef = React.useCallback(node => {
        if (node !== null) setAnchorEl(node);
      }, []);


    return (
        <div 
            onMouseOver={() => {setHighlight(true)}}
            onMouseOut={() => {setHighlight(false)}}
        >
            <SquareImage
                className={classes.cover}
                src={album.cover}
                onClick={onClick}
            >
                <Fade in={highlight}>
                    <Fab
                        className={classes.iconLeft}
                        size="small"
                        onClick={onPlayIconClick}
                    >
                        <PlayIcon/>
                    </Fab>
                </Fade>
            </SquareImage>
            <Grid container direction="row">
                <Grid item xs>
                    <Typography variant="subtitle2" className={classes.albumName}>{album.name}</Typography>
                    <Typography variant="subtitle2" className={classes.artistName}>{album.artist.name}</Typography>
                </Grid>
                <Grid item xs="auto">
                    <Fade in={highlight}><IconButton ref={handleRef}><MenuIcon/></IconButton></Fade>
                    <AlbumContextMenu album={album} anchorEl={anchorEl}/>
                </Grid>
            </Grid>
        </div>
    );

};
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(ViewActions.toggleAlbumDetailsModal(ownProps.album)),
    onPlayIconClick: () => dispatch(PlaybackActions.playAlbum(ownProps.album))
});

export default connect(null, mapDispatchToProps)(AlbumGridTile);