import React from "react";

import { makeStyles } from "@mui/styles";
import { Typography, Paper, Grid } from "@mui/material";

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
        width: "100%",
        height: "100%",
    },
    cover: {
        width: "100%",
        maxHeight: "100%",
    },
    content: {
        width: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    albumInfo : {
        paddingBottom: theme.spacing(1),
        fontWeight: "lighter",
        // fix tracklist scrolling artifact issue
        backgroundColor: "white",
        zIndex: 1,
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
const AlbumDetails = ({album, ...paperProps}) => {

    const classes = useStyles();

    return (
        <Paper {...paperProps} className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item sm={12} md={6} className={classes.cover}>
                    <SquareImage src={album.cover} elevation={0} square={true}/>
                </Grid>
                <Grid item sm={12} md={6} className={classes.content}>
                        <Typography variant="subtitle1">{album.artist.name}</Typography>
                        <Typography variant="h5">{album.name}</Typography>
                        <Typography className={classes.albumInfo} variant="subtitle1">
                            Released {album.year} | {album.tracks.length} Tracks | {album.length} Minutes
                        </Typography>
                        <AlbumTracks className={classes.tracklist} album={album}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AlbumDetails;