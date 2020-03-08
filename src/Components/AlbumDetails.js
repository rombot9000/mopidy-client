import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Paper, Grid, useMediaQuery } from "@material-ui/core";

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
    },
    flexGrow : {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            flexShrink: 0,
        }
    }
}));

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Album").Album} props.album 
 */
function AlbumDetails(props){

    const {album, ...filteredProps} = props;
    const classes = useStyles();
    const useFullHeight = useMediaQuery(useTheme().breakpoints.down('sm'));


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
                        <div className={classes.flexGrow}>
                            <Tracklist tracks={album.tracks} height={useFullHeight ? "full" : "auto"}/>
                        </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AlbumDetails;