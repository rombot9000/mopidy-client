import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid } from "@material-ui/core";

import AlbumTracks from "./AlbumTracks";
import SquareImage from "Components/SquareImage";

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        [theme.breakpoints.down('sm')]: {
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
                display: "none"
            },
            "-msOverflowStyle": "none",
        }
    },
    container: {
        spacing: 0,
        maxWidth: "100%",
        maxHeight: "100%",
    },
    cover: {
        width: "100%",
        height: "100%",
    },
    content: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    whiteBack: {
    },
    bottomMargin : {
        marginBottom: theme.spacing(1)
    },
    tracklist: {
        width: "100%",
        [theme.breakpoints.up('md')]: {
            flexShrink: 1,
            overflowY: "scroll",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
                display: "none"
            },
            "-msOverflowStyle": "none",
            "-webkit-overflow-scrolling": "auto"
        }
    }
}));

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Album").Album} props.album
 */
export default ({album, ...paperProps}) => {

    const classes = useStyles();

    return (
        <Paper {...paperProps} className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item sm={12} md={6} className={classes.cover}>
                    <SquareImage src={album.cover} elevation={0} square={true}/>
                </Grid>
                <Grid item sm={12} md={6} className={classes.content}>
                        <Typography className={classes.whiteBack} variant="subtitle1">{album.artist.name}</Typography>
                        <Typography className={classes.whiteBack} variant="h5">{album.name}</Typography>
                        <Typography className={classes.bottomMargin} variant="subtitle1" color="textSecondary">
                            Released {album.year} | {album.tracks.length} Tracks | {album.length} Minutes
                        </Typography>
                        <AlbumTracks className={classes.tracklist} album={album}/>
                </Grid>
            </Grid>
        </Paper>
    );
};