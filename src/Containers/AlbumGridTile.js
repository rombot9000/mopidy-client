import React from "react";
import { connect } from "react-redux";

// Matrial ui
import { Typography, Fab, Fade, makeStyles } from "@material-ui/core";
import { PlayArrow as PlayIcon } from "@material-ui/icons";

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
 * @typedef {AlbumProp & import("@material-ui/core").GridProps} AlbumGridTileProps
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

    return (
        <React.Fragment>
            <SquareImage
                className={classes.cover}
                src={album.cover}
                onClick={onClick}
                onMouseEnter={() => {setHighlight(true)}}
                onMouseLeave={() => {setHighlight(false)}}
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
                <Fade in={highlight}>
                    <Fab
                        className={classes.iconRight}
                        size="small"
                    >
                        <AlbumContextMenu album={album}/>
                    </Fab>
                </Fade>
            </SquareImage>
            <div>
                <Typography variant="subtitle2" className={classes.albumName}>{album.name}</Typography>
                <Typography variant="subtitle2" className={classes.artistName}>{album.artist.name}</Typography>
            </div>
        </React.Fragment>
    );

};
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(ViewActions.toggleAlbumDetailsModal(ownProps.album)),
    onPlayIconClick: () => dispatch(PlaybackActions.playAlbum(ownProps.album))
});

export default connect(null, mapDispatchToProps)(AlbumGridTile);