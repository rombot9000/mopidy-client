import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Card, CardContent, CardMedia } from "@material-ui/core";

import Tracklist from "./Tracklist";

import MopidyHandler from "MopidyHandler/MopidyHandler";

const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        outline: 0,
        maxHeight: "80%",
        maxWidth: "80%",
        height: 500
    },
    cover: {
        width: 500,
        objectFit: "cover"
    },
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
}));

/**
 * 
 * @param {Object} props
 * @param {string} props.uri 
 */
const AlbumDetails = React.forwardRef((props, ref) => {

    const classes = useStyles();

    const artwork_src = MopidyHandler.album_uri_to_artwork_uri[props.uri];
    const tracks = MopidyHandler.album_uri_to_tracks[props.uri];

    return (
        <Card {...props} ref={ref} className={classes.card}>
            <CardMedia className={classes.cover} image={artwork_src}/>
            <CardContent className={classes.content}>
                    <Typography variant="h5">{tracks[0].album.name}</Typography>
                    <Typography variant="h6">{tracks[0].artists[0].name}</Typography>
                    <Typography variant="overline">{tracks[0].date.slice(0,4)}</Typography>
                    <Tracklist tracks={tracks}/>
            </CardContent>
        </Card>
    );
});

export default AlbumDetails;