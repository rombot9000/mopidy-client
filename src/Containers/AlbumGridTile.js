import React from "react";
import { connect } from "react-redux";

import { Typography, Grid, Fab, Fade, makeStyles } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";

import SquareImage from "Components/SquareImage";

import { PlaybackActions, ViewActions } from "Actions";

/** 
 * @typedef {Object} AlbumProp
 * @property {import("ViewModel/Album").Album} album
 * @property {}
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
 * Use Memo to prevent rerender when onClick is called
 * NOTE: we use backgound-image hack since the Paper component adds white space below a child img...
 * @param {AlbumGridTileProps} props
 */
function AlbumGridTile({album, onClick, ...gridProps}) {

    const classes = useStyles();

    const [highlight, setHighlight] = React.useState(false);
    
    console.log("Render album tile");
    return (
        <Grid {...gridProps} >
            <SquareImage
                className={classes.cover}
                src={album.cover}
                onClick={onClick}
                onMouseEnter={() => {setHighlight(true)}}
                onMouseLeave={() => {setHighlight(false)}}
                //elevation={highlight ? 8 : 1}
            >
                <Fade in={highlight}>
                    <Fab
                        className={classes.iconBar}
                        size="small"
                        onClick={(event) => {
                            event.stopPropagation();
                            PlaybackActions.playAlbum(album);
                        }}
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

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(ViewActions.toggleAlbumDetailsModal(ownProps.album))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGridTile);