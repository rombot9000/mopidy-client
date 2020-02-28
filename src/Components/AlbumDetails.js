import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid } from "@material-ui/core";

import Tracklist from "./Tracklist";
import SquareImage from "./SquareImage";

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
        padding: theme.spacing(2),
        heigth: "100%",
        [theme.breakpoints.up('md')]: {
            width: "100%",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
                display: "none"
            },
            "-msOverflowStyle": "none",
        }
    }
}));

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Album").Album} props.album 
 */
function AlbumDetails(props){

    const {to, album, ...filteredProps} = props;
    const classes = useStyles();

    return (
        <Paper {...filteredProps} className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item sm={12} md={6} className={classes.cover}>
                    <SquareImage src={album.cover} elevation={0} square={true}/>
                </Grid>
                <Grid item sm={12} md={6} className={classes.content}>
                        <Typography variant="h5">{album.name}</Typography>
                        <Typography variant="h6">{album.artist}</Typography>
                        <Typography variant="overline">{album.year}</Typography>
                        <Tracklist tracks={album.tracks}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AlbumDetails;