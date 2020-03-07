import React from "react";

import { Typography, Grid, Fab, Fade, makeStyles } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";

import SquareImage from "./SquareImage";

import { ViewActions, PlaybackActions } from "Actions";

/** 
 * @typedef {Object} AlbumProp
 * @property {import("ViewModel/Album").Album} album
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
 * 
 * @param {AlbumGridTileProps} prevProps 
 * @param {AlbumGridTileProps} nextProps 
 * @returns {boolean} True if component should NOT rerender, false otherwise
 */
function checkProps(prevProps, nextProps) {
    return prevProps.album._uri === nextProps.album._uri;
};

/**
 * Use Memo to prevent rerender when onClick is called
 * NOTE: we use backgound-image hack since the Paper component adds white space below a child img...
 * @param {AlbumGridTileProps} props 
 */
function AlbumGridTile(props) {

    const {album, ...gridProps} = props;

    const classes = useStyles();

    const [highlight, setHighlight] = React.useState(false);
    
    return (
        <Grid item {...gridProps} >
            <SquareImage
                className={classes.cover}
                src={album.cover}
                onClick={() => ViewActions.openAlbumDetailsModal(album)}
                onMouseEnter={() => {setHighlight(true)}}
                onMouseLeave={() => {setHighlight(false)}}
                elevation={highlight ? 8 : 1}
            >
                <Fade in={highlight}>
                    <Fab
                        className={classes.iconBar}
                        size="small"
                        onClick={() => {PlaybackActions.playAlbum(album)}}
                    >
                            <PlayArrow/>
                    </Fab>
                </Fade>
            </SquareImage>
            <Typography variant="button">{album.name}</Typography>
            <br/>
            <Typography variant="caption">{album.artist}</Typography>
        </Grid>
    );

};

export default React.memo(AlbumGridTile, checkProps);