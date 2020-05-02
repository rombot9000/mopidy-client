import React from "react";
import { connect } from "react-redux";

import { Typography, Fab, Fade, makeStyles } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";

import SquareImage from "Components/SquareImage";
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
    iconBar: {
        position: "absolute",
        bottom: theme.spacing(0.5),
        left: theme.spacing(0.5)
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
                        className={classes.iconBar}
                        size="small"
                        onClick={onPlayIconClick}
                    >
                        <PlayArrow/>
                    </Fab>
                </Fade>
            </SquareImage>
            <Typography variant="button">{album.name}</Typography>
            <br/>
            <Typography variant="caption">{album.artist}</Typography>
        </React.Fragment>
    );

};

/**
 * @param {import("Reducers").State} state
 */
const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(ViewActions.toggleAlbumDetailsModal(ownProps.album)),
    onPlayIconClick: () => dispatch(PlaybackActions.playAlbum(ownProps.album))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGridTile);